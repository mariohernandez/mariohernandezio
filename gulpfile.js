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
exports.watch = series(copyImages);
