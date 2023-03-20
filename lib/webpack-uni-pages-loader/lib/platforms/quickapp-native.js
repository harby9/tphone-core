module.exports = function (pagesJson, manifestJson, loader) {
  return require('@tphone/core/lib/uni-quickapp-native/lib/manifest')(pagesJson, manifestJson, loader)
}
