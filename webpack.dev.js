const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    // server run 起來後自動在瀏覽器開啟
    open: true,
    port: 9000,
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
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
      // html
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
    ],
  },
});
