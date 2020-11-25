module.exports = {
  rootDir: 'src',
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/**/?(*.)+(spec|test).ts"
  ],
  coverageDirectory: '../coverage'
}
