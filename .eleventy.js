// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

const rssPlugin = require('@11ty/eleventy-plugin-rss');

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
			from: './src/css/**/*.css'
		})
		.then(
			(r) => done(null, r.css),
			(e) => done(e, null)
		);
};
// ---------- End of postcss compiling -------------


module.exports = config => {

  // ---------- Part of postcss compiling above -------------
  config.addWatchTarget('./src/css/**/*.css');
	config.addNunjucksAsyncFilter('postcss', postcssFilter);
  // -------------------------------------

  // Enables html attributes in markdown
  config.setLibrary('md', markdownLib);

  // Enables syntax highlighted for code snippets.
  config.addPlugin(syntaxHighlight);

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
  }

  // Plugins
  config.addPlugin(rssPlugin);

  // Add date filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);

  const sortByDisplayOrder = require('./src/utils/sort.js');

  // Returns blog items, sorted by display order
  config.addCollection('blog', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/blog/*.md'));
  });

  // Returns blog items, sorted by display order then filtered by featured
  config.addCollection('featuredPost', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/blog/*.md')).filter(
      x => x.data.featured
    );
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

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
