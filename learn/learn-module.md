# 前端模組化

## ES module (ESM)
- ES6 開始支援的 `import` `export`

## Commom JS
- require 語法是同步載入，因此他必須等待 require 執行完畢才會執行後面的程式碼。
- 每一個模組都是獨立的作用域，是無法跨作用域取值，這是什麼意思呢？每一個 script type="module" 都會自己的一個空間，你是無法取得另一個空間的變數或方法。