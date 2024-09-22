/* Goes with the Blog / Article series collections */
module.exports = function filterSeries(series) {
  return (series || []).filter((x) => x.data.series);
};
