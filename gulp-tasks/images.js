'use strict';

// Include gulp
const { src, dest } = require('gulp');

// Include Our Plugins
const move = require('gulp-rename');

// Export our tasks.
module.exports = {
  // Move any fonts to where Pattern Lab is lookinging for them.
  moveImages: function() {
    return src(
      [
        './src/images/**/*.gif',
        './src/images/**/*.png',
        './src/images/**/*.jpg',
        './src/images/**/*.jpeg',
        './src/images/**/*.svg',
        './src/images/**/*.webp'
      ],
      { base: './' }
    )
      .pipe(
        move(function(path) {
          path.dirname = '';
          return path;
        })
      )
      .pipe(dest('./dist/images'));
  }
};
