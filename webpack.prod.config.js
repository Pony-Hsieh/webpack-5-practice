const path = require('path');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// purgecss-webpack-plugin 引入方式較不同，需注意
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  // devtool: "source-map",
  // devtool: false,
  entry: './src/index.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash:8].js',
    // chunkFilename: "[id].[chunkhash:8].js",
    // chunkFilename: "[name].[chunkhash:8].js", // id, name 應該都可以
  },
  resolve: {
    // resolve.alias 優先級高於其它模塊解析方式
    alias: {
      '@': path.resolve(__dirname, 'src/assets/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.[contenthash:8].html',
      // filename: "index.html", // 測試用
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css',
    }),
    new PurgeCSSPlugin({
      // 我要分析的是 src 底下的檔案有沒有用到相關的 css，而不是 assets 底下的檔案有沒有用到
      paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*`, {
        // only want the files, not the dirs
        nodir: true,
      }),
    }),
  ],
  optimization: {
    // minimize: false, // 查看未壓縮的程式碼
    // realContentHash: false,
    splitChunks: {
      chunks: 'all', // async(預設) | all | initial
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.table'],
          },
        },
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                {
                                  xmlns: 'http://www.w3.org/2000/svg',
                                },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      // js
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        // 執行順序由後往前
        use: [
          // 使用 babel 處理 js 兼容性，詳細設定寫在 .babelrc 中
          'babel-loader',
        ],
      },
      // SCSS
      /**
       * 步驟：
       * 1. 將 .scss 編譯成 .css
       * 2. 處理 css 兼容性(跨瀏覽器、不同版本)(依據 browserslist 決定)
       * 3. 提取出來
       * 4. 載入至 html 中
       *
       * 注意：
       * - 在 loader 中的執行順序是由後往前
       */
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // 將 css 單獨提取出來(二擇一)
          // "style-loader", // 將 css 合併至 js 中(二擇一)
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // postcss-preset-env Options
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                // 測試哪個在 compress css
                // 測試後發現 sass loader 就會 compress 了
                // 壓縮 css 為一行 + 移除所有註解(/*! 開頭的註解不會被移除)
                // style: "expanded", // 無法輸出非壓縮格式的 css
                // outputStyle: "expanded", // 可以輸出非壓縮格式的 css
              },
            },
          },
        ],
      },
      // 圖檔
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:8][ext]',
        },
      },
    ],
  },
};
