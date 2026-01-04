module.exports = {
    root: true,
    env: { node: true, es2022: true },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'functional', 'immutable'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
    rules: {
        'no-console': 'off',
        'no-warning-comments': ['error', { terms: ['todo', 'fixme'], location: 'any' }],
        'functional/immutable-data': ['error'],
        'immutable/no-mutation': 'error'
    }
};