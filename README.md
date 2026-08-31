# Portfolio

My personal site - a scribe's-manuscript Jekyll site for GitHub Pages.
The page is ruled like a working codex: one heraldic bar, a wide outer
margin for doodles and glosses, catchwords for nav, and the family
grease on the Wares page.

## Quick Start if you want this portfolio for yourself

1. Push this entire folder to a GitHub repo named `your-username.github.io` (or any repo with GitHub Pages enabled)
2. In repo Settings → Pages, set source to "Deploy from a branch" → `main` → `/ (root)`
3. Your site will be live at `https://your-username.github.io`

## Domain Setup

1. My `CNAME` file is already set to `trentmaziarz.com`
2. At your domain registrar, add these DNS records:
   - **A records** pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME record**: `www` → `your-username.github.io`
3. In repo Settings → Pages → Custom domain, enter `trentmaziarz.com` (or whatever *your* domain is)
4. Check "Enforce HTTPS"

## How to Add Content

### Add a blog post
Create a file in `_posts/` named `YYYY-MM-DD-your-title.md`:

```markdown
---
title: "Your Post Title"
date: 2026-03-15
permalink: /blog/your-title/
---

Your content here in Markdown.
```

Photos and video go in "plates" (a thin ink frame on the parchment):

```html
<figure class="plate plate-tilt-r">
  <img src="/assets/img/posts/your-photo.webp" alt="describe it">
  <figcaption>caption in the small hand</figcaption>
</figure>
```

Alternate `plate-tilt-r` and `plate-tilt-l` so they don't lean the same way.

### Add a batch note (Wares page)
A batch note is a normal post with `categories: batch-notes` in the front
matter; the Wares page lists them automatically.

### Swap the label art for real jar photos
Replace `assets/img/labels/front-steel.svg` and
`assets/img/labels/front-wagon.svg`. Nothing else needs to change.

### Margin doodles
The home page marginalia live in `assets/img/marginalia/`. The margin is
full; retired or replaced pieces go to `_archive/`, never deleted.

### Exclude the umaring

```html
<script id="umaring_js" src="https://umaring.mkr.cx/ring.js?id=trentmaziarz"></script>
<div id="umaring"></div>
```
This is unique to my site due to my affilation to UMASS

## File Structure

```
├── _config.yml          # Site settings
├── _layouts/            # Page templates
│   ├── default.html     # Base manuscript layout
│   ├── post.html        # Blog post layout
│   └── project.html     # Project page layout (parked)
├── _includes/           # Reusable HTML fragments
│   ├── head.html        # <head> tag contents
│   ├── header.html      # Running head + nav
│   ├── borders.html     # Heraldic bar + pricking
│   └── footer.html      # Page footer
├── _posts/              # Blog posts (Markdown)
├── _projects/           # Project files (parked, not published)
├── _archive/            # Retired pages and data; nothing is deleted
├── assets/
│   ├── css/main.css     # All styles (the ruled-page system lives here)
│   ├── img/             # Images, marginalia doodles, label art
│   └── media/           # Video
├── blog/index.html      # Blog contents page
├── wares/index.md       # Maź Maziarza, the family grease
├── index.md             # Home page
├── CNAME                # Custom domain
├── Gemfile              # Ruby dependencies
└── README.md            # This file
```
