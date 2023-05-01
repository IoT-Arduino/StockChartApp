const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  setupFiles: ['<rootDir>/jest.setup.env.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '@/components/(.*)': '<rootDir>/components/$1',
    '@/pages/(.*)': '<rootDir>/pages/$1',
  },
  roots: ['<rootDir>/__tests__'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/__mocks__/matchMedia.mock.ts'],
  // Add coverage-related configuration
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/pages/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/functions/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/hooks/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/store/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/utils/**/*.{js,jsx,ts,tsx}',
  ],
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: '<rootDir>/coverage',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
