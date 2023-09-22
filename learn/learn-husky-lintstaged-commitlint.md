# Husky, lintstaged, commitlint
- pre-commit 工具
## husky
- 用途
  - 方便配置、運行、**共享** git hook 腳本
  - 由於 Git Hooks 腳本預設存放在無法被 git add 的 .git 目錄下，因此如果要能使它被 push 到遠端的 Git 倉庫上，就需要換個位置放，而不能放在 .git/hooks
    - [如何在執行 git commit 前自動進行檢查？ Git Hooks 的基本用法](https://magiclen.org/git-hooks/)
- 安裝、使用
  1. Install husky
     - `$ npm i -D husky`
  2. Enable Git hooks
     - `$ npx husky install`
     - 專案最初設定一次即可，會在根目錄產生一個 `.husky` 資料夾，存放 husky 的相關腳本  
      之所以在專案最初設定一次即可的原因見 3
  3. To automatically have Git hooks enabled after install, edit `package.json`
     - `$ npm pkg set scripts.prepare="husky install"`
       - 在 package.json 檔案中的 script 新增一條 prepare 的指令，這樣每次 npm install(不帶參數) 的時候就會執行 `husky install` 的指令
         - [npm 官方文件 - npm install 時會做的事情](https://docs.npmjs.com/cli/v10/using-npm/scripts#npm-install)
- 透過 husky 新增一個 git hook 腳本
  1. `$ npx husky add .husky/pre-commit "npm test"`
     - 會在 `.husky` 資料夾底下新增一個 `pre-commit` 的檔案，並在該檔案中寫入以下內容：  
       ```shell
       #!/usr/bin/env sh
       . "$(dirname -- "$0")/_/husky.sh"

       npm run test
       ```
  2. 這樣每次在 git commit 之前都會觸發此 git hook
- 參考文章
  - [husky 官方文件 - Getting started](https://typicode.github.io/husky/getting-started.html)
## lint-staged
- 用途
  - Run linters against staged git files
  - 讓 linter 只檢查被 git 暫存(被 git add) 的檔案
  - 實際上 lint-staged 也可以搭配 prettier 使用，在 lint 程式碼的同時一併 format
- 安裝
  1. Install lint-staged itself:
     - `$ npm i -D lint-staged`
- 使用
  1. 在根目錄底下新增 `.lintstagedrc.js`，並寫入想執行的行為  
    ex:  
      ```js
      module.exports = {
        // '*.{ts,js,vue}': ['eslint --fix'],
        // '*.{html,scss,css,vue}': ['prettier --write', 'stylelint --fix'],
        '*.scss': ['stylelint --fix', 'prettier --write'],
        '*.js': ['eslint --fix', 'prettier --write'],
      };
      ```
     - 有些文章會寫 'git add' 這個指令，但實測後發現好像不需要這條指令
  2. 搭配 husky，在 pre-commit 這個 git hook 時執行相關的行為
     - 在 `.husky/pre-commit` 檔案中撰寫以下內容：
        ```shell
        #!/usr/bin/env sh
        . "$(dirname -- "$0")/_/husky.sh"

        echo "--- start pre-commit git hook ---"
        # -v: show task output even when tasks succeed; by default only failed output is shown
        npx lint-staged -v
        echo "--- end pre-commit git hook ---"
        ```
- 參考文章
  - [lint-staged 官方文件](https://github.com/okonet/lint-staged#readme)
## commitlint
- `commitlint` is alias of `@commitlint/cli`
- 用途
  - Lint your commit messages
- 安裝
  1. `$ npm i -D @commitlint/cli`  
    `$ npm i -D @commitlint/config-conventional`
     - 依據 conventional commit 建立的 commit 規範  
      可以理解為 commitlint 的預設規則包
- 使用
  1. 在根目錄底下新增 `commitlint.config.js`
      ```js
      module.exports = {
        // 引入預設規則包： '@commitlint/config-conventional'
        extends: ['@commitlint/config-conventional'],
      };
      ```
  2. 搭配 husky，在 commit-msg 這個 git hook 時執行相關的行為
     - 在 `.husky/commit-msg` 檔案中撰寫以下內容：
        ```shell
        #!/usr/bin/env sh
        . "$(dirname -- "$0")/_/husky.sh"

        echo "--- start commit-msg git hook ---"
        npx --no -- commitlint --edit ${1}
        echo "--- end commit-msg git hook ---"
        ```
- 參考文章
  - [commitlint 官方文檔](https://commitlint.js.org/#/guides-local-setup)
  - [設定 Angular 專案使用 husky 簡化 Git hooks 設定並用 Prettier 統一風格](https://blog.miniasp.com/post/2021/08/27/Angular-husky-Git-hooks-Prettier-formatter)
    > 若你想讓特定版本跳過 Git 的 pre-commit hook 的話，可以考慮用以下命令：  
    `$ git commit -m "test" --no-verify`
## commitizen
- 用途
  - 透過問答的方式產出符合規範的 commit message
- 安裝
  - `commitizen`, `cz-conventional-changelog` 這兩個套件的 dependencies 都有對方，所以其實裝一個，另外一個一定也會被安裝
  - 較簡單
     - `$ npx commitizen init cz-conventional-changelog --save-dev --save-exact`
       - 執行此指令，path 的設定會在 package.json 內一併被設定好
  - 較複雜
    1. `$ npm i -D commitizen`
    2. `$ npm i -D cz-conventional-changelog`
    3. 在根目錄下新增 `.czrc` 這支檔案，並寫入下列內容：
      ```
      {
        // 寫法 1, 2 皆可，擇一撰寫即可

        // 寫法 1
        "path": "cz-conventional-changelog"
        // 寫法 2
        "path": "./node_modules/cz-conventional-changelog"
      }
      ```
       - 參考文章
         - [22 - Commitizen - 產生合法的 Commit 訊息](https://ithelp.ithome.com.tw/articles/10279064)
            > `config.commitizen.path` 的路徑會被 `require.resolve` 解析，因此可以直接寫模組名稱，它可以被對應至 `node_modules` 下的真正路徑
- 使用
  1. 要打 commit 的時候，在終端機輸入 `npx cz` 即可進入互動模式  
    (npm 版本號須為 5.2+)，  
    照著問題回答即可產出符合規範的 commit message
     - 如果沒有任何 staged file，commitizen 會在終端機提醒你： No files added to staging! Did you forget to run git add?
     - commit message 如果在 windows 終端機要打換行符號的話，要使用 `\n`
- commitizen 具體會問的問題
  1. Select the type of change that you're committing: (Use arrow keys)
     - feat:     A new feature
     - fix:      A bug fix
     - docs:     Documentation only changes
     - style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
     - refactor: A code change that neither fixes a bug nor adds a feature
     - perf:     A code change that improves performance
     - test:     Adding missing tests or correcting existing tests
  2. What is the scope of this change (e.g. component or file name): (press enter to skip)
  3. Write a short, imperative tense description of the change (max 84 chars):
  4. Provide a longer description of the change: (press enter to skip)
  5. Are there any breaking changes? (y/N)
  6. Does this change affect any open issues? (y/N)
  - 範例
    ```
    commitizen 問的問題：
    ? Select the type of change that you're committing: feat:     A new feature
    ? What is the scope of this change (e.g. component or file name): (press enter to skip) test.txt
    ? Write a short, imperative tense description of the change (max 84 chars):
    (14) modify content
    ? Provide a longer description of the change: (press enter to skip)
    aaa^bbb\ccc\nddd
    ? Are there any breaking changes? No
    ? Does this change affect any open issues? No

    產出的 commit message: 
    feat(test.txt): modify content

    aaa^bbb\ccc
    ddd
    ``` 
- 參考文章
  - [commitizen 官方文件 - Install and run Commitizen locally](https://github.com/commitizen/cz-cli#optional-install-and-run-commitizen-locally)