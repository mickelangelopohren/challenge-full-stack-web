module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'arrow-body-style': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'no-unused-expressions': 0,
  },
};
