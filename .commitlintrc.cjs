module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-pattern': [2, 'always', '^[A-Za-z0-9-]+: .+$'],
    'subject-empty': [2, 'never'],
  },
};
