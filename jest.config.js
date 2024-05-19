module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/tests/**/*.test.ts'],
  moduleNameMapper: {
    '^database-api$': '<rootDir>/packages/database-api/src'
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json' // or the relative path to your tsconfig file
      }
    ]
  }
};
