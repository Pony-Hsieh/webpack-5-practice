export function es6() {
  /* --- 箭頭函式、ES6 變數、ES6 陣列方法 --- */
  const color = [1, 2, 3, 4, 5];
  // eslint-disable-next-line
  const result = color.filter((item) => item > 2);
  // const result2 = color.some((item) => item > 2);

  // const arr2 = [0, 1, [2, [3, [4, 5]]]];
  // console.log(arr2.flat(Infinity));

  // /* --- fetch --- */
  // const res = await fetch("https://randomuser.me/api/");

  // /* --- Class 語法糖 --- */
  // class Circle { }

  // /* --- Promise 物件 --- */
  // const promise = Promise.resolve();

  // /* --- Map --- */
  // const map = new Map();
  // map.set('first', 1);
}
