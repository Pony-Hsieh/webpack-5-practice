# Babel

## 簡介
- Babel 是甚麼？
  - Babel 是一個工具集，主要用於將 ES6 (或更高)版本的 JavaScript 代碼轉為 ES5 等向後兼容的 JS 代碼，從而可以運行在低版本瀏覽器或其它環境中。
  因此，你完全可以在工作中使用 ES6 編寫程序，最後再使用 Babel 將代碼轉為 ES5 的代碼，這樣就不用擔心所在環境的語法支援程度了
- Babel 依賴 Node.js
- 撰寫 Babel 設定檔的方式(作用皆相同)
  1. `babel.config.js`
  2. `.babelrc`
  3. `.babelrc.js`
  4. `package.json`
- Babel 能做的事情
  1. 語法轉換： 高級語言特性的降級
  2. polyfill： 透過 Polyfill 方式在目標環境中添加尚未支援的特性
  3. 源碼轉換： 將 jsx、vue 代碼轉換為瀏覽器可識別的 JS 代碼

## 編譯流程
- babel 是 source to source 的轉換，整體編譯流程分為三步：
  1. parse： 透過 parser 把源碼轉成抽象語法樹(AST)
  2. transform： 遍歷 AST，調用各種 transform 插件對 AST 進行增刪改
  3. generate： 把轉換後的 AST 打印成目標代碼，並生成 sourcemap
  - 簡單總結一下就是：  
    為了讓計算機理解代碼需要先對源碼字符串進行 parse，生成 AST，把對代碼的修改轉為對 AST 的增刪改，轉換完 AST 之後再打印成目標代碼字符串-

## 使用方式
- [learn-webpack 處理 JS 兼容性](./learn-webpack.md##JS)

## plugin

## plugin, preset
- 執行順序
  - plugin -> preset
  - plugin 順序從前往後
  - preset 順序從後往前

## @babel

### @babel/core

### @babel/preset-env

### @babel/plugin-transform-runtime
- [不談配置，聊一聊@babel/plugin-transform-runtime 做了什麼](https://juejin.cn/post/7156050862660386852)

### @babel/runtime
- 只有輔助函數，並沒有 polyfill

### @babel/runtime-corejs3

## 參考文章
- [webpack入门之js处理(babel、babel polyfill)](https://juejin.cn/post/7126465727178997791)
- [一文搞懂 core-js@3、@babel/polyfill、@babel/runtime、@babel/runtime-corejs3 的作用与区别](https://juejin.cn/post/7062621128229355528)
  > 使用 `core-js@3` 來 polyfill，會全局引入缺少的 API，例如 require("core-js/modules/es.promise.js")。有時候開發工具庫，希望避免 polyfill 污染全局變量。這時候可以不使用 core-js@3 來 polyfill，轉而使用 @babel/runtime-corejs3，@babel/runtime-corejs3 相當於 @babel/runtime + 不污染環境的 core-js@3。

# corejs
## core-js@2
## core-js@3
- 如果是新專案的話，建議用 core-js@3
## 參考文章