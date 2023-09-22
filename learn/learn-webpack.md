# webpack

# 單點知識點
- dist 其實就是 distribution，這裡可以理解為 "發布" 的意思

# <BR/>
# <BR/>
# <BR/>

# 安裝 webpack 相關工具
- `$ npm install -dev webpack webpack-cli`
  - 可簡寫為： `$ npm install -D webpack webpack-cli`

# <BR/>
# <BR/>
# <BR/>

# loader 與 plugin
## loader
- webpack 本身其實看不懂除了 js 以外的東西(例如：css、圖片、sass...)，所以為了要讓 webpack 也能理解它，就需要倚賴眾多有用的 loaders
- loader 是文件加載器，能夠加載資源文件，並對這些文件進行一些處理，諸如編譯、壓縮等，最終一起打包到指定的文件中
- loader，實質是一個轉換器，將 A 文件進行編譯形成 B 文件，比如將 A.scss 轉變為 B.css，單純的文件轉換過程
- 模塊，webpack 預設只支援 .js， .json 文件，像其他的 .vue，.png，.scss，.css，.ts 等都不支援；  
  如果想要 webpack 支援其他類型的文件，就需要不同類型的 loader 進行解析
- loader 的執行順序為由後往前(從右向左)
## plugin
- plugin 賦予了 webpack 各種靈活的功能，例如打包優化、資源管理、環境變量注入等，目的是解決 loader 無法實現的其他事
- webpack 基於發布訂閱模式，在運行的生命週期中會廣播出許多事件；插件透過監聽這些事件，可以在特定的階段執行自己的插件任務
- Webpack 在運行的生命週期中會廣播出許多事件，plugin 可以監聽這些事件，在合適的時機透過 webpack 提供的 API 改變輸出結果
- plugin 的本質是一個構造函數
## 簡易結論
- loader 只能做 文件加載 + 轉換 + 壓縮，剩下的都需要讓 plugin 來做
- 當然，plugin 也可以壓縮就是了
## 參考文章
- [面試官：說說Loader和Plugin的區別？編寫Loader，Plugin的思路？](https://vue3js.cn/interview/webpack/Loader_Plugin.html)

# <BR/>
# <BR/>
# <BR/>

# 設定
- 自動清空輸出資料夾
  - `config.output.clean = true`
- `entry`
  - 指示 webpack 應該使用哪個模塊，來作為構建其內部 dependency graph 的開始
  - 進入入口起點後，webpack 會找出有哪些模塊和庫是入口起點（直接和間接）依賴的
- `output`
  - 告訴 webpack 在哪裡輸出它所創建的 bundle，以及如何命名這些文件
- 範例
  ```js
  // webpack 設定檔

  module.exports = {
    entry: './src/index.js',
    output: {
      // 自動清空輸出資料夾
      clean: true,
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash:8].js',
      chunkFilename: "[name].[chunkhash:8].js",
    },
  };
  ```

# <BR/>
# <BR/>
# <BR/>

# webpack Alias
- import 檔案的時候不用擔心路徑跑掉
- [webpack resolve 文檔 - 中文翻譯](https://webpack.docschina.org/configuration/resolve/)
- [[VSCode] 使用 Path Autocomplete 讓 Webpack Alias 別名路徑具 IntelliSense 支援](https://dotblogs.com.tw/wasichris/2020/01/09/112248)
  > 因為 VS Code 無法認得 webpack alias 設定，所以要透過 [`Path Autocomplete`](https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete) 插件輔助套用此 path mapping 設定。
  - 同樣類型的自動補全路徑 vs code 插件有兩個，[`Path Intellisense`](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) 相較之下有顯著較多的下載人數，故選用該插件
  - 須自行至 `.vscode/settings.json` -> `"path-intellisense.mappings"` 調整相關映射路徑
  - 已將此插件加入 `.vscode/extensions.json` 的 recommendations 中，下載並透過 vs code 開啟此專案的使用者，都可透過在 vs code 搜尋 `@recommended` 一次下載所有推薦的插件

# <BR/>
# <BR/>
# <BR/>

# 依打包步驟理解
## HTML
- [x] 將打包後的 script, css 自動插入至 html 中
  - `html-webpack-plugin`
    - 該插件將為你生成一個 HTML5 文件， 在 body 中使用 script 標籤引入你所有 webpack 生成的 bundle
    - 安裝：
      - `$ npm i -D html-webpack-plugin`
    - 用法：
      ```js
      const HtmlWebpackPlugin = require('html-webpack-plugin');

      module.exports = {
        plugins: [new HtmlWebpackPlugin()]
      };
      ```
## CSS
- 統合性的配置可參考 `webpack.prod.config.js`
- [x] 0. 在 entry 的 js 檔引入 SCSS
  ```js
  // e.g.
  import './scss/main.scss'; 
  ```
- [x] 1. 將 scss 轉為 css
  - `sass-loader`
    - 安裝  
      - `$ npm i -D sass-loader`  
        `$ npm i -D sass`
          - `sass-loader` requires you to install either `Dart Sass`, `Node Sass` on your own(We highly recommend using `Dart Sass`(套件名稱為 sass)).
          - Chain the `sass-loader` with the `css-loader` and the `style-loader` to immediately apply all styles to the DOM, or the `mini-css-extract-plugin` to extract it into a separate file.
          - 參考文章
            - [webpack sass-loader 官方文檔](https://webpack.js.org/loaders/sass-loader/#getting-started)
    - `sass-loader` 會將 css 輸出為一行，因此可以視為壓縮，畢竟程式碼在運行的時候，格式並不需要是可閱讀的，可執行即可
      > For production mode, the `outputStyle` (old API) and `style` (new API) options default to `compressed` unless otherwise specified in sassOptions.
        - 也就是說，在 production mode 下，`sass-loader` 預設輸出被壓縮的格式
        - 測試後發現 sass loader 就會 compress 了：壓縮 css 為一行 + 移除所有註解(`/*!` 開頭的註解不會被移除)
    - 使用
      ```js
      module.exports = {
        module: {
          rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                {
                  loader: "sass-loader",
                  options: {
                    sassOptions: {},
                  },
                },
              ],
            },
          ],
        },
      };
      ```
- [x] 2. tree shaking
  - `purgecss-webpack-plugin`
    - 用途
      - Webpack plugin to remove unused css.
    - 安裝
      - `$ npm i -D purgecss-webpack-plugin`  
    - 引用
      ```js
      // 其他套件通常會這樣寫
      const PurgeCSSPlugin = require("purgecss-webpack-plugin");

      // 但 PurgeCSSPlugin 要這樣寫，須特別注意
      // `PurgeCSSPlugin` 為套件宣告好 export 出來的名稱，故不可重新命名
      const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
      ```
    - 在 html 中被註解掉的程式碼，仍然會被打包匯出；  
      例如：
      ```html
      <div class="card card-success">test card success</div>
      <!-- 控管 card-error 的樣式會被打包匯出 -->
      <!-- <div class="card card-error">test card error</div> -->
      ```
      ```html
      <div class="card card-success">test card success</div>
      <!-- 控管 card-error 的樣式不會被打包匯出 -->
      ```
  - `glob`
    - 用途
      - 匹配出我們想要的目錄下的一些文件
      - glob 用來匹配、查找並處理各種後綴的文件
    - 安裝
      - `$ npm i -D glob`
    - 名詞區辨： join, resolve
      - The two functions deal with segments starting with / in very different ways
      - `join` will just concatenate it with the previous argument
      - `resolve` will treat this as the root directory, and ignore all previous paths
    - 可透過這段程式碼概略理解 glob 這個套件的用途
      ```js
      const glob = require("glob");
      const res = glob.sync(`${path.resolve(__dirname, "assets")}/**/*`, {
        // 不需要列出資料夾名稱
        nodir: true,
      });
      console.log(res);
      /** 輸出
       * [
          'assets\\styles\\_variables.scss',
          'assets\\styles\\_normalize.scss',
          'assets\\styles\\main.scss',
          'assets\\styles\\header.scss',
          'assets\\styles\\card.scss',
          'assets\\scripts\\printB.js',
          'assets\\scripts\\printA.js',
          'assets\\scripts\\loadshTest.js',
          'assets\\scripts\\es6.js',
          'assets\\images\\webp1.webp',
          'assets\\images\\svg1.svg',
          'assets\\images\\png1.png',
          'assets\\images\\jpg1.jpg'
        ] 
       */
      ```
  - 統合使用上述工具
    ```js
    const path = require("path");
    const glob = require("glob");

    const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

    module.exports = {
      plugins: [
        new PurgeCSSPlugin({
          // 我要分析的是 src 底下的檔案有沒有用到相關的 css，而不是 assets 底下的檔案有沒有用到
          paths: glob.sync(`${path.resolve(__dirname, "src")}/**/*`, {
            // only want the files, not the dirs
            nodir: true,
          }),
        }),
      ],
    };
    ```
- [x] 3. 處理 css 兼容性
  - `postcss`
    - 用途
      - PostCSS is a tool for transforming styles with JS plugins.
        - lint your CSS
        - support variables and mixins
        - transpile future CSS syntax, inline images
        - and more
      - 雖然可以做的事情很多，但我目前主要拿 postcss 搭配 postcss-preset-env 來處理 css 兼容性
    - 安裝
      - `$ npm i -D postcss`  
  - `postcss-loader`
    - 用途
      - Loader to process CSS with PostCSS.
    - 安裝
      - `$ npm i -D postcss-loader`  
  - `postcss-preset-env`
    - 用途
      - PostCSS Preset Env is a PostCSS plugin.
      - PostCSS Preset Env lets you convert modern CSS into something most browsers can understand, determining the polyfills you need based on your targeted browsers or runtime environments.
      - 上面的簡單翻譯是，這個 plugin 會依據你的設定(例如 browserslist)將你的 css 轉換成該環境看得懂的語言，(感覺有點類似 babel 對 js 做的事情)
    - 安裝
      - `$ npm i -D postcss-preset-env`
  - 統合使用上述工具
    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        "postcss-preset-env",
                        {
                          // postcss-preset-env Options
                        },
                      ],
                    ],
                  },
                },
              },
            ],
          },
        ],
      },
    };
    ```
- [x] 4. 分析各個 css 文件之間的關係，把各個 css 文件合併成一段 css
  - `css-loader`
    - 用途
      - The css-loader interprets @import and url() like import/require() and will resolve them.
    - 安裝
      - `$ npm i -D css-loader`
    - 使用
      ```js
      module.exports = {
        module: {
          rules: [
            {
              test: /\.s[ac]ss$/i,
              use: ["css-loader"],
            },
          ],
        },
      };
      ```
- [x] 5. 將 css 插入至 html 中
  - 二擇一即可
    1. 將 css 單獨提取出來： `mini-css-extract-plugin`
    2. 將 css 放在 js 中： `style-loader`
       - style-loader 的作用是把 CSS 插入到 DOM 中，就是處理 css-loader 導出的模塊數組，然後將樣式透過 style 標籤或者其他形式插入到 DOM 中。
  - 使用
    ```js
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    module.exports = {
      plugins: [
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash:8].css",
          chunkFilename: "[id].[contenthash:8].css",
        }),
      ],
      module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              MiniCssExtractPlugin.loader, // 將 css 單獨提取出來(二擇一)
              // "style-loader", // 將 css 合併至 js 中(二擇一)
            ],
          },
        ],
      },
    };
    ```
## JS
- [x] 0. 在 entry 的 js 檔撰寫相關的程式碼
- [x] 1. tree shaking(TODO: 待測試)
  - production mode 下，設定 minimize 為 true，好像就可以做到 tree shaking 了(TODO: 待測試)
  - 限制：
    - If you're using `@babel/preset-env`, Babel may transform ES6 modules into more widely compatible CommonJS modules.  
      The solution is to configure `@babel/preset-env` to explicitly leave ES6 modules alone. 
      - 作法： 調整 babel 設定檔
        ```js
        // babel.config.js
        export default {
          presets: [
            [
              "@babel/preset-env", {
                // 加這個設定
                modules: false
              }
            ]
          ]
        }
        ```
    - An example of a side effect is when a function modifies something outside of its own scope, which is a side effect of its execution
  - 參考文章
    - [webpack 官方文件 - tree-shaking](https://webpack.js.org/guides/tree-shaking/)
    - [web.dev - Reduce JavaScript payloads with tree shaking](https://web.dev/reduce-javascript-payloads-with-tree-shaking/)
    - [原來程式碼打包也有這麼多眉角 - 淺談 Tree Shaking 機制](https://medium.com/starbugs/%E5%8E%9F%E4%BE%86%E7%A8%8B%E5%BC%8F%E7%A2%BC%E6%89%93%E5%8C%85%E4%B9%9F%E6%9C%89%E9%80%99%E9%BA%BC%E5%A4%9A%E7%9C%89%E8%A7%92-%E6%B7%BA%E8%AB%87-tree-shaking-%E6%A9%9F%E5%88%B6-8375d35d87b2)
    - [从 Tree Shaking 来走进 Babel 插件开发者的世界](https://juejin.cn/post/7028584587227824158)
    - [前端科普系列 - CommonJS：不是前端却革命了前端](https://zhuanlan.zhihu.com/p/113009496)
- [x] 2. 處理 js 兼容性
  - 主要透過 babel 處理
  - 配置方式 -> 詳見本專案中的 `.babelrc`
  - 須安裝的套件
    - `$ npm i -D @babel/core`
      - All transformations will use your local configuration files.
      - Babel 進行轉碼的核心包
    - `$ npm i -D @babel/preset-env`
      - babel 預設值
        - 預設就是一組插件，你只要安裝這個預設插件，就能享受到這個預設插件裡面所有的插件
        - 具體引入哪些 dependencies，可查看 `node_modules/@babel/preset-env/package.json`
      - - 如果你沒有在 Babel 配置文件中(如 babel.config.json)設置 targets 或 ignoreBrowserslistConfig，`@babel/preset-env` 會使用 browserslist
      - @babel/preset-env is a smart preset(預設) that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!
      - 由於我們只安裝了轉換箭頭函數的插件，所以它只轉換了箭頭函數，對於解構這個新特性並沒有進行編譯。  
        天啊，ES 的新語法這麼多，不會要我們一個一個去安裝插件吧，那何時才能配置完呀？  
        其實 babel 早就為我們考慮到了，preset 能完美解決這個問題。
      - 目前官方 Preset 有如下幾個 ([官方資料](https://babeljs.io/docs/presets))：
        1. `@babel/preset-env` for compiling ES2015+ syntax
        2. `@babel/preset-typescript` for TypeScript
        3. `@babel/preset-react` for React
        4. `@babel/preset-flow` for Flow
    - `$ npm i -D babel-loader`
      - This package allows transpiling JavaScript files using Babel and webpack.  
    - `$ npm i -D @babel/plugin-transform-runtime`
      - A plugin that enables the re-use of Babel's injected helper code to save on codesize.
      - 為什麼要使用此插件？
        - [babel 官方文件](https://babeljs.io/docs/babel-plugin-transform-runtime#why)
        - [babel 官方文件 - 中文翻譯版](https://babel.docschina.org/docs/en/6.26.3/babel-plugin-transform-runtime/#%E4%B8%BA%E4%BB%80%E4%B9%88)
      - Babel uses very small helpers for common functions such as `_extend`. By default this will be added to every file that requires it. This duplication is sometimes unnecessary, especially when your application is spread out over multiple files.
        - 上面那段的概略翻譯是，你每次引入一個 polyfill，babel 都會幫你在那個檔案添加相關的 helper，如果有很多檔案都用到相同的 polyfill，那你打包出來的檔案就會有一堆相同的 code 而形成冗餘
    - `$ npm i @babel/runtime` (不加 "-D")
      - @babel/runtime is a library that contains Babel modular runtime helpers.
    - 依據配置 corejs 的地方，下方兩個套件二擇一安裝即可(皆不加 "-D")
      - 使用 `core-js@3` 來 polyfill，會全局引入缺少的 API。  
        有時候開發工具庫，會避免污染全局變量，這時候可以改用 `@babel/runtime-corejs3` 來 polyfill
      1. `$ npm i core-js@3`
         - Modular standard library for JavaScript. Includes polyfills for ECMAScript up to 2023.
      2. `$ npm i @babel/runtime-corejs3`
         - babel's modular runtime helpers with core-js@3 polyfilling
  - 按需引入 polyfill
    - 為何要按須引入 polyfill？
      - 因為專案中不一定會用到所有新 api 的 polyfill；  
        如果將用不到的 polyfill 也打包進來，會造成冗餘
    - `@babel/preset-env` 的設定值 `useBuiltIns` 在 v7 時被移除了；  
      實測之後發現**目前是按需引入("usage")，所以不需要再額外宣告**  
      舊版的參數，可選用 false(預設) | "usage" | "entry"  
      目前 [官方文件](https://babeljs.io/docs/babel-plugin-transform-runtime#installation) 中也強烈禁止設定 useBuiltIns (使用 danger 標示)
      > When this plugin(@babel/plugin-transform-runtime) is enabled, the `useBuiltIns` option in `@babel/preset-env` must not(強烈禁止) be set. Otherwise, this plugin may not able to completely sandbox the environment.
  - 參考文章
    - [@babel/core 官方文件](https://babeljs.io/docs/babel-core)
    - [@babel/preset-env 官方文件](https://babeljs.io/docs/babel-preset-env)
    - [@babel/runtime 官方文件](https://babeljs.io/docs/babel-runtime)
    - [@babel/plugin-transform-runtime](https://babeljs.io/docs/babel-plugin-transform-runtime)
    - [webpack 官方文件](https://webpack.js.org/loaders/babel-loader/#babel-is-injecting-helpers-into-each-file-and-bloating-my-code)
    - [webpack入门之js处理(babel、babel polyfill)](https://juejin.cn/post/7126465727178997791)
    - [@babel/preset-env - 姜瑞涛的官方网站](https://www.jiangruitao.com/babel/babel-preset-env/)
    - [一文搞懂 core-js@3、@babel/polyfill、@babel/runtime、@babel/runtime-corejs3 的作用与区别](https://juejin.cn/post/7062621128229355528)
- 其他： 
  - [x] 在 production 環境下，移除所有的 console, debugger
    - `terser-webpack-plugin`
      - webpack v5 自帶 `terser-webpack-plugin`，但如果想自定義一些更細節的設定，仍然需要安裝
      - 安裝：
        - `$ npm i -D terser-webpack-plugin`
      - 使用
        ```js
        const TerserPlugin = require('terser-webpack-plugin');

        module.exports = {
          optimization: {
            // 如果 mode 為 production，則 minimize 預設為 true
            // minimize: false,
            minimizer: [
              new TerserPlugin({
                terserOptions: {
                  compress: {
                    warnings: true,
                    drop_console: true,
                    drop_debugger: true,
                    pure_funcs: ['console.log', "console.table"]
                  }
                }
              }),
            ],
          },
        };
        ```

# <BR/>
# <BR/>
# <BR/>

# minimize 壓縮程式碼
- [x] html
  - terser(webpack 5 內建) 在 production 環境下會自動壓縮
- [x] CSS
  - `sass-loader` 預設在 production 環境下會自動壓縮為一行
- [x] js
  - terser(webpack 5 內建) 在 production 環境下會自動壓縮
  - 如果想看不壓縮的程式碼： `config.optimization.minimize = false`

# <BR/>
# <BR/>
# <BR/>

# 分割(拆分)程式碼
## 設定
- `optimization.splitChunks` 預設值
  - 來源：[webpack 官方文件](https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks)
    ```js
    module.exports = {
      optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 20000,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
    };
    ```
- `optimization.splitChunks` 預設就會將 node_modules 快取起來，所以也不一定需要特別再針對 node_modules 設定 cacheGroups
- `optimization.splitChunks.chunks` 設定為 "all"
  - 在大部分的專案中設定 chunks: "all" 由 webpack 自動切割代碼，已經可以達到不錯的水準了
## 快取
- 最佳實踐：
  - 目前看起來應該是 css 檔使用 `contenthash`，  
    其餘的使用 `chunkhash`
  - 通常 hash 使用 8 位即足以區辨了，  
    要取前 8 位的話可以這樣寫： `hash:8` (另外兩種 hash 方式亦然)
- 檔名選項(僅列出目前未被棄用(deprecated)的選項)
  - Substitutions available on **Compilation-level**:
    - | Template | Description |
      | :---- | :---- |
      | `[fullhash]` | The full hash of compilation |
  - Substitutions available on **Chunk-level**:
    - | Template | Description |
      | :---- | :---- |
      | `[id]` | The ID of the chunk |
      | `[name]` | The name of the chunk(if set), otherwise the ID of the chunk |
      | `[chunkhash]` | The hash of the chunk, including all elements of the chunk |
      | `[contenthash]` | The hash of the chunk, including only elements of this content type (affected by `optimization.realContentHash`) |
    - `optimization.realContentHash`
      - [官方文檔](https://webpack.js.org/configuration/optimization/#optimizationrealcontenthash)
  - Substitutions available on **Module-level**:
    - | Template | Description |
      | :---- | :---- |
      | `[id]` | The ID of the module |
      | `[hash]` | The name of the chunk, if set, otherwise the ID of the chunk |
      | `[contenthash]` | The hash of the content of the module |
  - Substitutions available on **File-level**:
    - 太多了，有需要再自行參考官方文檔
- 名詞區辨： id, name
  1. id
  2. name
  - 參考文章
    - [webpack 舊版文檔](https://github.com/webpack/docs/wiki/configuration#outputchunkfilename)
- 名詞區辨： hash, chunkhash, contenthash
  1. hash
  2. chunkhash
  3. contenthash
- TODO: id, name, hash, chunkhash, contenthash 這幾個應該可以合併
- 名詞區辨： filename, chunkFilename
  1. filename:  
    指列在 entry 中，打包後輸出的文件的名稱
  2. chunkFilename:  
    chunkFilename 指未被列在 entry 中，卻又需要被打包出來的 chunk 文件的名稱；  
    一般來說，這個 chunk 文件指的就是要懶加載的代碼
  - 參考文章
    - [webpack 中，filename 和 chunkFilename 的区别是什么？](https://www.cnblogs.com/skychx/p/webpack-filename-chunkFilename.html)
- 檔案命名設定：
  - 通常好像可以這樣設定
    - filename 配 name  
      chunkFilename 配 id
      - 因為 chunkFilename 是另外 load 的，所以選用 name 沒甚麼意義
    - css 配 contenthash  
      js 配 chunkhash
    - 合併設定如下：
      - css
        - filename: "[name].[contenthash:8].css"
        - chunkFilename: "[id].[contenthash:8].css"
      - js
        - filename: "[name].[chunkhash:8].js"
        - chunkFilename: "[id].[chunkhash:8].js"
    - lazy load 打包後的檔名：
      - [name].[chunkhash:8].js: vendors.e0571119.js
      - [id].[chunkhash:8].js: 216.e0571119.js
## 參考文章
- [三石的webpack.config.js（optimization篇）](https://juejin.cn/post/7076743589505531917)
- [關於splitChunks的一次原理探索](https://blog.csdn.net/web2022050901/article/details/128870445)
- [webpack SplitChunksPlugin 官方文件](https://webpack.js.org/plugins/split-chunks-plugin/)
  - [預設值](https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks)
- [webpack4 之 cacheGroups 分包【究极奥义】](https://juejin.cn/post/6919684767575179278)
  > Q:   
    分包不能太細，0KB 至 10KB 的包是極小的包，應當考慮合併。  
    請問不合並會帶來什麼問題呢？  
    A:   
    不合並導致併發請求過多，瀏覽器有併發請求數量限制，跟以前用雪碧圖一個道理
- [代码干燥计划 SplitChunksPlugin](https://drylint.com/Webpack/SplitChunksPlugin.html)

# <BR/>
# <BR/>
# <BR/>

# 載入圖片
## 待測試
- [x] 引入圖檔
- [ ] 測試壓縮功能
    - 小於 10 kb
    - 幾百 kb
    - 大於 3 mb
  - [ ] jpg-l
  - [ ] jpg-m
  - [ ] jpg-s
  - [ ] png-l
  - [ ] png-m
  - [ ] png-s
  - [ ] webp-l
  - [ ] webp-m
  - [ ] webp-s
  - [ ] svg-l
  - [ ] svg-m
  - [ ] svg-s
- [ ] 引入字型
  - google font
## Webpack 5 Asset Modules
- Asset Modules 取代了 raw-loader, url-loader 及 file-loader 的功能
- 用法：
  ```js
  module.exports = {
    module: {
      rules: [
        // 圖檔
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          type: "asset",
          generator: {
            filename: "img/[name][ext]",
          },
        },
      ],
    },
  };
  ```
- 參考文章
  - [Webpack 官方文件 - Asset Modules](https://webpack.js.org/guides/asset-modules/)
  - [Webpack 5 Asset Modules](https://yfxie.com/webpack-5-asset-modules/)

# <BR/>
# <BR/>
# <BR/>

# 壓縮圖片
- 主要套件
  - `image-webpack-loader`
    - 安裝
      - `$ npm i -D image-webpack-loader`
    - 如果要無損壓縮圖片 + 選用 `imagemin` 方案的話，可搭配下方套件：
      - `$ npm i -D imagemin`(主要套件)  
        `$ npm i -D imagemin-jpegtran`(壓縮 jpeg)  
        `$ npm i -D imagemin-optipng`(壓縮 png)  
        `$ npm i -D imagemin-svgo`(壓縮 svg)  
        `$ npm i -D imagemin-gifsicle`(壓縮 gif)  
    - This plugin(image-minimizer-webpack-plugin) can use 4 tools to optimize/generate images:  
      搭配的套件，四擇一  
      By default we don't install anything
      1. `imagemin` - optimize your images by default, since it is stable and works with all types of images
         - 幾乎所有圖片類型都支援
      2. `squoosh` - while working in experimental mode with .jpg, .jpeg, .png, .webp, .avif file types.
         - 來自 Google 
      3. `sharp` - high performance Node.js image processing, the fastest module to resize and compress JPEG, PNG, WebP, AVIF and TIFF images. Uses the libvips library.
      4. `svgo` - tool for optimizing SVG vector graphics files. Supports only SVG files minification.
         - 只支援 svg
      - 搭配的套件，四擇一
        - 概略看下來，1、2 任選一個都可以
        1. ImageMinimizerPlugin.imageminMinify
        2. ImageMinimizerPlugin.squooshMinify
        3. ImageMinimizerPlugin.sharpMinify
        4. ImageMinimizerPlugin.svgoMinify
    - 用法：
      ```js
      const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

      module.exports = {
        minimizer: [
          new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.imageminMinify,
              options: {
                plugins: [
                  ["gifsicle", { interlaced: true }],
                  ["jpegtran", { progressive: true }],
                  ["optipng", { optimizationLevel: 5 }],
                  [
                    "svgo",
                    {
                      plugins: [
                        {
                          name: "preset-default",
                          params: {
                            overrides: {
                              removeViewBox: false,
                              addAttributesToSVGElement: {
                                params: {
                                  attributes: [
                                    { xmlns: "http://www.w3.org/2000/svg" },
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
      };
      ```
- 參考文章
  - [webpack 官方文件 - ImageMinimizerWebpackPlugin](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/)

# <BR/>
# <BR/>
# <BR/>

# 引入字型(TODO: 待測試)

# <BR/>
# <BR/>
# <BR/>

# Source Map
- [webpack 官方文件 - devtool](https://webpack.js.org/configuration/devtool/)
  - 控制是否產出 source map
  > Instead of using the `devtool` option, you can also use `SourceMapDevToolPlugin`/`EvalSourceMapDevToolPlugin` directly as it has more options.  
    **Never use both the `devtool` option and plugin together.** The devtool option adds the plugin internally so you would end up with the plugin applied twice.
  - 實測後，webpack 官方推薦的四個 for develop builds 的選項：
    - 會顯示 scss 行數
      - `eval-source-map` (目前 develop 環境我選用這個)
        - Recommended choice for development builds with high quality SourceMaps.
        - build: slowest  
          rebuild: ok
      - `eval-cheap-module-source-map`
        - Tradeoff choice for development builds.
        - build: slow  
          rebuild: fast
    - 不會顯示 scss 行數(但會顯示 js 的行數)
      - `eval`
        - Recommended choice for development builds with maximum performance.
      - `eval-cheap-source-map`
        - Tradeoff choice for development builds.
- 參考文章
  - [webpack 官方範例 - source-map](https://github.com/webpack/webpack/tree/main/examples/source-map)
  - [一文搞懂 SourceMap 以及 webpack devtool](https://juejin.cn/post/6960941899616092167)
## 不同環境的 webpack 設定檔
- `webpack-merge`
  - 目的
    - 合併不同環境的 webpack 設定檔
  - 安裝
    - `$ npm i -D webpack-merge`
  - 用法
    - 可參考本專案中的
      - `webpack.common.js`
      - `webpack.dev.js`
      - `webpack.prod.js`
  - 原本是想透過 `webpack-merge` 分別管理 webpack.common.js, webpack.dev.js, webpack.prod.js，但由於透過此套件產出的 webpack config 檔好像會造成 webpack-dev-server 無法 hot reload，造成開發體驗不佳，故仍選擇將開發環境、正式發布環境的設定檔案由兩支檔案分別控管，而不透過此套件管理共用部分。
    - 後續好像就又可以透過 webpack-merge 分開管理不同環境的設定檔了，但還是留著這個解法，以防後續仍有需要用到
- 雖然 webpack 官方鼓勵在 production 環境下產出 map 檔以利除錯，但如果想要避免商業邏輯洩漏的話，我認為不要產出 map 檔較合適  
  (毋須另外設定，在 production 環境下，預設不會產出 map 檔)  
  - [webpack 官方文件](https://webpack.js.org/guides/production/#source-mapping)
    > We encourage you to have source maps enabled in production, as they are useful for debugging as well as running benchmark tests.
- 參考文章
  - [webpack 官方文件 - production](https://webpack.js.org/guides/production/#setup)
    > we typically recommend writing **separate webpack configurations** for each environment.  
    While we will separate the production and development specific bits out, note that we'll still maintain a "common" configuration to keep things DRY. In order to merge these configurations together, we'll use a utility called `webpack-merge`. With the "common" configuration in place, we won't have to duplicate code within the environment-specific configurations.  
    Avoid `inline-***` and `eval-***` use in production as they can increase bundle size and reduce the overall performance.

# <BR/>
# <BR/>
# <BR/>

# 即時顯示編譯結果
## hot reload
## Hot Module Replacement(HMR)
- [webpack - Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/)
- `webpack-dev-server`
  - 須搭配 `raw-loader`
    - 安裝
      - `$ npm i -D raw-loader`
    - 由於 html 與 entry 文件不存在依賴關係，所以無法實現熱更新
    - 在 entry 文件中引入 html 文件是為了讓 html 與 entry 文件產生依賴，這樣在 webpack 運行時可以打包處理html 文件
    - 參考文章
      - [番外篇 - 讓你的 HTML 可以 hot reload](https://neighborhood999.github.io/webpack-tutorial-gitbook/Part1/HotReload.html)
      - [利用 webpack 实现对 html 文件的热更新](https://github.com/xm2by/html-hot-reload/blob/master/README.md)
  - 安裝
    - `$ npm i -D webpack-dev-server`
  - 使用
    - ```js
      // package.json
      {
        "scripts": {
          "build-D": "webpack-dev-server --config webpack.dev.config.js",
        }
      }
      ```
    - ```js
      // webpack.dev.config.js
      const path = require("path");

      module.exports = {
        devtool: "eval-source-map",
        devServer: {
          hot: true,
          // server run 起來後自動在瀏覽器開啟
          open: true,
          port: 9000,
          // 監聽到文件變化時，dev-server 將重新加載或刷新整個頁面；`devServer.hot` 配置項必須禁用或者`devServer.watchFiles` 配置項必須啟用
          liveReload: false,
        },
        mode: "development",
        module: {
          rules: [
            // html
            {
              test: /\.html$/,
              loader: "raw-loader",
            },
          ],
        },
      };
      ```
  - 參考文章
    - [代码干燥计划 - webpack-dev-server](https://drylint.com/Webpack/webpack-dev-server.html)
      > webpack-dev-server 是編譯在內存中，不實際編譯到硬盤上的 dist 目錄，所以速度非常快
    - [React Day11 - Webpack(4) Hot Module Replacement (HMR)](https://ithelp.ithome.com.tw/articles/10185627)
      > 它不是實際 build 出來檔案，它會把 bundle 的結果先存在記憶體
- 卡在無法透過 `webpack-dev-server` 達成 hot reload 的問題很久，後來在 [這篇文章](https://juejin.cn/post/6969756995364585503) 發現破口，就是 `webpack-merge` 的功能在某些條件下可能會無效，因此選擇嘗試直接將 dev 的 webpack 設定檔單獨寫，然後就可以成功達成 hot reload 了
  - 後來又重新測試將 webpack 設定檔拆開管理(common, dev, prod)，就又可以成功跑起來了；總之，把這個可能的解法記錄起來
  - 參考文章
    - [解决 webpack-dev-server 热更新异常情况](https://juejin.cn/post/6969756995364585503)
      - dev 模式下，不能用 `webpack-merge`
        - 要單獨寫 webpack 設定檔
      - dev 模式下，不能用 `MiniCssExtractPlugin.loader`
        - 將 css 合併進 html 時要選用 `style-loader`

# <BR/>
# <BR/>
# <BR/>

# 未分類參考文章
- [前端也需要編譯？Transpile、Compile、Minify、Uglify 基本介紹](https://ithelp.ithome.com.tw/articles/10191992)
  > minify 通常只會把它轉成越短越好  
    而 uglify(混淆器)，通常還會把其他邏輯打散
- [css-loader 与 style-loader 的区别](https://segmentfault.com/a/1190000040918194)