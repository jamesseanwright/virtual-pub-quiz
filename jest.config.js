'use strict';

module.exports = {
  clearMocks: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: 'src(/.*)?/__tests__/.*.test.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'], // TODO: .[jt]sx for frontend
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
      diagnostics: false,
    },
  },
};
