import type { Config } from 'jest'

const config: Config = {
  // Automatically clear mock calls, instances, and results before every test
  clearMocks: true,
  
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',
  
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts', 'vue'],
  
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  
  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/__tests__/**/*.spec.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  
  // Module name mapper for handling assets and styles
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  
  // Setup files to run before each test
  setupFiles: ['<rootDir>/test/setup.ts'],
}

export default config
