module.exports = {
  // '*.{ts,js,vue}': ['eslint --fix'],
  // '*.{html,scss,css,vue}': ['prettier --write', 'stylelint --fix'],

  '*.js': ['eslint --fix', 'prettier --write'],

  '*.scss': ['stylelint --fix', 'stylelint --fix', 'prettier --write'],
  // 'stylelintTest.scss': [
  //   'stylelint --fix',
  //   'stylelint --fix',
  //   'prettier --write',
  // ],

  // 測試是否有需要使用 'git add' 指令
  // 'stylelintTest.scss': ['stylelint --fix && stylelint --fix', 'git add'],
};
