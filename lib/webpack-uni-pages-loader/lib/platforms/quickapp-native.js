module.exports = function (pagesJson, manifestJson, loader) {
  return require('@tphone-beta/core/lib/uni-quickapp-native/lib/manifest')(pagesJson, manifestJson, loader)
}
