/* 測試 lazy load */

// 创建一个 button
const btn = document.createElement('button');
btn.innerHTML = 'lazy load test button';
document.body.appendChild(btn);

// 异步加载代码
async function getAsyncComponent() {
  console.log('getAsyncComponent');
  const element = document.createElement('div');

  // eslint-disable-next-line
  const { default: _ } = await import('lodash');
  element.innerHTML = _.join(['Hello!', 'dynamic', 'imports', 'async'], ' ');

  return element;
}

// 点击 button 时，懒加载 lodash，在网页上显示 Hello! dynamic imports async
btn.addEventListener('click', () => {
  getAsyncComponent().then((component) => {
    document.body.appendChild(component);
  });
});
