module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  silent: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['<rootDir>/dist'],
  setupFilesAfterEnv: ['<rootDir>/jestImports.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  coverageProvider: 'v8',
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/src/theme.ts',
    '<rootDir>/src/App.tsx',
    '<rootDir>/src/apollo/',
    '<rootDir>/src/graphql/',
    'index.ts'
  ]
};
