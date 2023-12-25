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

exports.default = series(copyImages, copyFonts);
exports.watch = series(copyImages);
