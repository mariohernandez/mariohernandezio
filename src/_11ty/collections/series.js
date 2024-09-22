/**
* Blog / Article series collections
* @param {*} collection
* @returns published posts in designated series order
*/

const seriesData = require("./../../_data/seriesData.json");

module.exports = function (collection)  {
  // get all posts in chronological order
  const posts = collection.getSortedByDate();

  // this will store the mapping from series to lists of posts; it can be a regular object if you prefer
  const mapping = new Map();

  // loop over the posts
  for (const post of posts) {
    // get any series data for the current post, and store the date for later
    const { series, info, date, title, part } = post.data;

    // ignore anything with no series data
    if (series === undefined) {
      continue;
    }

    // if we haven’t seen this series before, create a new entry in the mapping
    // (i.e. take the description from the first post we encounter)
    if (!mapping.has(series)) {
      mapping.set(series, {
        name: seriesData[series].name,
        posts: [],
        info: seriesData[series].info,
        part: post.data.part,
        title,
        date,
      });
    }

    // get the entry for this series
    const existing = mapping.get(series);

    // add the current post to the list
    existing.posts.push({
      name: seriesData[series].name,
      title: title,
      info: info,
      date: date,
      url: post.url,
      part: part,
    });

    // update the date so we always have the date from the latest post
    existing.date = date;
  }

  // now to collect series containing more than one post as an array that
  // Eleventy can paginate
  const normalized = [];

  // loop over the mapping (`k` is the series title)
  for (const [
        slug,
          { title, name, posts, part, info, date },
        ] of mapping.entries()) {
          if (posts.length > 1) {
            // add any series with multiple posts to the new array
            normalized.push({ slug, title, name, posts, part, info, date });
          }
    }

  // return the array
  return normalized;
};
