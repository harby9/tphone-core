const { format } = require('@tphone-beta/core/lib/uni-cli-i18n/lib/lang')
const { osLocale } = require('os-locale-s-fix/cjs')

function getLocale () {
  return format(process.env.UNI_HBUILDERX_LANGID || osLocale.sync({ spawn: true, cache: false }) || 'en')
}

module.exports = {
  getLocale
}
