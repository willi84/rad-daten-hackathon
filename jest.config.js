/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    // '**/*.{js,jsx}',
    'src/app/dashboard/src/**/*.{ts,tsx}',
    // 'src/app/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/vendor/**',
  ],
  coverageReporters: ['json', 'json-summary', 'lcov', 'text'],
};
