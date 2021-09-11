// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

const rssPlugin = require('@11ty/eleventy-plugin-rss');

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = config => {
  // Enables syntax highlighted for code snippets.
  config.addPlugin(syntaxHighlight);

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
