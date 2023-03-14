const compiler = require('@tphone-beta/core/lib/uni-template-compiler')

const defaultOptions = {
  compiler,
  hotReload: false,
  cacheDirectory: false,
  cacheIdentifier: false,
  transformAssetUrls: false // 禁用，由 uni-template-compiler 自行实现 transformAssetUrls
}

const defaultCompilerOptions = {
  preserveWhitespace: false
}

module.exports = {
  test: [/\.vue$/, /\.nvue$/],
  loader: require.resolve('@tphone-beta/core/lib/vue-cli-plugin-uni/packages/vue-loader'),
  options (options = {}, compilerOptions = {}) {
    return Object.assign({},
      defaultOptions,
      options, {
        compilerOptions: Object.assign({}, defaultCompilerOptions, compilerOptions)
      })
  },
  compiler
}
