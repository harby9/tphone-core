module.exports = {
  options: {
    extname: {
      template: '.wxml',
      style: '.wxss'
    }
  },
  transform: require('@tphone-beta/core/lib/uni-migration/lib/mp-weixin/transform')
}
