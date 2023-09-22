const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    // server run 起來後自動在瀏覽器開啟
    open: true,
    port: 9000,
  },
  mode: 'development',
  entry: './src/index.js',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/assets'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      // SCSS
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // 圖檔
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
      // html
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
    ],
  },
};
