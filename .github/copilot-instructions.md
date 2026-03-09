# Copilot Instructions for mariohernandezio

This is a personal blog built with Eleventy (11ty). The site focuses on Drupal front-end development topics and responsive image handling.

## Project Architecture

### Key Components

- **Blog Engine**: Built on Eleventy 3.x using Nunjucks templating
- **CSS Processing**: PostCSS with nested syntax, autoprefixer, and cssnano
- **Content**: Markdown files with YAML frontmatter in `src/blog/`
- **JavaScript**: Processed with esbuild, minified with Terser
- **Search**: Implemented using Pagefind

### Directory Structure

```plaintext
src/
├── _11ty/          # Eleventy configs, collections, filters
├── _data/          # Global data files
├── _includes/      # Templates, layouts, components
├── blog/           # Markdown blog posts
├── css/           # PostCSS source files
└── js/            # JavaScript source files
```

## Development Workflow

### Setup

```bash
nvm install        # Install Node.js 20+
npm install        # Install dependencies
```

### Common Commands

```bash
npm start          # Start dev server (Eleventy)
npm run watch:css  # Watch CSS files for changes
npm run production # Build for production with optimizations
npm run search     # Run Pagefind search indexing
```

### Content Creation Patterns

#### Blog Posts

- Place in `src/blog/` with `.md` extension
- Required frontmatter:

```yaml
---
date: "YYYY-MM-DD"
title: "Post Title"
tags: ['tag1', 'tag2']
draft: false
featuredImage: "/images/example.webp"  # 16:9 ratio recommended
imageThumb: "/images/thumbs/example.webp"
summary: "Brief post description"
---
```

#### Series Posts

Add series metadata for multi-part content:

```yaml
series:
  slug: "series-name"
  order: 1
```

### Code Conventions

#### CSS

- Use PostCSS with nested syntax
- Follow BEM naming: `block__element--modifier`
- Base styles in `src/css/base/`
- Components in `src/css/components/`

#### Images

- WebP format preferred for best compression
- Store in `src/images/`:
  - Full-size in root
  - Thumbnails in `thumbs/`
- Use responsive image patterns:

```html
<img src="..."
     srcset="..."
     sizes="..."
     loading="lazy"
     alt="Descriptive text">
```

## Build & Deploy

### Production Build

1. CSS is minified and optimized
2. HTML is minified in production
3. JavaScript is bundled and minified
4. Images are passed through as-is

### Deploy Checks

- Run `npm run production` to verify build
- Check PageSpeed Insights score
- Validate image optimization
- Test search functionality

## Integration Points

### Search Integration

- Pagefind indexes content on build
- UI mounted to `#search` element
- Configured in `base.html` layout

### Analytics

- Google Analytics 4 configured
- Tag: `G-KFWBDSLVNK`
- Tracked in `base.html`

### RSS Feed

- Available at `/feed.xml`
- Uses `@11ty/eleventy-plugin-rss`
- Configure in `site.json`

## Troubleshooting Guide

### Build Issues

#### CSS Processing Errors

- **Issue**: PostCSS compilation fails

  ```bash
  Error: Unexpected }
  ```

- **Fix**: Check for:
  1. Proper nesting syntax in PostCSS files
  2. Missing closing braces in component CSS
  3. Run `npm run watch:css` to catch errors during development

#### Eleventy Build Failures

- **Issue**: `[11ty] ERROR: TemplateWriteError`
- **Fix**: Common causes:
  1. Invalid frontmatter in `.md` files
  2. Syntax errors in Nunjucks templates
  3. Check latest error in terminal output
  4. Run `npm start` for detailed error stack

### Content Issues

#### Missing Images

- **Issue**: Images not appearing in blog posts
- **Fix**: Verify:
  1. Image paths start with `/images/`
  2. Images exist in correct directory
  3. Case sensitivity matches exactly
  4. Both full-size and thumb versions exist

#### Series Posts Not Linking

- **Issue**: Series navigation missing/broken
- **Fix**: Check:
  1. `series` frontmatter format matches exactly:

     ```yaml
     series:
       slug: "matching-slug"
       order: 1
     ```

  2. All posts in series use identical `slug`
  3. Orders are sequential without gaps

### Development Issues

#### Hot Reload Not Working

- **Issue**: Changes not reflecting in browser
- **Fix**:
  1. Check correct watch command is running
  2. For CSS: `npm run watch:css`
  3. For templates: `npm start`
  4. Clear browser cache or hard reload

#### Search Index Issues

- **Issue**: Search not finding content
- **Fix**:
  1. Run `npm run production` first
  2. Then `npm run search`
  3. Verify `dist/` exists
  4. Check console for Pagefind errors

## Examples

### Button macro (recommended usage)

This project provides a `button` Nunjucks macro at `src/_includes/components/button/button.njk`.
It now expects an attribute mapping for `attrs` (object) and escapes the label by default.

- Simple link-style button:

```njk
{# Renders: <a class="btn btn-primary" href="/blog/post">Read more</a> #}
{{ button('Read more', '/blog/post') }}
```

- External link that opens in a new tab (rel added automatically):

```njk
{# Renders: <a class="btn btn-secondary" href="https://example.com" target="_blank" rel="noopener noreferrer">External</a> #}
{{ button('External', 'https://example.com', '', 'secondary', { target: '_blank' }) }}
```

- Button with extra classes:

```njk
{# Renders: <button class="btn btn-primary u-ml">Subscribe</button> #}
{{ button('Subscribe', '', 'button', 'primary', { class: 'u-ml' }) }}
```

If you need to render HTML inside the label, pass a pre-sanitized value and mark it safe at the call site, e.g. `{{ button('<strong>Sign up</strong>' | safe, '/signup') }}`.


### Production Issues

#### Performance

- **Issue**: Poor PageSpeed score
- **Fix**:
  1. Compress images to WebP
  2. Verify CSS/JS minification
  3. Check image `loading="lazy"` attributes
  4. Run production build with `NODE_ENV=production`

#### Deployment

- **Issue**: Missing assets in production
- **Fix**:
  1. Check `.eleventy.js` passthrough copy
  2. Run full production build
  3. Verify all in `dist/`:
     - CSS files
     - Images
     - JavaScript
     - Search index
