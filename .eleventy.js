// =============================================================================
// ELEVENTY CONFIGURATION
// =============================================================================

// =============================================================================
// DEPENDENCIES & UTILITIES
// =============================================================================

// Core Eleventy plugins
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Custom utilities and filters
const sortByDisplayOrder = require('./src/_11ty/utils/sort-by-display-order.js');
const dateFilter = require('./src/_11ty/filters/date-filter.js');
const w3DateFilter = require('./src/_11ty/filters/w3-date-filter.js');
const slugify = require("slugify");

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Build tools
const { minify } = require("terser");
const esbuild = require('esbuild');

// Markdown processing
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItFootnote = require("markdown-it-footnote");
const markdownItAnchor = require('markdown-it-anchor');

// CSS processing
const postCss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// =============================================================================
// CONSTANTS & CONFIGURATION
// =============================================================================

const isProduction = process.env.NODE_ENV === 'production';

// Define your inline SVG code for anchor links
const anchorSymbol = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><g stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" class="oi-connect"><path stroke-miterlimit="10" d="M13.25 16.75 11 19a4.243 4.243 0 0 1-6-6l2.25-2.25m9.5 2.5L19 11a4.243 4.243 0 0 0-6-6l-2.25 2.25" class="oi-vector"/><path d="m9 15 6-6" class="oi-line"/></g></svg>`;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// PostCSS filter for processing CSS
const postcssFilter = (cssCode, done) => {
  postCss([autoprefixer(), cssnano({ preset: 'default' })])
    .process(cssCode, {
      from: './src/css/styles.css'
    })
    .then(
      (r) => done(null, r.css),
      (e) => done(e, null)
    );
};

// =============================================================================
// MAIN CONFIGURATION
// =============================================================================

module.exports = function(eleventyConfig) {
  // ===========================================================================
  // SLUGIFY CONFIGURATION to customize urls.
  // ===========================================================================
  eleventyConfig.addFilter("slug", (str) => {
    if (!str) {
      return;
    }
    return slugify(str, {
      lower: true,    // convert to lowercase
      strict: true,   // remove all safe special characters
      remove: /["'.]/g, // regex to explicitly remove characters like quotes or dots
    });
  });

  // ===========================================================================
  // MARKDOWN CONFIGURATION
  // ===========================================================================

  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  };

  const markdownItAnchorOptions = {
    level: [1, 2, 3], // Only apply anchors to h1, h2, and h3 tags
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      symbol: anchorSymbol,
      placement: 'after',
      ariaHidden: true,
      class: 'heading-anchor'
    }),
  };

  const markdownLib = markdownIt(markdownItOptions)
    .use(markdownItAttrs)
    .use(markdownItFootnote)
    .use(markdownItAnchor, markdownItAnchorOptions);

  eleventyConfig.setLibrary('md', markdownLib);

  // ===========================================================================
  // PLUGINS
  // ===========================================================================

  // Image processing
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp"],
    widths: ["auto"]
  });

  // Syntax highlighting for code blocks
  eleventyConfig.addPlugin(syntaxHighlight, {
    alwaysWrapLineHighlights: true
  });

  // RSS feed generation
  eleventyConfig.addPlugin(rssPlugin);

  // ===========================================================================
  // TEMPLATE FORMATS & EXTENSIONS
  // ===========================================================================

  // Process JS files with esbuild
  eleventyConfig.addTemplateFormats('js');
  eleventyConfig.addExtension('js', {
    outputFileExtension: 'js',
    compile: async (content, path) => {
      if (path !== './src/js/scripts.js') {
        return;
      }

      return async () => {
        let output = await esbuild.build({
          target: 'es2020',
          entryPoints: [path],
          minify: true,
          bundle: true,
          write: false,
        });

        return output.outputFiles[0].text;
      }
    }
  });

  // ===========================================================================
  // FILTERS & SHORTCODES
  // ===========================================================================

  // Embed CodePen Shortcode
  eleventyConfig.addShortcode("codepen", (url, height = 560) => {
    // Extracts the slug from a URL like codepen.io
    const parts = url.split('/');
    const user = parts[3];
    const slug = parts[parts.length - 1];

    return `<p class="codepen" data-height="${height}" data-default-tab="result" data-slug-hash="${slug}" data-user="${user}" data-preview="true">
    <span>See the Pen <a href="${url}">by Mario Hernandez (<a href="https://codepen.io/mariohernandez">@mariohernandez</a>)
    View on CodePen</a><a href="https://codepen.io">CodePen</a>.</span></p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>`;
  });

  // Date filters
  eleventyConfig.addFilter('dateFilter', dateFilter);
  eleventyConfig.addFilter('w3DateFilter', w3DateFilter);

  // JS minification filter
  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (code, callback) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      callback(null, code); // Fail gracefully
    }
  });

  // PostCSS filter
  eleventyConfig.addNunjucksAsyncFilter('postcss', postcssFilter);

  // Shortcode for current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // ===========================================================================
  // COLLECTIONS
  // ===========================================================================

  // Blog posts collection
  eleventyConfig.addCollection('blog', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/blog/*.md'));
  });

  // Featured posts collection
  eleventyConfig.addCollection('featuredPost', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/blog/*.md')).filter(
      x => x.data.featured
    );
  });

  // Series collections
  eleventyConfig.addCollection(
    'seriesCollections',
    require('./src/_11ty/collections/seriesCollections.js')
  );

  // ===========================================================================
  // PASSTHROUGH COPIES & WATCH SETTINGS
  // ===========================================================================

  // Copy static assets
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/manifest.json");

  // Watch targets
  eleventyConfig.addWatchTarget("./src/css/");

  // Watch ignores
  eleventyConfig.watchIgnores.add("README.md");

  // Build settings
  eleventyConfig.setWatchJavaScriptDependencies(false);
  eleventyConfig.setUseGitIgnore(false);

  // ===========================================================================
  // PRODUCTION OPTIMIZATIONS
  // ===========================================================================

  if (isProduction) {
    eleventyConfig.addTransform('htmlmin', htmlMinTransform);
  }

  // ===========================================================================
  // CONFIGURATION RETURN
  // ===========================================================================

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ["md", "njk", "html"],
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
