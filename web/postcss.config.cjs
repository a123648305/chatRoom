/* eslint-disable no-undef */
// postcss.config.js
module.exports = {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: 375,
        unitToConvert: 'px',
        unitPrecision: 3, // 精度
        viewportUnit: 'vw',
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        exclude: [/^vant-.*/],
      },
    },
};
  