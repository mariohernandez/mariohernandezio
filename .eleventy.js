// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
// RSS Feed plugin.
const rssPlugin = require('@11ty/eleventy-plugin-rss');
// Code highlight.
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');
// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';
// Enable the use of HTML attributes in markdown
// https://giuliachiola.dev/posts/add-html-classes-to-11ty-markdown-content/
// https://dev.to/iarehilton/11ty-markdown-attributes-2dl3
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true
};
const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);

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
			from: './src/_includes/styles/styles.css'
		})
		.then(
			(r) => done(null, r.css),
			(e) => done(e, null)
		);
};
// ---------- End of postcss compiling -------------


module.exports = function(eleventyConfig) {
  // Short code for getting the current year.  See partials/footer.html for usage.
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // ---------- Part of postcss compiling above -------------
  eleventyConfig.addWatchTarget('./src/_includes/styles/styles.css');
	eleventyConfig.addNunjucksAsyncFilter('postcss', postcssFilter);
  // -------------------------------------

  // ---------- Add a Watch method for CSS ---------------
  // eleventyConfig.addWatchTarget("./src/css/");

  // Enable quiet mode to stop seeing every file that gets processed during build.
  eleventyConfig.setQuietMode(true);

  // ---------- Copy files to dist -------------
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/images");
  // eleventyConfig.addPassthroughCopy("./src/css");

  // Do not rebuild when README.md changes (You can use a glob here too)
  eleventyConfig.watchIgnores.add("README.md");

  // Or delete entries too
  eleventyConfig.watchIgnores.delete("README.md");

  // Enables html attributes in markdown
  eleventyConfig.setLibrary('md', markdownLib);

  // Enables syntax highlighted for code snippets.
  eleventyConfig.addPlugin(syntaxHighlight);

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    eleventyConfig.addTransform('htmlmin', htmlMinTransform);
  }

  // Plugins
  eleventyConfig.addPlugin(rssPlugin);

  // Add date filters
  eleventyConfig.addFilter('dateFilter', dateFilter);
  eleventyConfig.addFilter('w3DateFilter', w3DateFilter);

  const sortByDisplayOrder = require('./src/utils/sort.js');

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

  // Watch JavaScript dependencies (turned off by default).
  eleventyConfig.setWatchJavaScriptDependencies(false);

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  eleventyConfig.setUseGitIgnore(false);

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
