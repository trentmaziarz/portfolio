// Local post builder for the site; not part of the published pages.
// Usage: node postmaker.mjs   -> opens http://127.0.0.1:4321
// Zero dependencies; serves postmaker.html plus the site's real /assets tree,
// stages dropped media in the OS temp dir, and on "Make post" writes the
// markdown into _posts and copies media into assets with the date naming.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { exec } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = process.env.POSTMAKER_ROOT || path.dirname(fileURLToPath(import.meta.url));
const STAGE = path.join(os.tmpdir(), 'postmaker-stage');
fs.mkdirSync(STAGE, { recursive: true });

const PORT = 4321;
const POSTS_DIR = path.join(ROOT, '_posts');
const IMG_DIR = path.join(ROOT, 'assets', 'img', 'posts');
const MEDIA_DIR = path.join(ROOT, 'assets', 'media');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.avif': 'image/avif',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.json': 'application/json',
};
const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);
const VID_EXT = new Set(['.mp4', '.webm', '.mov']);

function send(res, code, body, type = 'application/json') {
  if (type === 'application/json' && typeof body !== 'string') body = JSON.stringify(body);
  res.writeHead(code, { 'Content-Type': type });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

// ---- post parsing (the generator's own output format, tolerant of hand edits)

function parseFrontMatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { fm: {}, body: md };
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1');
  }
  return { fm, body: md.slice(m[0].length) };
}

function parseFigure(html) {
  const tilt = /plate-tilt-l/.test(html) ? 'l' : 'r';
  const caption = (html.match(/<figcaption>([\s\S]*?)<\/figcaption>/) || [])[1] || '';
  if (/<video/.test(html)) {
    const src = (html.match(/<source src="([^"]+)"/) || [])[1] || '';
    return { type: 'video', src, caption, tilt };
  }
  const img = html.match(/<img src="([^"]+)"(?:\s+alt="([^"]*)")?/);
  if (img) return { type: 'img', src: img[1], alt: img[2] || '', caption, tilt };
  return { type: 'raw', text: html };
}

function parseBody(body) {
  const blocks = [];
  const lines = body.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    if (!lines[i].trim()) { i++; continue; }
    if (lines[i].trim().startsWith('<figure')) {
      const buf = [];
      while (i < lines.length) {
        buf.push(lines[i]);
        if (lines[i].includes('</figure>')) { i++; break; }
        i++;
      }
      blocks.push(parseFigure(buf.join('\n')));
    } else {
      const buf = [];
      while (i < lines.length && lines[i].trim()) { buf.push(lines[i]); i++; }
      const text = buf.join('\n');
      // anything that looks like unknown block-level HTML stays a raw block
      if (/^\s*</.test(text) && !/^\s*<a /.test(text)) blocks.push({ type: 'raw', text });
      else blocks.push({ type: 'p', text });
    }
  }
  return blocks;
}

// ---- serialization

const escAttr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function figureMarkup(b, src) {
  const cls = `plate plate-tilt-${b.tilt === 'l' ? 'l' : 'r'}`;
  const cap = (b.caption || '').trim();
  if (b.type === 'video') {
    return `<figure class="${cls}">\n  <video controls preload="metadata" playsinline>\n    <source src="${src}" type="${MIME[path.extname(src).toLowerCase()] || 'video/mp4'}">\n    Your browser does not play this video; the file is <a href="${src}">here</a>.\n  </video>\n  <figcaption>${cap}</figcaption>\n</figure>`;
  }
  return `<figure class="${cls}">\n  <img src="${src}" alt="${escAttr(b.alt || '')}">\n  <figcaption>${cap}</figcaption>\n</figure>`;
}

// media files are named M-D-YYYY-slug-N.ext, N continuing past what exists
function nextMediaName(dir, prefix, ext, taken) {
  let n = 1;
  const existing = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  for (const f of [...existing, ...taken]) {
    const m = f.match(new RegExp(`^${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-(\\d+)\\.`));
    if (m) n = Math.max(n, Number(m[1]) + 1);
  }
  return `${prefix}-${n}${ext}`;
}

