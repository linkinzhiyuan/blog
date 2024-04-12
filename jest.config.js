module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  testMatch: ['**/(*.)+(spec|test).+(ts|js|tsx)'],
  transform: {
    "^.+\\.(ts|tsx|mjs|js|html)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
        stringifyContentPathRegex: "\\.(html|svg)$",
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules'],
}
