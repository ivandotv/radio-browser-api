if (process.env.JEST_DEBUG) {
  //increase jest default timeout when debugging via test files
  jest.setTimeout(1000 * 60 * 10)
}
