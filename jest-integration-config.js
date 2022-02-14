// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./jest.config')

config.testMatch = ['**/*.test.ts']

module.exports = config
