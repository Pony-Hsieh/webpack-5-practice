# editor config 設定
- 用途
  - 統一跨平台的 coding style
- 會發現這個是因為在自行設定 eslint 風格(之前都是直接套用 airbnb 的規範) 的時候，發現有一個設定值
  ```js
  rules: {
    'linebreak-style': ['error', 'windows'],
    // 查詢原始碼發現 airbnb 此條 rule 的設定值如下：
    'linebreak-style': ['error', 'unix'],
  },
  ```
  查了一下發現有設定檔可以統一專案內的某些設定，例如換行是使用 lf 或 crlf、縮排，等等的  
- `.editorconfig` 採用 `INI` 檔案格式編寫，以 name = value 配置各個設定；name 為設定屬性，value 為設定值
- 如果要在 vs code 讓 editor config 生效的話，須搭配 [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
## 設定值
- 範例：
  ```ini
  root = true

  [*]
  indent_style = space
  indent_size = 2
  end_of_line = lf
  trim_trailing_whitespace = true
  charset = utf-8

  [*.md]
  trim_trailing_whitespace = false
  ```
- `root`
  - `root = true` 代表此 .editorconfig 是最終的設定檔了。  
    如果設定為 false 的話，EditorConfig 會再往外一層繼續尋找 .editorconfig 檔案是否存在。
    所以**一般都是將 .editorconfig 放在專案的根目錄底下，並設定 root = true**。
## 參考文章
  - [VS Code 擴充推薦 - EditorConfig](https://myapollo.com.tw/blog/vscode-editorconfig/)
    > 由於編輯器預設值/設定不一樣，例如有些使用 Tab 縮排，有些用 4 個空格縮排，這種不同編輯器間的差異，會對開發團隊帶來 coding styles 不ㄧ致的問題，而且每個公司一般來說會有各種開發專案，不同開發專案間有不同的 coding styles 是很常見的事，這時**如果只是在 README 或開發文件中規定 coding styles 不僅麻煩，也容易造成開發者的困擾**。

    > 目前最好的解決辦法就是使用 EditorConfig ，將 coding styles 設定寫成 `.editorconfig` 放到各個專案之中，並請每位團隊成員安裝 EditorConfig 擴充(extension/plugin)，如此就能讓團隊成員在開啟各種不同專案自動載入不同的 coding styles, 完成一種無縫切換的開發體驗！
  - [GitHub 项目中的 .editorconfig 文件是作什么用的？](https://blog.csdn.net/qq_20553613/article/details/105496828)
    > editorconfig 就是為了**統一編程風格**，提高代碼閱讀質量。  
    一個大型軟體項目，往往是團隊模塊化開發，不同的開發人員使用的編輯器可能不一樣，甚至編輯的系統平臺都不一樣。一部分人喜歡在 Linux 下使用 Vim 編寫代碼，另外一部分可能傾向於 Windows下用 VS 開發。  
    另外，還存在一些編程風格的不同，典型的就是縮進問題，使用空格縮進還是 Tab 鍵縮進，Tab 鍵表示 2 個空格縮進還是 4 個空格縮進。  
    即使是開發團隊統一編程風格、編輯器，仍不能保證歷史遺留代碼、第三方開源庫等等的風格不一致問題。此外，還可能涉及一些文字編碼問題，如UTF-8, UTF-16, GB2312 等。
  - [编辑器规范配置.editConfig](https://zhuanlan.zhihu.com/p/109979744)
  - [16 - EditorConfig - 配置輸入方式](https://ithelp.ithome.com.tw/articles/10276220)
