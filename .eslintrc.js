module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  // 可以省略 eslint-config- 前綴；例如 airbnb 會被解析為 eslint-config-airbnb
  extends: ['airbnb-base', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-use-before-define': ['error', { functions: false }],
    'func-names': ['warn', 'as-needed'],
    'no-console': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
  },
};
