module.exports = {
  plugins: [
    require('postcss-import'),
    require('cssnano'),
    require('postcss-nested')(),
    require('autoprefixer')(),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'custom-media-queries': { preserve: true },
      }
    }),
  ],
};
