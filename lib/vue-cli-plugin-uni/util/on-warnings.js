const stringify = require('@tphone/core/lib/vue-cli-plugin-uni/util/stringify')
module.exports = function (errors) {
  const {
    runByHBuilderX
  } = require('@tphone/core/lib/uni-cli-shared')
  if (runByHBuilderX) {
    console.log('WARNING: ' + stringify(errors))
  } else {
    console.warn(stringify(errors))
  }
}
