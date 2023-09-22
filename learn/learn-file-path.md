# 基礎知識
- `./`: 同一層
- `../`: 上一層



# __dirname, __filename
- `__dirname`: 獲取當前文件所在目錄的完整路徑
- `__filename`: 獲取當前文件的完整路徑
- code
  ```js
  console.log(__dirname);
  // C:\Users\lbjwi\Downloads\webpack-5-practice

  console.log(__filename);
  // C:\Users\lbjwi\Downloads\webpack-5-practice\testPath.js
  ```



# 文件路徑分隔符
1. windows: `\`
2. Linux: `/`



# path.join(), path.resolve()

## path.join()
- 作用
  - `path.join()` 使用作業系統特定的分隔符將全部給定的 path 片段串接在一起，並規範化(normalize)生成的路徑
- 傳入參數
  - string；如傳入多個，中間由逗點分隔
  - [node - path.join()](https://nodejs.org/api/path.html#pathjoinpaths)
- 解析原則
  1. 長度為零的 path 片段會被忽略
  2. 如果路徑中出現".."，那麼它前一個的路徑片段將被丟失
  3. 串接後的路徑字串如果長度為零，則回傳 '.' 表示當前工作目錄

## path.resolve()
- 作用
  - `path.resolve()` 會將一個路徑或路徑片段的序列**解析為一個 "絕對路徑"**
- 傳入參數
  - string；如傳入多個，中間由逗點分隔
  - [node - path.resolve()](https://nodejs.org/api/path.html#pathresolvepaths)
- 解析原則
  1. 將給定的路徑的序列 **由右向左** 依次解析，直到 construct 出一個絕對路徑；  
    一旦 construct 出一個絕對路徑，會直接回傳，而不繼續解析。  
    ```js
    path.resolve('aaa', __dirname);
    // C:\Users\lbjwi\Downloads\webpack-5-practice
    path.resolve(__dirname, 'aaa');
    // C:\Users\lbjwi\Downloads\webpack-5-practice\aaa
    ```
  2. 如果處理完全部給定的 path 片段後，還無法生成一個絕對路徑，則使用當前工作目錄
  3. 生成的路徑是規範化(normalize)後的，且末尾的斜杠會被刪除，除非路徑被解析為根目錄
  4. 長度為零的 path 片段會被忽略
  5. 如果沒有傳入 path 片段，則 `path.resolve()` 會回傳當前工作目錄的絕對路徑
    ```js
    path.resolve('aaa', __dirname);
    // C:\Users\lbjwi\Downloads\webpack-5-practice
    path.resolve(__dirname, 'aaa');
    // C:\Users\lbjwi\Downloads\webpack-5-practice\aaa
    ```
  6. 在 resolve 中，只要遇到`/` 則視為根目錄並結束解析
    ```js
    path.resolve('aaa', '/bbb', 'ccc');
    // C:\bbb\ccc
    ```
## 比較
- `path.join()` 只是簡單的將路徑片段進行拼接，並規範化生成一個路徑；  
  而 `path.resolve()` 則一定會生成一個絕對路徑。
- The two functions deal with segments starting with `/` in very different ways
  - `join` will just concatenate it with the previous argument
  - `resolve` will treat this as the root directory, and ignore all previous paths
- `path.resolve()` 一旦解析出絕對路徑，就會直接回傳該絕對路徑  
  `path.join()` 不會
  ```js
  path.resolve('aaa', __dirname);
  // C:\Users\lbjwi\Downloads\webpack-5-practice

  path.join('aaa', __dirname)
  // aaa\C:\Users\lbjwi\Downloads\webpack-5-practice
  ```
- 未帶參數
  ```js
  path.join();
  // .
  path.resolve();
  // C:\Users\lbjwi\Downloads\webpack-5-practice
  ```
## 參考文章
- [Node 的 path.resolve 和 path.join 的區別](https://cloud.tencent.com/developer/article/1888130)
- [stackoverflow - What's the difference between path.resolve and path.join?](https://stackoverflow.com/questions/35048686/whats-the-difference-between-path-resolve-and-path-join)



# Path.normalize() 在幹嘛？？？(TODO: 待查)
- normalizes the resulting path 在幹嘛？



# *, **
- `**` is a recursive wildcard which can only be used with paths, not file names.
- Multiple recursive expressions(`**`) within the path are not supported.
## 參考文章
- [wildcards-in-paths.md](https://gist.github.com/bennlee/92ffaa27eea326da46e538a80c3eebae)