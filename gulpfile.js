const { src, dest, series } = require('gulp');
const squoosh = require('gulp-libsquoosh');

// Copy images to /dist/images.
function copyImages(cb) {
  return src('src/images/**/*')
    .pipe(squoosh())
    .pipe(dest('dist/images'));
  cb();
};

exports.default = series(copyImages);
