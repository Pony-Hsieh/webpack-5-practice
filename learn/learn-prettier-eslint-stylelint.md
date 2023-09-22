# 排版程式碼 + 修正程式碼語法錯誤

## prettier
- Prettier is an opinionated(固執己見的、武斷的、剛愎自用的) code formatter
- 目的
  - 排版程式碼
- 安裝
  - `$ npm i -D prettier`
- 用法
  - 在根目錄新增 prettier 設定檔(例如 `.prettierrc.js`)
    ```js
    // 範例
    module.exports = {
      tabWidth: 2,
      useTabs: false,
      singleQuote: true,
      semi: true,
      overrides: [
        {
          files: ['**/*.css', '**/*.scss', '**/*.html'],
          options: {
            singleQuote: false,
          },
        },
      ],
    };
    ```
  1. 搭配 vs code 插件
     - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
       - 可在 `.vscode/.settings.json` 中撰寫：
          ```json
          {
            // 預設透過 prettier 排版
            "editor.defaultFormatter": "esbenp.prettier-vscode",
            // 存檔時自動排版
            "editor.formatOnSave": true,
          }
          ```
  2. 透過 scripts
     1. 在 package.json 的 scripts 中撰寫
        ```json
        "scripts": {
          "format": "prettier --write <filename>"
        },
        ```
     2. `$ npm run format`
  3. 透過 command line
     - `$ npx prettier --write <filename>`
- prettier 有多個指令，其中常用的指令有 `--write` 與 `--check`
  - `--write`
    - To format a file in-place, use `--write`  
      (Note: This overwrites your files!)
    - 通常會在開發時與要 commit 前使用
  - `--check` 
    - When you want to check if your files are formatted, you can run Prettier with the `--check` flag (or `-c`).  
      This will output a human-friendly message and a list of unformatted files, if any.
    - 通常是在 CI 檢查程式碼時使用
