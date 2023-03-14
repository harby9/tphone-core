const {
  info,
  done
} = require('@vue/cli-shared-utils')

const updateComponents = require('@tphone-beta/core/lib/vue-cli-plugin-uni-optimize/packages/webpack-optimize-plugin/component')
const updateApis = require('@tphone-beta/core/lib/vue-cli-plugin-uni-optimize/packages/webpack-optimize-plugin/api')

class WebpackOptimizePlugin {
  apply (compiler) {
    let optimized = false
    compiler.hooks.beforeCompile.tapPromise('WebpackOptimizePlugin', compilation => {
      return new Promise((resolve, reject) => {
        if (!optimized) {
          updateComponents(new Set())
          updateApis(new Set(), new Set())
        }
        resolve()
      })
    })
    compiler.hooks.shouldEmit.tap('WebpackOptimizePlugin', compilation => {
      return optimized
    })
    compiler.hooks.done.tapPromise('WebpackOptimizePlugin', compilation => {
      return new Promise((resolve, reject) => {
        if (!optimized) {
          console.log()
          info('Build optimizing...')
          optimized = true
          updateComponents(process.UNI_TAGS || new Set())
          updateApis(process.UNI_APIS || new Set(), process.UNI_USER_APIS || new Set())
        } else {
          done('Build complete.')
          process.exit(0)
        }
        resolve()
      })
    })
  }
}

module.exports = WebpackOptimizePlugin
