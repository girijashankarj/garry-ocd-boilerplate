module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    collectCoverage: true,
    testMatch: ['<rootDir>/tests/**/*.test.ts', '<rootDir>/tests/**/*.test.tsx'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
        '\\\\.(css|less|sass|scss)$': 'identity-obj-proxy'
    },
    globals: {
        'ts-jest': {
            useESM: true,
            tsconfig: 'tsconfig.json'
        }
    },
    coverageThreshold: { global: { branches: 70, functions: 70, lines: 70, statements: 70 } }
};
