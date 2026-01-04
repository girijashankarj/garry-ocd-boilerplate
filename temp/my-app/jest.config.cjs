module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: true,
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  coverageThreshold: { global: { branches: 70, functions: 70, lines: 70, statements: 70 } },
};
