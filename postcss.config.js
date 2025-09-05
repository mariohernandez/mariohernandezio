module.exports = {
  plugins: [
    require('postcss-import'),
    require('cssnano'),
    require('postcss-nested')(),
    require('autoprefixer')(),
    require('postcss-mixins')(),
    require('postcss-preset-env')({
      stage: 4,
      features: {
        'custom-media-queries': { preserve: true },
      }
    }),
  ],
};
