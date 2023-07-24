module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'standard',
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    camelcase: 'off',
    'no-unused-vars': 'off',
    'n/no-path-concat': 'off',
    'no-unreachable': 'off',
    'no-case-declarations': 'off',
    'no-undef': 'off'

  }
}
