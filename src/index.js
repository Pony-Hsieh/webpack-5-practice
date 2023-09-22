import '@/styles/main.scss';
import '@/scripts/addEventListner';

if (process.env.NODE_ENV !== 'production') {
  // 只有在開發環境下須要透過 raw-loader 引入 html 達成 hot reload
  // eslint-disable-next-line
  require('./index.html');
}

console.log('asdaasasdasddasdsd');
