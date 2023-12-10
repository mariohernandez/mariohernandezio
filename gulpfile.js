'use strict';

const { src, dest, series, watch } = require('gulp');
const squoosh = require('gulp-libsquoosh');

// Copy images into dist/images
function copyImages() {
  return src('src/images/**')
    .pipe(squoosh())
    .pipe(dest('dist/images'));
};

exports.default = series(copyImages);

// Watch images and copy to dist/images.
function watchImages() {
  watch('./src/images/**/*');
  return src('src/images/**')
    .pipe(squoosh())
    .pipe(dest('dist/images'));
};

exports.watch = series(watchImages);