- 不需要被 prettier 格式化的檔案可透過 `.prettierignore` 統一管理
  - 參考文章
    - [prettier 官方文件 - ignore](https://prettier.io/docs/en/ignore.html)
    - [freeCodeCamp - .gitignore 文件——如何在 Git 中忽略文件和文件夹](https://www.freecodecamp.org/chinese/news/gitignore-file-how-to-ignore-files-and-folders-in-git/)
- 參考文章
  - [23 - Prettier - 格式化程式碼工具](https://ithelp.ithome.com.tw/articles/10279606)

## eslint
- 用途
  - Find and fix problems in your JavaScript code.  
    ESLint statically analyzes your code to quickly find problems.
- 安裝
  - `$ npm i -D eslint`
- 使用
  1. 創建 eslint 初始配置檔
     - 用法
       - `$ npm init @eslint/config`
     - Which style guide do you want to follow?  
      選擇 Airbnb 後，系統會檢查 `eslint-config-airbnb-base@latest` 的 peerDependencies，並詢問你是否要現在安裝
        ```
        √ Which style guide do you want to follow? · airbnb

        √ What format do you want your config file to be in? · JavaScript

        Checking peerDependencies of eslint-config-airbnb-base@latest

        The config that you've selected requires the following dependencies:

        eslint-config-airbnb-base@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.2

        ? Would you like to install them now? » No / Yes
        ```
        下列套件為 Airbnb 的 peerDependencies
        1. `eslint@^7.32.0 || ^8.2.0`
        2. `eslint-plugin-import@^2.25.2`
           - This plugin intends to support linting of ES2015+ (ES6+) `import/export` syntax, and prevent issues with misspelling(拼寫錯誤) of file paths and import names. All the goodness that the ES2015+ static module syntax intends to provide, marked up in your editor.
     - 所以安裝 airbnb 規則包的時候，總共會安裝三個：
       1. `eslint-config-airbnb-base@latest`
       2. `eslint@^7.32.0 || ^8.2.0`
       3. `eslint-plugin-import@^2.25.2`
     - 初始配置檔如下(選擇 airbnb 規則包)：
        ```js
        module.exports = {
          env: {
            browser: true,
            // What type of modules does your project use? CommonJS (require/exports)
            // commonjs: true,
            es2021: true,
          },
          extends: 'airbnb-base',
          overrides: [
            {
              env: {
                node: true,
              },
              files: [
                '.eslintrc.{js,cjs}',
              ],
              parserOptions: {
                sourceType: 'script',
              },
            },
          ],
          parserOptions: {
            ecmaVersion: 'latest',
            // What type of modules does your project use? JavaScript modules (import/export)
            // sourceType: 'module',
          },
          rules: {
          },
        };
        ```
  2. 避免 eslint, prettier 衝突
     - 安裝
       - `$ npm i -D eslint-config-prettier`
     - 使用
       - 套用到 eslint 設定檔 `extends` 中的最後一個元素(一定要放最後一個)  
        Make sure to put it `last`, so it gets the chance to override other configs.
          ```js
            {
              "extends": [
                "some-other-config-you-use",
                "prettier"
              ]
            }
          ```
- 警示層級對照
  - 關閉規則： "off" || 0
  - 開啟警告規則： "warn" || 1
  - 開啟錯誤規則： "error" || 2
- 透過 vs code 開發時，在儲存檔案時自動修正 eslint 語法錯誤
  1. 安裝 [eslint vs code 套件](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
     - `eslint.validate` - an array of language identifiers specifying the files for which validation is to be enforced. This is an old legacy setting and should in normal cases not be necessary anymore. Defaults to `["javascript", "javascriptreact"]`.
       - 所以目前不需要在設定值中撰寫 `"eslint.validate": ["javascript"]` 了
  2. 撰寫 vs code 設定檔
      ```json
      // settings.json
      {
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true
        },
      }
      ```
- 參考文章
  - [eslint-config-prettier - Installation](https://github.com/prettier/eslint-config-prettier/#installation)
  - [ESLint vs code 插件 settings options](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint#settings-options)
  - [ESLint的用途](https://www.jianshu.com/p/5f7d4520fb2a)
  - [設定 Angular 專案使用 ESLint 進行更嚴格的程式碼撰寫風格檢查](https://blog.miniasp.com/post/2021/08/29/Angular-ESLint-with-so-much-details)
  - [【Eslint】vscode 設定eslint 教程](https://blog.csdn.net/qq_45677671/article/details/130808735)
    - npm init @eslint/config 會問你的問題可以在這邊看

## stylelint
- 用途
  - A mighty(強大的) CSS linter that helps you avoid errors and enforce(強制實施) conventions(慣例).
- 安裝
  - 主要套件
    - `$ npm i -D stylelint`
  - config
    - SCSS config
      - 下列選項擇一即可，我目前是選用 recommended，因為下載數量比較高
      - `$ npm i -D stylelint-config-recommended-scss`  
        Weekly Downloads: 766,338
      - `$ npm i -D stylelint-config-standard-scss`  
        Weekly Downloads: 511,089
    - 設定 css properties 的順序  
      [官方](https://github.com/hudochenkov/stylelint-order#example-configs) 提過的幾個 Example configs，其中下載數量最多的是 `stylelint-config-recess-order`
      - **stylelint-config-recess-order**
        - `$ npm i -D stylelint-config-recess-order`  
        - Sorts CSS properties the way Recess did and Bootstrap does.
        - 162272, Published 2 months ago
      - stylelint-config-idiomatic-order
        - 94823, Published a year ago
      - stylelint-config-hudochenkov/order
        - 17848, Published 7 months ago
      - stylelint-config-property-sort-order-smacss
        - 40664, Published 7 months ago
      - stylelint-config-clean-order
        - 18027, Published a month ago
    - 基於 prettier 代碼風格的 stylelint 規則
      - `$ npm i -D stylelint-prettier`
        - Runs Prettier as a Stylelint rule and reports differences as individual Stylelint issues.
    - 禁用會與 Prettier 產生衝突的設定
      - `$ npm i -D stylelint-config-prettier-scss`
        - 必須要放在 extends 的最後一個位置
        - Turns off conflicting rules when using Prettier for SCSS.
        - 禁用所有與格式相關的 stylelint 規則，解決 prettier 與 stylelint 規則衝突，**確保將其放在 extends 陣列的最後一個位置**，這樣它將覆蓋其他配置。
- 使用
  1. 在根目錄創建 stylelint 初始設定檔(例如： `stylelintrc.js`)
      ```js
      // 範例
      module.exports = {
        // 將預設的警示由 錯誤 改為 警告
        defaultSeverity: 'warning',
        extends: [
          // Recommended config for SCSS
          'stylelint-config-recommended-scss',
          // Sorts CSS properties the way Recess did and Bootstrap does
          'stylelint-config-recess-order',
          // Runs Prettier as a Stylelint rule
          'stylelint-prettier/recommended',
          // Turns off conflicting rules when using Prettier for SCSS
          'stylelint-config-prettier-scss',
        ],
      };
      ```
  2. 執行指令
     1. 在 command line 執行  
      `$ npx stylelint <filename> --fix`
     2. 透過 package.json 設定 scripts  
      `stylelint <filename> --fix`
  3. 要忽略的檔案可透過 `.stylelintignore` 統一管理
- 搭配 vs code 插件使用
  1. 安裝 [stylelint vs code 套件](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)  
     - 但這個插件好像沒有辦法在存檔時候自動排序，算是比較可惜的地方
  2. 撰寫 vs code 設定檔
      ```json
      {
        // 存檔時自動排版
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
          "source.fixAll.stylelint": true
        },
        "stylelint.validate": ["css", "scss"]
      }
      ```
- 關於如何排序 css properties order，stylelint [官方](https://stylelint.io/user-guide/customize/#custom-rules)給出兩種解法：
  1. 使用 extends(例如： stylelint-config-recess-order)，套用社區內已經弄好的一整套規則
  2. 使用 plugins(例如： stylelint-order)，自行排序樣式表中的規則，或者是依照特定規則排序(例如 alphabetical-order)
- 參考文章
  - [awesome-stylelint](https://github.com/stylelint/awesome-stylelint/#readme)
    - You'll find more shared configs and plugins of custom rules listed in Awesome Stylelint.
  - [stylelint-prettier README](https://github.com/prettier/stylelint-prettier#readme)
  - [项目中 Prettier + Stylelint + ESlint 配置](https://juejin.cn/post/6878121082188988430)

## eslint 報錯
- `Unexpected use of file extension "js" for "./webpack.common.js"`
  - 參考文章
    - [15.Eslint检测错误提示及处理](https://www.jianshu.com/p/3bab4b567bdf#:~:text=5.Unexpected%20use%20of%20file%20extension%20%22vue%22%20for%20%22./xxx/****.vue%22)
      - 解法 1 (這個比較簡單)
        - 去除檔案的副檔名
    - [Unexpected use of file extention “js“ for “@/render/core/scale/index.js“](https://blog.csdn.net/Lamour99/article/details/119376012)
      - 解法 2
- `Unexpected unnamed function.`
- `Prefer default export on a file with single export.`
  - 解法
    - `'import/prefer-default-export': 'off',`
- `Unexpected function expression.` (prefer-arrow-callback)
  - 解法
    - 將 function 改為 arrow function

## 參考文章
- [變成 rule 的形狀(3) - Prettier + ESLint](https://tempura-good-good.coderbridge.io/2022/06/11/prettier-+-eslint/)
  > linter 擅長改善語法、抓出潛在的語法錯誤。例如，它會叫你用 let/const 取代 var、=== 取代 ==  

  > formatter 擅長修改 coding style，根據 rules 把 code 變成它的形狀。例如，它不在乎你用 var 還是 let/const，但會禁止你使用 ""(semi: true)
- [使用 ESLint + Prettier 來統一前端代碼風格](https://segmentfault.com/a/1190000015315545)
- [package.json 的 scripts 同时运行多个命令](https://juejin.cn/post/7135096918857744397)
  > `&`: 指令並行順序執行(同時運行)  
  > `&&`: 指令串列順序執行(相繼運行)；只有當前一個指令執行成功，才會繼續執行後面的指令