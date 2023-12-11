'use strict';

const { src, dest, series, watch } = require('gulp');
const squoosh = require('gulp-libsquoosh');

// Copies images from src to dist on demand.
function copyImages(cb) {
  return src('src/images/**')
    .pipe(squoosh())
    .pipe(dest('dist/images'));
    console.log('Helloooooo world!');
  cb();
};

exports.default = copyImages;
