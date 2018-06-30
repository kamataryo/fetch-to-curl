module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  plugins: ['import'],
  extends: ['eslint:recommended', 'plugin:import/errors'],
  parserOptions: {
    sourceType: 'module',
  },
}
