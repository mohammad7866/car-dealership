/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Add a transform configuration to tell Jest how to handle TypeScript files
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // Add moduleFileExtensions to include TypeScript files
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
