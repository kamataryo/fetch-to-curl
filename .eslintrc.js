module.exports = {
  env: {
    commonjs : true,
    es6      : true,
    mocha    : true,
    node     : true
  },
  plugins: [
    'import',
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: false
    }
  },
  'rules': {
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'jsx-quotes': ['error', 'prefer-double'],
    'key-spacing': ['off'],
    'keyword-spacing': ['error'],
    'linebreak-style': ['error', 'unix'],
    'no-console': ['warn'],
    'no-const-assign': ['error'],
    'no-dupe-args': ['error'],
    'no-undefined' : ['error'],
    'no-unused-vars': ['warn'],
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single'],
    'require-jsdoc': ['error', {
      'require': {
        'ArrowFunctionExpression': true,
        'ClassDeclaration': true,
        'FunctionDeclaration': true,
        'MethodDefinition': true
      }
    }],
    'valid-jsdoc': ['error'],
    'semi': ['error', 'never'],
    'spaced-comment': [
      'error',
      'always', {
        'line': {
          'markers': ['/'],
          'exceptions': ['-', '+']
        },
        'block': {
          'markers': ['!'],
          'exceptions': ['*'],
          'balanced': true
        }
      }
    ],
    'space-unary-ops': ['error'],
    'space-infix-ops': ['error', { 'int32Hint': false }],
    'sort-imports': ['off'],
  }
}
