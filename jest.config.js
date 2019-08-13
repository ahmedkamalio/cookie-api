const root = require('app-root-path');

module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: root.resolve('temp/coverage'),
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  errorOnDeprecated: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/?(*.)+(spec|test).ts'],
  setupFiles: [root.resolve('tests/__mocks__/client.ts')]
};
