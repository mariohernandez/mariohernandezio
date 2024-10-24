/**
* Blog / Article series collections
* @param {*} collection
* @returns published posts in designated series order
*/

module.exports = function (collection) {
  // Collect all posts that are part of a series
  const rawSeriesCollections = collection
    .getFilteredByGlob("../../content/series/*")
    .sort(function (a, b) {
      return a.data.title.localeCompare(b.data.title);
    });

  // Build up the content in the collection
  const seriesCollections = {};
  collection.getAll().forEach(function (item) {
    if (item.data.series) {
      if (!seriesCollections[item.data.series.slug]) {
        seriesCollections[item.data.series.slug] = {
          posts: [],
          description: item.data.series.description,
        };
      }
      seriesCollections[item.data.series.slug].posts.push(item);
    }
  });

  // Sort by the order
  for (const [slug, seriesCollection] of Object.entries(seriesCollections)) {
    seriesCollection.posts.sort(function (a, b) {
      return a.data.series.order - b.data.series.order;
    });

    // Attach collection object
    seriesCollections[slug].collection = rawSeriesCollections.find(
      (coll) => coll.template.parsed.name === slug
    );
  }
  return seriesCollections;
}
