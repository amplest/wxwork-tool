module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    'spaced-comment': 'off',
    'comma-dangle': [2, 'never'],
    'no-debugger': 'off',
    quotes: 'off'
  }
}
