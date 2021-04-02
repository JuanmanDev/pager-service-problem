const { pathsToModuleNameMapper } = require('ts-jest/utils');
const requireJSON5 = require('require-json5');
const { compilerOptions } = requireJSON5('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/'}),
};