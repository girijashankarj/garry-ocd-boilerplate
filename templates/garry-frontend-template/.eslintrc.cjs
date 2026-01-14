module.exports = {
  root: true,
  env: { browser: true, node: true, es2022: true },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: { ecmaVersion: 2022, sourceType: 'module', ecmaFeatures: { jsx: true } },
  plugins: ['functional', 'immutable'],
  rules: {
    'no-console': 'off',
    // Treat warnings as errors - enforce strictness
    'no-warning-comments': ['error', { terms: ['todo', 'fixme'], location: 'anywhere' }],
    // Basic immutability/functional rules
    'functional/immutable-data': ['error'],
    'immutable/no-mutation': 'error',
  },
};
