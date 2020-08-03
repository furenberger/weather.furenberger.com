module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**./*.js',
    '*.js',
    'server/**./*.js',
    'server/*.js',
    '!server/index.js',
    '!__tests__/**/*.js',
    '!jest*.js',
    '!coverage/**',
    '!config/**',
  ],
  coverageDirectory: 'coverage',
  resetMocks: true,
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)+(spec|test).js?(x)'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/client/',
    '/coverage/'
  ],
  verbose: true
};
