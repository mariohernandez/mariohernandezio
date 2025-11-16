// Using the imagetransform plugin to process images.
const Image = require("@11ty/eleventy-img");

// Sort blog posts by display order.
const sortByDisplayOrder = require('./src/_11ty/utils/sort-by-display-order.js');

// Filters
const dateFilter = require('./src/_11ty/filters/date-filter.js');
const w3DateFilter = require('./src/_11ty/filters/w3-date-filter.js');

// RSS Feed plugin.
const rssPlugin = require('@11ty/eleventy-plugin-rss');

// Code highlight.
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Minify JS: https://www.11ty.dev/docs/quicktips/inline-js/
const { minify } = require("terser");

// Lint JS.
const esbuild = require('esbuild');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

// Enable the use of HTML attributes in markdown
// https://giuliachiola.dev/posts/add-html-classes-to-11ty-markdown-content/
// https://dev.to/iarehilton/11ty-markdown-attributes-2dl3
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItFootnote = require("markdown-it-footnote");

// const markdownLibrary = markdownIt(markdownItOptions).use[markdownItFootnote];

// ---------- Start of postcss compiling -------------
// https://zenzes.me/eleventy-integrate-postcss-and-tailwind-css/
const postCss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const postcssFilter = (cssCode, done) => {
	// we call PostCSS here.
	postCss([autoprefixer(), cssnano({ preset: 'default' })])
		.process(cssCode, {
			// path to our CSS file
			from: './src/css/styles.css'
		})
		.then(
			(r) => done(null, r.css),
			(e) => done(e, null)
		);
};
// ---------- End of postcss compiling -------------

// Readtime plugin.
// const readingTime = require('eleventy-plugin-reading-time');

module.exports = function(eleventyConfig) {
  // Image shortcode with responsive srcset and sizes support
  async function imageShortcode(src, alt = "", sizes = "100vw") {
    // Return empty string if src is not provided
    if (!src) {
      console.warn('[11ty Image] No image source provided');
      return '';
    }

    try {
      // Handle paths that start with / by prepending ./src
      let imagePath = src;
      if (src.startsWith('/')) {
        imagePath = `./src${src}`;
      }

      let metadata = await Image(imagePath, {
        widths: [350, 720, 960], // Responsive image widths
        formats: ["webp"], // Single format generates <img> instead of <picture>
        outputDir: "./dist/img/",
        urlPath: "/img/",
      });

      let imageAttributes = {
        alt: alt || '',
        sizes,
        loading: "lazy",
        decoding: "async",
      };

      // Generates an <img> tag with srcset and sizes attributes
      return Image.generateHTML(metadata, imageAttributes);
    } catch (error) {
      console.error(`[11ty Image] Error processing image: ${src}`, error.message);
      return '';
    }
  }

  // Register the image shortcode
  eleventyConfig.addAsyncShortcode("image", imageShortcode);

  // Markdown-it configuration
  eleventyConfig.amendLibrary("md", (markdownLibrary) => {
    markdownLibrary.use(markdownItAttrs);
    markdownLibrary.use(markdownItFootnote);
  });

  // Post readtime plugin configuration.
  // eleventyConfig.addPlugin(readingTime);

  // Process JS.
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

  // Minify JS: https://www.11ty.dev/docs/quicktips/inline-js/
  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });

  // Shortcode for getting the current year.  See partials/footer.html for usage.
  // Source: https://11ty.rocks/eleventyjs/dates/
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // ---------- Part of postcss compiling above -------------
	eleventyConfig.addNunjucksAsyncFilter('postcss', postcssFilter);
  // -------------------------------------

  // Enable quiet mode to stop seeing every file that gets processed during build.
  // eleventyConfig.setQuietMode(true);

  // ---------- Copy files to dist -------------
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/manifest.json");

  // Do not rebuild when README.md changes (You can use a glob here too)
  eleventyConfig.watchIgnores.add("README.md");

  // Or delete entries too
  eleventyConfig.watchIgnores.delete("README.md");

  // Enables syntax highlight & line numbers for code blocks.
  eleventyConfig.addPlugin(syntaxHighlight, {
    alwaysWrapLineHighlights: true,
  });

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    eleventyConfig.addTransform('htmlmin', htmlMinTransform);
  }

  // Plugins
  eleventyConfig.addPlugin(rssPlugin);

  // Add date filters
  eleventyConfig.addFilter('dateFilter', dateFilter);
  eleventyConfig.addFilter('w3DateFilter', w3DateFilter);

  // Returns blog items, sorted by display order
  eleventyConfig.addCollection('blog', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/blog/*.md'));
  });

  // Returns blog items, sorted by display order then filtered by featured
  eleventyConfig.addCollection('featuredPost', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/blog/*.md')).filter(
      x => x.data.featured
    );
  });

  // Article/blog series collections
  eleventyConfig.addCollection(
    'seriesCollections',
    require('./src/_11ty/collections/seriesCollections.js')
  );

  // Watch JavaScript dependencies (turned off by default).
  eleventyConfig.setWatchJavaScriptDependencies(false);

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addWatchTarget("./src/css/");

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
