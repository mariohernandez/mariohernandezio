module.exports = config => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/');

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
