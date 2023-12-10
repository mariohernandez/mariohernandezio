'use strict';

const {dest, src} = require('gulp');
const gulpImagemin = import('gulp-imagemin');
// const imagemin = require('gulp-imagemin');

// Grabs all images, runs them through imagemin
// and plops them in the dist folder
const images = () => {
  // We have specific configs for jpeg and png files to try
  // to really pull down asset sizes
  return src('./src/images/**/*')
    .pipe(
      gulpImagemin(
        [
          gulpImagemin.gifsicle({interlaced: true}),
          gulpImagemin.mozjpeg({quality: 75, progressive: true}),
          gulpImagemin.optipng({optimizationLevel: 5}),
          imagemin.optipng({optimizationLevel: 5, interlaced: null})
        ],
        {
          silent: true
        }
      )
    )
    .pipe(dest('./dist/images'))
    .on('end', () => {
     console.log('Successfully compressed images');
  });
};

module.exports = images;
