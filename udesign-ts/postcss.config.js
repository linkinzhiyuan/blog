module.exports = {
  postcssOptions: {
    plugins: [
      'autoprefixer',
      ['postcss-preset-env', { stage: 0 }],
    ],
  },
};
