# Portfolio

My Academic portfolio - a manuscript-themed Jekyll site for GitHub Pages.

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
---

Your content here in Markdown.
```

### Add a project
Create a file in `_projects/` named `your-project.md`:

```markdown
---
title: "Project Name"
type: "Interactive Visualization"
date: 2025-06-01
tags: [D3.js, GIS]
description: "One-line description for the listing page."
---

Full project description in Markdown.
```

### Add a publication
Edit `_data/publications.yml` - add an entry under the right year:

```yaml
- title: "Your Paper Title"
  authors: "Maziarz, T."
  venue: "Journal Name, vol(issue)"
  pdf: "/assets/papers/your-paper.pdf"
  doi: "10.xxxx/xxxxx"
```

### Update your CV
Edit `_data/cv.yml` — add entries under the right section.

### Add your photo
Replace the placeholder in `index.md` with:
```html
<div class="home-photo">
  <img src="/assets/img/headshot.jpg" alt="Trent Maziarz">
</div>
```
And put your photo at `assets/img/headshot.jpg`.

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
│   └── project.html     # Project page layout
├── _includes/           # Reusable HTML fragments
│   ├── head.html        # <head> tag contents
│   ├── header.html      # Site header + nav
│   ├── borders.html     # Manuscript border decorations
│   └── footer.html      # Page footer
├── _projects/           # Project files (Markdown)
├── _posts/              # Blog posts (Markdown)
├── _data/
│   ├── publications.yml # Publications data
│   └── cv.yml           # CV data
├── assets/
│   ├── css/main.css     # All styles
│   ├── img/             # Images
│   └── papers/          # PDF papers
├── projects/index.html  # Projects listing page
├── posts/index.html     # Posts listing page
├── publications/index.html # Publications listing page
├── cv/index.md          # CV page
├── index.md             # Home page
├── CNAME                # Custom domain
├── Gemfile              # Ruby dependencies
└── README.md            # This file
```
