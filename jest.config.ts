import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],

  moduleFileExtensions: ['ts', 'html', 'js'],

  transformIgnorePatterns: [
    'node_modules/(?!(@angular|rxjs)/)',
  ],

  extensionsToTreatAsEsm: ['.ts'],

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;

