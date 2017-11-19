module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  env: {
    browser: true,
    jest: true
  },
  extends: ['plugin:react/recommended'],
  plugins: ['react', 'flowtype', 'graphql'],
  rules: {
    'jsx-quotes': ['error', 'prefer-double'],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': [2, 'always'],
    'no-var': 2,
    'no-unused-vars': 2,
    'prefer-const': 2,
    'react/jsx-wrap-multilines': 2,
    'react/prefer-es6-class': 2,
    'react/prefer-stateless-function': 2,
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],

    'flowtype/define-flow-type': 1,
    'flowtype/use-flow-type': 1,

    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        schemaJson: require('./schema.json')
      }
    ],
    'graphql/named-operations': [
      'error',
      {
        env: 'apollo',
        schemaJson: require('./schema.json')
      }
    ]
  }
}
