import postcssImport from 'postcss-import';
import cssnano from 'cssnano';
import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';

export default {
  plugins: [
    postcssImport(),
    cssnano(),
    postcssNested(),
    autoprefixer(),
    postcssPresetEnv({
      stage: 4,
      features: {
        'custom-media-queries': { preserve: true },
      }
    }),
  ],
};
