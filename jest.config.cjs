/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.test.js'],
  verbose: true,
  collectCoverage: true,
  globals: {
    'ts-jest': {
      diagnostics: true, // Enables type checking in tests
      tsconfig: './tsconfig.json'
    }
  }
}
