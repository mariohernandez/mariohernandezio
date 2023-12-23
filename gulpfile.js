const { src, dest, series, watch } = require("gulp");

function copyImages(cb) {
  src('./src/images/**/*')
    .pipe(dest('./dist/images'));
  cb();
}

function copyFonts(cb) {
  src('./src/fonts/*')
    .pipe(dest('./dist/fonts'));
  cb();
}

function copyCSS(cb) {
  src('./src/css/**/*')
    .pipe(dest('./dist/css'));
  cb();
}

exports.default = series(copyImages, copyFonts, copyCSS);
exports.watch = series(copyImages, copyCSS);
