const path = require('path');

module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/assets'),
    },
  },
  module: {
    rules: [
      // 圖檔
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
    ],
  },
};
