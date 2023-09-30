'use strict';

// Include gulp
const { src, dest } = require('gulp');

// Include Our Plugins
const rename = require('gulp-rename');

// Export our tasks.
module.exports = {
  // Move manifest.webmanifest to the root of /dist..
  manifest: function() {
    return src(
      [
        './src/*.webmanifest'
      ],
      { base: './' }
    )
    .pipe(
      rename(function(path) {
        path.dirname = '';
        return path;
      })
    )
    .pipe(dest('./dist'));
  }
};
