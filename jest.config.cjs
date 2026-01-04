module.exports = {
  testEnvironment: 'node',
  testTimeout: 20000,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/templates/',
    '<rootDir>/tmp/',
    '<rootDir>/tmp/',
    '<rootDir>/tmp-check/',
  ],
  coverageReporters: ['text', 'text-summary', 'lcov'],
  collectCoverageFrom: ['bin/**/*.js', 'scripts/**/*.js', '!**/node_modules/**'],
  coverageThreshold: {
    global: { statements: 80, branches: 80, functions: 80, lines: 80 },
  },
};
