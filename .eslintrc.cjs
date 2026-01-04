module.exports = {
  root: true,
  env: { node: true, es2022: true },
  extends: ['eslint:recommended'],
  parserOptions: { ecmaVersion: 2022, sourceType: 'script' },
  plugins: ['functional', 'immutable', 'import'],
  rules: {
    'no-console': 'off',
    'no-warning-comments': ['error', { terms: ['todo', 'fixme'], location: 'anywhere' }],
    'functional/immutable-data': ['error'],
    'immutable/no-mutation': 'error',
    'import/no-unresolved': 'off',
  },
};
