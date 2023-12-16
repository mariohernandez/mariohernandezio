const { src, dest } = require("gulp");

function copyImages(cb) {
   src('./src/images/**/*')
        .pipe(dest('./dist/images'));
   cb();
}
exports.default = copyImages;
