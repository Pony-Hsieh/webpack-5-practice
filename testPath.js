/* 理解 resolve, join 的差異 */

const path = require('path');

function testDirname() {
  console.log(
    `
  ${
    // C:\Users\lbjwi\Downloads\webpack-5-practice
    path.resolve('aaa', __dirname)
  }
  ${
    // C:\Users\lbjwi\Downloads\webpack-5-practice\aaa
    path.resolve(__dirname, 'aaa')
  }
  ${
    // aaa\C:\Users\lbjwi\Downloads\webpack-5-practice
    path.join('aaa', __dirname)
  }
  ${
    // C:\Users\lbjwi\Downloads\webpack-5-practice\aaa
    path.join(__dirname, 'aaa')
  }
  `,
  );
}

function testPathJoin() {
  console.log(
    `
  ${
    path.join('aaa', 'bbb', 'ccc')
    // aaa\bbb\ccc
  }
  ${
    path.join('/aaa', 'bbb', 'ccc')
    // \aaa\bbb\ccc
  }
  ${
    path.join('aaa', '/bbb', 'ccc')
    // aaa\bbb\ccc
  }
  ${
    path.join('aaa', './bbb', 'ccc')
    // aaa\bbb\ccc
  }
  ${
    path.join('aaa', 'bbb/ccc', 'ddd')
    // aaa\bbb\ccc\ddd
  }
  ${
    path.join('aaa', 'bbb/ccc', './', 'ddd')
    // aaa\bbb\ccc\ddd
  }
  ${
    path.join('aaa', '../', 'bbb/ccc', '../', 'ddd')
    // bbb\ddd
  }
  `,
  );
}

function testPathResolve() {
  console.log(
    `
  ${
    path.resolve('aaa', 'bbb', 'ccc')
    // C:\Users\lbjwi\Downloads\webpack-5-practice\aaa\bbb\ccc
  }
  ${
    path.resolve('/aaa', 'bbb', 'ccc')
    // C:\aaa\bbb\ccc
  }
  ${
    path.resolve('aaa', '/bbb', 'ccc')
    // C:\bbb\ccc
  }
  ${
    path.resolve('aaa', '/bbb', '/ccc')
    // C:\ccc
  }
  ${
    path.resolve('aaa', '/bbb', '/ccc', '/')
    // C:\
  }
  ${
    path.resolve('aaa', './bbb', 'ccc')
    // C:\Users\lbjwi\Downloads\webpack-5-practice\aaa\bbb\ccc
  }
  ${
    path.resolve('aaa', 'bbb/ccc', 'ddd')
    // C:\Users\lbjwi\Downloads\webpack-5-practice\aaa\bbb\ccc\ddd
  }
  ${
    path.resolve('aaa', 'bbb/ccc', './', 'ddd')
    // C:\Users\lbjwi\Downloads\webpack-5-practice\aaa\bbb\ccc\ddd
  }
  ${
    path.resolve('aaa', '/bbb/ccc', './', 'ddd')
    // C:\bbb\ccc\ddd
  }
  ${
    path.resolve('aaa', '../', 'bbb/ccc', '.', 'ddd')
    // C:\Users\lbjwi\Downloads\webpack-5-practice\bbb\ccc\ddd
  }
  ${
    path.resolve('aaa')
    // C:\Users\lbjwi\Downloads\webpack-5-practice\bbb\ccc\ddd
  }
  `,
  );
}

// `$ npm i glob`
const glob = require('glob');

const res = glob.sync(`${path.resolve(__dirname, 'assets')}/**/*`, {
  // only want the files, not the dirs
  nodir: true,
});
console.log(res);
// console.log(
//   // 列出 ['assets']
//   glob.sync(`${path.resolve(__dirname, "assets")}`)
// );

// console.log(
//   // 列出 下一層資料夾
//   glob.sync(`${path.resolve(__dirname, "assets")}/*`)
// );

// console.log(
//   // 列出 assets + 下一層資料夾 + 底下所有資料夾的所有檔案
//   glob.sync(`${path.resolve(__dirname, "assets")}/**`)
// );

// console.log(
//   // 列出 底下所有資料夾的所有檔案
//   glob.sync(`${path.resolve(__dirname, "assets")}/*/*`)
// );

// console.log(
//   // 列出 下一層資料夾 + 底下所有資料夾的所有檔案
//   glob.sync(`${path.resolve(__dirname, "assets")}/*/**`)
// );

// console.log(
//   // 列出 下一層資料夾 + 底下所有資料夾的所有檔案
//   glob.sync(`${path.resolve(__dirname, "assets")}/**/*`)
// );

// console.log(
//   // 列出 assets + 下一層資料夾 + 底下所有資料夾的所有檔案
//   glob.sync(`${path.resolve(__dirname, "assets")}/**/**`)
// );
