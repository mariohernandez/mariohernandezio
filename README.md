# Mario Hernandez - Personal Blog

A personal blog website focused on Drupal front-end development and responsive images, built with Eleventy 3.x, PostCSS, and deployed on Netlify.

## About

I am a Front-end Software Engineer who specializes in [Drupal](https://drupal.org) front-end development. I have been building Drupal websites since 2008 and have worked on some of the most well known brands. I am also a speaker at open source events where I talk about all things front-end and Drupal. I love writing about Drupal and Front-end development in general in my personal blog.

- 🌍  I'm based in Los Angeles
- 🖥️  Read my blog at [mariohernandez.io](https://mariohernandez.io)
- 🧠  I work at [UCLA Health](https://www.uclahealth.org/) as a Sr. Drupal Front-end Developer

## Tech Stack

### Core Technologies
- **Static Site Generator:** [Eleventy 3.x](https://www.11ty.dev/)
- **Template Engine:** Nunjucks
- **CSS Processing:** PostCSS with nested syntax support
- **JavaScript Bundler:** esbuild
- **Search:** Pagefind
- **Node.js Version:** 22.19.0 (see `.nvmrc`)

### Key Dependencies
- `@11ty/eleventy` (^3.1.1) - Static site generator
- `@11ty/eleventy-img` (^6.0.4) - Image optimization and transformation
- `@11ty/eleventy-plugin-rss` (^2.0.4) - RSS feed generation
- `@11ty/eleventy-plugin-syntaxhighlight` (^5.0.1) - Code syntax highlighting
- `markdown-it` (^14.1.0) - Markdown processing with plugins:
  - `markdown-it-attrs` - Add classes/attributes to markdown elements
  - `markdown-it-footnote` - Footnote support
  - `markdown-it-anchor` - Automatic heading anchors (h1-h3)
- `postcss` (^8.5.4) - CSS transformation pipeline
- `esbuild` (^0.27.0) - JavaScript bundling and minification
- `terser` (^5.41.0) - JavaScript minification
- `@biomejs/biome` (^2.2.0) - Linter for JS and CSS

## Project Structure

```
.
├── .eleventy.js           # Eleventy configuration
├── postcss.config.js      # PostCSS configuration
├── biome.json             # Biome linter configuration
├── netlify.toml           # Netlify deployment config
├── .nvmrc                 # Node version specification
├── .mcp.json              # MCP server configuration (Netlify)
├── src/
│   ├── _11ty/
│   │   ├── collections/   # Custom Eleventy collections
│   │   ├── filters/       # Date formatting filters
│   │   └── utils/         # Helper utilities
│   ├── _data/             # Global data files
│   │   ├── helpers.js     # Helper functions
│   │   ├── navigation.json # Site navigation
│   │   ├── site.json      # Site metadata
│   │   └── social.json    # Social media links
│   ├── _includes/
│   │   ├── components/    # Reusable UI components
│   │   ├── layouts/       # Page layouts
│   │   └── partials/      # Template fragments
│   ├── blog/              # Markdown blog posts
│   ├── css/               # PostCSS source files
│   │   ├── base/          # Base styles
│   │   ├── components/    # Component styles
│   │   └── utilities/     # Utility classes
│   ├── images/            # Static images
│   │   └── thumbs/        # Image thumbnails
│   ├── js/                # JavaScript source
│   │   └── scripts.js     # Main JavaScript entry point
│   ├── pages/             # Static pages
│   └── transforms/        # Build-time HTML transformations
└── dist/                  # Build output (gitignored)
```

## Getting Started

### Prerequisites
- Node.js 22.19.0 (use nvm for version management)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone git@github.com:mariohernandez/mariohernandezio.git

# Navigate to project directory
cd mariohernandezio

# Install Node.js version from .nvmrc
nvm install

# Install dependencies
npm install
```

### Development

```bash
# Start Eleventy dev server with hot reload
npm start

# In a separate terminal, watch and compile CSS changes
npm run watch:css
```

The dev server will start at `http://localhost:8080` with live reloading enabled.

**Important:** CSS compilation runs separately from Eleventy. Always run `npm run watch:css` during development to see CSS changes.

### Build Commands

```bash
# Compile CSS once
npm run compile:css

# Full production build (CSS + Eleventy + Pagefind indexing)
npm run production

# Run Pagefind search server locally
npm run search

# Run Biome linter
npm run lint
```

## Configuration Details

### Eleventy Configuration (`.eleventy.js`)

**Input/Output:**
- Input directory: `src/`
- Output directory: `dist/`

**Template Engines:**
- Markdown templates: Nunjucks
- Data files: Nunjucks
- HTML templates: Nunjucks

**Collections:**
- `blog` - All blog posts sorted by display order
- `featuredPost` - Posts with `featured: true` in frontmatter
- `seriesCollections` - Multi-part posts grouped by series slug

**Markdown Processing:**
- Parser: markdown-it with HTML, breaks, and linkify enabled
- Plugins:
  - Attributes support for adding classes/IDs to elements
  - Footnote syntax support
  - Auto-generated heading anchors (h1-h3) with custom SVG icon

**Image Processing:**
- Automatic WebP conversion for all images
- Width: auto (preserves original dimensions)
- Plugin: @11ty/eleventy-img

**JavaScript Processing:**
- Entry point: `src/js/scripts.js`
- Bundler: esbuild (target: ES2020)
- Minification: enabled in production
- Bundle mode: enabled (includes dependencies)

**Filters & Shortcodes:**
- `dateFilter` - Format dates for display
- `w3DateFilter` - ISO 8601 date format for machine-readable dates
- `jsmin` - Terser-based JavaScript minification
- `postcss` - PostCSS processing for inline CSS
- `year` - Current year (for copyright notices)

**Production Optimizations:**
- HTML minification via html-minifier (production only)

### PostCSS Configuration (`postcss.config.js`)

**Plugin Pipeline:**
1. `postcss-import` - Inline @import rules
2. `cssnano` - CSS minification and optimization
3. `postcss-nested` - Nested CSS syntax support (Sass-like)
4. `autoprefixer` - Vendor prefix handling
5. `postcss-preset-env` - Modern CSS features with fallbacks
   - Stage: 4 (stable features)
   - Custom media queries: preserved

**Browser Support (browserslist):**
- Last 2 versions of all browsers (excluding dead browsers)
- Browsers with >= 1% global usage
- Browsers with >= 1% usage in US market

### CSS Architecture

**Methodology:** BEM (Block Element Modifier)

**Directory Structure:**
- `base/` - Reset, typography, global styles
- `components/` - Component-specific styles
- `utilities/` - Utility/helper classes

**Naming Convention:** `block__element--modifier`

### Netlify Configuration (`netlify.toml`)

**Build Settings:**
- Build command: `npm run production`
- Publish directory: `dist/`

**Redirects:**
- 301 redirects configured for post URL changes
- Ensures SEO preservation for renamed articles

## Content Management

### Blog Post Frontmatter

```yaml
---
date: "YYYY-MM-DD"               # Publication date
title: "Post Title"              # Main title
subtitle: "Optional subtitle"    # Subtitle (optional)
tags: ['tag1', 'tag2']          # Post tags
draft: false                     # Draft status
featured: false                  # Featured post flag
featuredImage: "/images/example.webp"
featuredImageAlt: "Descriptive alt text"
imageThumb: "/images/thumbs/example-thumb.webp"
featuredImageCredit: "Photographer Name"
featuredImageCreditUrl: "https://unsplash.com/@username"
summary: "Brief description"     # Summary for listings
series:                          # Optional - for multi-part posts
  slug: "series-name"           # Series identifier
  order: 1                      # Order within series
  description: "Optional"        # Series description
---
```

### Series Posts

Multi-part blog posts can be linked using the `series` frontmatter:
- `slug` - Unique identifier for the series
- `order` - Order within the series
- `description` - Optional series description

The `seriesCollections` collection automatically groups and orders these posts for navigation.

### Image Guidelines

**Formats:**
- Preferred format: WebP
- Images automatically converted to WebP during build

**Locations:**
- Full-size images: `src/images/`
- Thumbnails: `src/images/thumbs/`

**Dimensions:**
- Featured images: 16:9 ratio recommended
- Thumbnails: scaled versions of featured images

### Components

**Button Component** (`src/_includes/components/button/button.njk`):

```njk
{# Basic link button #}
{{ button('Label', '/url') }}

{# With button type and style #}
{{ button('Label', '/url', 'button', 'primary') }}

{# With extra HTML attributes #}
{{ button('Label', '/url', 'button', 'primary', { class: 'u-ml', target: '_blank' }) }}
```

Parameters:
1. Label (string)
2. URL (string)
3. Type (optional): 'link' or 'button'
4. Style (optional): 'primary', 'secondary', etc.
5. Attributes object (optional): Additional HTML attributes

## Build Pipeline

### Development Build Flow
1. User runs `npm start` - Eleventy dev server starts
2. User runs `npm run watch:css` (separate terminal) - PostCSS watches CSS
3. CSS changes → PostCSS compilation → auto-reload
4. Template/content changes → Eleventy rebuild → auto-reload

### Production Build Flow
1. `NODE_ENV=production` set
2. PostCSS compiles and minifies CSS
3. Eleventy processes:
   - Markdown → HTML (with markdown-it plugins)
   - JavaScript → bundled/minified (esbuild + Terser)
   - Images → WebP conversion
   - HTML → minified (html-minifier)
4. Pagefind indexes generated HTML for search
5. Output written to `dist/`

## Search Functionality

**Engine:** Pagefind

**Indexing:**
- Runs only during production build (`npm run production`)
- Not available during development mode

**UI Integration:**
- Search UI mounts to `#search` element
- Automatically indexes all HTML content in `dist/`

**Local Testing:**
```bash
npm run search
```

## Analytics & Integrations

**Google Analytics 4:**
- Tag ID: `G-KFWBDSLVNK`
- Configured in base layout

**RSS Feed:**
- Available at `/feed.xml`
- Generated via @11ty/eleventy-plugin-rss

**Syntax Highlighting:**
- Powered by @11ty/eleventy-plugin-syntaxhighlight
- Automatic for fenced code blocks
- Line highlighting support enabled

## Deployment

**Platform:** Netlify

**Automatic Deployment:**
- Triggered on push to main branch
- Build command: `npm run production`
- Deploy previews: enabled for pull requests

**Environment:**
- Node.js version: Specified via `.nvmrc` (22.19.0)
- Build logs: Available in Netlify dashboard

## Code Quality

**Linter:** Biome (^2.2.0)

**Configuration:** `biome.json`

**Coverage:**
- JavaScript files
- CSS files

**Usage:**
```bash
npm run lint
```

## Development Workflow

### Typical Development Session

1. **Start development servers:**
   ```bash
   npm start                # Terminal 1: Eleventy
   npm run watch:css        # Terminal 2: PostCSS
   ```

2. **Make changes:**
   - Edit templates in `src/_includes/`
   - Write content in `src/blog/`
   - Modify styles in `src/css/`
   - Update JavaScript in `src/js/`

3. **Test changes:**
   - Browse to `http://localhost:8080`
   - Changes auto-reload

4. **Before committing:**
   ```bash
   npm run lint             # Check code quality
   npm run production       # Test production build
   ```

### Adding a New Blog Post

1. Create new `.md` file in `src/blog/`
2. Add frontmatter (see template above)
3. Add featured image to `src/images/`
4. Add thumbnail to `src/images/thumbs/`
5. Write content in Markdown
6. Preview with `npm start`
7. Commit and push (auto-deploys to Netlify)

### Adding a New Component

1. Create component directory in `src/_includes/components/`
2. Add Nunjucks template file
3. Create corresponding CSS in `src/css/components/`
4. Import CSS in main styles file
5. Use component in layouts/pages

## Browser Support

Based on browserslist configuration:
- Last 2 versions of all major browsers
- Browsers with >= 1% global market share
- Browsers with >= 1% US market share
- Excludes "dead" browsers

This ensures modern CSS and JavaScript features work with automatic fallbacks where needed.

## Performance Considerations

**Optimization Strategies:**
- HTML minification in production
- CSS minification via cssnano
- JavaScript bundling and minification
- Automatic WebP image conversion
- Efficient static site generation (no runtime)

**Build Size:**
- Minimal JavaScript footprint
- Optimized CSS output
- Compressed images

## MCP Server Integration

**Netlify MCP Server:**
- Configuration: `.mcp.json`
- Enables Claude Code integration with Netlify
- Allows deployment management from IDE

## GitHub Stats

![](https://github-readme-stats.vercel.app/api?username=mariohernandez&theme=vue-dark&hide_border=true&include_all_commits=true&count_private=true)
![](https://github-readme-streak-stats.herokuapp.com/?user=mariohernandez&theme=vue-dark&hide_border=true)
![](https://github-readme-stats.vercel.app/api/top-langs/?username=mariohernandez&theme=vue-dark&hide_border=true&include_all_commits=true&count_private=true&layout=compact)

## License

ISC

## Author

Mario Hernandez

## Support & Documentation

For questions about:
- **Eleventy:** https://www.11ty.dev/docs/
- **PostCSS:** https://postcss.org/
- **Netlify:** https://docs.netlify.com/

For project-specific guidance for AI assistants, see `CLAUDE.md` in the repository root.

---

*This site was inspired by the [Piccalilly Eleventy tutorial](https://piccalil.li/course/learn-eleventy-from-scratch/)*
