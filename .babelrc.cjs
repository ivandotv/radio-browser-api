/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require('./package.json')
const { execSync } = require('child_process')

const pkgVersion = process.env.PKG_VERSION || pkg.version
const nodeEnv = process.env.NODE_ENV || 'production'

const buildDate = execSync('git show -s --format=%ci HEAD')
  .toString()
  .replace(/[\r\n]+$/, '')

const commitSha = execSync('git rev-parse --short HEAD')
  .toString()
  .replace(/[\r\n]+$/, '')

const replacements = {
  __VERSION__: pkgVersion,
  __BUILD_DATE__: buildDate,
  __COMMIT_SHA__: commitSha,
  'process.env.NODE_ENV': nodeEnv
}

const plugins = ['dev-expression', ['transform-define', replacements]]

//default babel config
const config = { plugins }

//babel config for Jest tests
const jestConfig = {
  plugins,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  ignore: ['node_modules'],
  sourceMaps: 'inline'
}

module.exports = process.env.NODE_ENV === 'test' ? jestConfig : config
