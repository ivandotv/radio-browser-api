import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
// import visualizer from 'rollup-plugin-visualizer'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const libraryName = 'index'

const input = 'src/index.ts'

const unpkgFilePath = libPath('./dist/unpkg', libraryName.toLocaleLowerCase())

// https://github.com/rollup/rollup/issues/703#issuecomment-314848245
function defaultPlugins(config = {}) {
  return [
    resolve({ extensions }),
    peerDepsExternal(),
    babel(config.babel || undefined),
    commonjs(),
    filesize()
    // visualizer({ template: "circlepacking" }),
  ]
}

// umd build for the browser
const umd = {
  input,
  output: [
    {
      file: unpkgFilePath('.js'),
      format: 'umd',
      name: libraryName,
      sourcemap: true
    },
    {
      file: unpkgFilePath('.min.js'),
      format: 'umd',
      name: libraryName,
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: defaultPlugins({
    babel: {
      extensions,
      envName: 'browser'
    }
  })
}

const umdWithPolyfill = {
  input,
  output: [
    {
      file: unpkgFilePath('.polyfill.min.js'),
      format: 'umd',
      name: libraryName,
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: defaultPlugins({
    babel: {
      extensions,
      envName: 'browserPolyfill'
    }
  })
}

// build for browsers as module
const browserModule = {
  input,
  output: [
    {
      file: unpkgFilePath('.esm.js'),
      format: 'esm',
      sourcemap: true
    },
    {
      file: unpkgFilePath('.esm.min.js'),
      format: 'esm',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: defaultPlugins({
    babel: {
      extensions,
      envName: 'browserModule'
    }
  })
}

const browserModuleWithPolyfill = {
  input,
  output: [
    {
      file: unpkgFilePath('.esm.polyfill.js'),
      format: 'esm',
      sourcemap: true
    },
    {
      file: unpkgFilePath('.esm.polyfill.min.js'),
      format: 'esm',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: defaultPlugins({
    babel: {
      extensions,
      envName: 'browserModulePolyfill'
    }
  })
}

const allBuilds = [
  umd,
  // umdWithPolyfill,
  browserModule
  // browserModuleWithPolyfill
]

const envToBuildMap = {
  umd: [umd, umdWithPolyfill],
  browser: [browserModule, browserModuleWithPolyfill]
}

const finalBuilds = chooseBuild(envToBuildMap, process.env.BUILD) || allBuilds

function libPath(path, libName) {
  return function (suffix) {
    return path.concat('/', libName, suffix)
  }
}

function chooseBuild(buildMap, builds) {
  if (!builds) {
    return
  }
  const envArr = builds.split('--')
  const result = []

  if (envArr.length > 0) {
    envArr.forEach((element) => {
      if (buildMap[element]) {
        result.push(...buildMap[element])
        console.log(`Found key: ${element}`)
      }
    })

    if (result.length === 0) {
      throw new Error(`Build configuration keys: ${builds} don't exists`)
    }

    return result
  }
}

export default Promise.resolve([...finalBuilds])
