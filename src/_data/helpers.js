module.exports = {
  /**
   * Returns back some attributes based on whether the
   * link is active or a parent of an active item
   *
   * @param {String} itemUrl The link in question
   * @param {String} pageUrl The page context
   * @returns {String} The attributes or empty
   */
  getLinkActiveState(itemUrl, pageUrl) {
    let response = '';

    if (itemUrl === pageUrl) {
      response = ' aria-current="page"';
    }

    if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
      response += ' data-state="active"';
    }

    return response;
  },

  /**
   * Filters out the passed item from the passed collection
   * and randomises and limits them based on flags
   *
   * @param {Array} collection The 11ty collection we want to take from
   * @param {Object} item The item we want to exclude (often current page)
   * @param {Number} limit=3 How many items we want back
   * @param {Boolean} random=true Wether or not this should be randomised
   * @returns {Array} The resulting collection
   */
  getSiblingContent(collection, item, limit = 3, random = true) {
    let filteredItems = collection.filter(x => x.url !== item.url);

    if (random) {
      let counter = filteredItems.length;

      while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        counter--;

        let temp = filteredItems[counter];

        // Swap the last element with the random one
        filteredItems[counter] = filteredItems[index];
        filteredItems[index] = temp;
      }
    }

    // Lastly, trim to length
    if (limit > 0) {
      filteredItems = filteredItems.slice(0, limit);
    }

    return filteredItems;
  },

  /**
   * Creates a dynamic date and returns the current year. Function is used
   * in the `_includes/partials/footer.html`.
   *
   * @param {String} currentYear Name of the function
   * @param {String} today Variable for checking today's date
   * @returns {String} The output of today's date with the format of year only.
   */
  currentYear() {
    const today = new Date();
    return today.getFullYear();
  }
};