function savePost(payload) {
  const { title, slug, date, blocks, force, file } = payload;
  if (!title || !slug || !date || !Array.isArray(blocks)) throw new Error('missing fields');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('bad date');
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error('bad slug');

  const mdName = file || `${date}-${slug}.md`;
  const mdPath = path.join(POSTS_DIR, mdName);
  if (!file && fs.existsSync(mdPath) && !force) return { conflict: true, file: mdName };

  const [y, mo, d] = date.split('-').map(Number);
  const prefix = `${mo}-${d}-${y}-${slug}`;
  const staged = { img: [], video: [] };
  const resolved = {}; // stagedId -> final src
  const wrote = [];

  // first pass: name and copy staged media
  for (const b of blocks) {
    if ((b.type === 'img' || b.type === 'video') && b.staged) {
      const from = path.join(STAGE, path.basename(b.staged));
      if (!fs.existsSync(from)) throw new Error(`staged file missing: ${b.staged}`);
      const ext = path.extname(b.staged).toLowerCase();
      const dir = b.type === 'img' ? IMG_DIR : MEDIA_DIR;
      const list = b.type === 'img' ? staged.img : staged.video;
      const name = nextMediaName(dir, prefix, ext, list);
      list.push(name);
      fs.mkdirSync(dir, { recursive: true });
      fs.copyFileSync(from, path.join(dir, name));
      resolved[b.staged] = (b.type === 'img' ? '/assets/img/posts/' : '/assets/media/') + name;
      wrote.push(path.relative(ROOT, path.join(dir, name)).replace(/\\/g, '/'));
    }
  }

  const parts = [];
  for (const b of blocks) {
    if (b.type === 'p') { if (b.text.trim()) parts.push(b.text.trim()); }
    else if (b.type === 'raw') { if (b.text.trim()) parts.push(b.text.trim()); }
    else if (b.type === 'img' || b.type === 'video') {
      const src = b.staged ? resolved[b.staged] : b.src;
      if (src) parts.push(figureMarkup(b, src));
    }
  }

  const fmTitle = title.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const md = `---\nlayout: post\ntitle: "${fmTitle}"\ndate: ${date}\npermalink: /blog/${slug}/\n---\n\n${parts.join('\n\n')}\n`;
  fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.writeFileSync(mdPath, md, 'utf8');
  wrote.unshift(path.relative(ROOT, mdPath).replace(/\\/g, '/'));
  return { file: mdName, wrote, resolved };
}

// ---- server

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const p = url.pathname;
  try {
    if (req.method === 'GET' && (p === '/' || p === '/index.html')) {
      return send(res, 200, fs.readFileSync(path.join(ROOT, 'postmaker.html')), MIME['.html']);
    }
    if (req.method === 'GET' && p.startsWith('/assets/')) {
      const fp = path.join(ROOT, ...p.split('/').filter(s => s && s !== '..'));
      if (!fs.existsSync(fp) || !fs.statSync(fp).isFile()) return send(res, 404, 'not found', 'text/plain');
      return send(res, 200, fs.readFileSync(fp), MIME[path.extname(fp).toLowerCase()] || 'application/octet-stream');
    }
    if (req.method === 'GET' && p.startsWith('/staged/')) {
      const fp = path.join(STAGE, path.basename(p));
      if (!fs.existsSync(fp)) return send(res, 404, 'not found', 'text/plain');
      return send(res, 200, fs.readFileSync(fp), MIME[path.extname(fp).toLowerCase()] || 'application/octet-stream');
    }
    if (req.method === 'GET' && p === '/api/posts') {
      const posts = fs.existsSync(POSTS_DIR)
        ? fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md')).sort().reverse().map(f => {
            const { fm } = parseFrontMatter(fs.readFileSync(path.join(POSTS_DIR, f), 'utf8'));
            return { file: f, title: fm.title || f, date: fm.date || '' };
          })
        : [];
      return send(res, 200, posts);
    }
    if (req.method === 'GET' && p === '/api/post') {
      const file = path.basename(url.searchParams.get('file') || '');
      const fp = path.join(POSTS_DIR, file);
      if (!file.endsWith('.md') || !fs.existsSync(fp)) return send(res, 404, { error: 'not found' });
      const { fm, body } = parseFrontMatter(fs.readFileSync(fp, 'utf8'));
      const slug = ((fm.permalink || '').match(/^\/blog\/([a-z0-9-]+)\/?$/) || [])[1]
        || file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
      return send(res, 200, { file, title: fm.title || '', date: fm.date || '', slug, blocks: parseBody(body) });
    }
    if (req.method === 'POST' && p === '/api/upload') {
      const name = url.searchParams.get('name') || 'file';
      const ext = path.extname(name).toLowerCase();
      const kind = IMG_EXT.has(ext) ? 'img' : VID_EXT.has(ext) ? 'video' : null;
      if (!kind) return send(res, 400, { error: `unsupported file type ${ext || '(none)'}` });
      const id = crypto.randomBytes(8).toString('hex') + ext;
      fs.writeFileSync(path.join(STAGE, id), await readBody(req));
      return send(res, 200, { id, url: '/staged/' + id, kind });
    }
    if (req.method === 'POST' && p === '/api/save') {
      const payload = JSON.parse((await readBody(req)).toString('utf8'));
      const result = savePost(payload);
      return send(res, result.conflict ? 409 : 200, result);
    }
    send(res, 404, 'not found', 'text/plain');
  } catch (err) {
    send(res, 500, { error: err.message });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${PORT}/`;
  console.log(`postmaker at ${url} (root: ${ROOT})`);
  if (!process.env.POSTMAKER_NO_OPEN) exec(`start "" "${url}"`);
});
