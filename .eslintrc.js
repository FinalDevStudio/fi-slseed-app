module.exports = {
  root: true,
  extends: ['plugin:vue/essential', '@vue/prettier'],
  env: {
    node: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
    //   ecmaVersion: 8,
    //   ecmaFeatures: {
    //     experimentalObjectRestSpread: true
    //   }
  }
};