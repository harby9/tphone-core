const path = require('path')
const moduleAlias = require('module-alias');
require('module-alias/register')
const baseUrl = process.env.UNI_LINK ? 'node_modules/@tphone-beta/core' : '.';
moduleAlias.addAliases({
  '@tphone-beta/core': path.resolve(process.cwd(), baseUrl),
  '@tphone/core': path.resolve(process.cwd(), baseUrl),
});

// const types = require('./lib/types');
// const uniAppPlus = require('./lib/uni-app-plus'); es-module
const uniAutomator = require('./lib/uni-automator');
const uniCliI18n = require('./lib/uni-cli-i18n');
const uniCliShared = require('./lib/uni-cli-shared');
// const uniH5 = require('./lib/uni-h5'); 等待补充源码，重新打包
const uniHelperJson = require('./lib/uni-helper-json');
const uniI18n = require('./lib/uni-i18n');
// const uniMigration = require('./lib/uni-migration'); 等待补充源码，重新打包
// const uniMp360 = require('./lib/uni-mp-360');
// const uniMpAlipay = require('./lib/uni-mp-alipay');
// const uniMpBaidu = require('./lib/uni-mp-baidu');
// const uniMpKuaishou = require('./lib/uni-mp-kuaishou');
// const uniMpQq = require('./lib/uni-mp-qq');
// const uniMpToutiao = require('./lib/uni-mp-toutiao');
// const uniMpVue = require('./lib/uni-mp-vue');
// const uniMpWeixin = require('./lib/uni-mp-weixin');
// const uniQuickappNative = require('./lib/uni-quickapp-native');
// const uniQuickappWebview = require('./lib/uni-quickapp-webview');
// const uniStat = require('./lib/uni-stat');
// const uniTemplateCompiler = require('./lib/uni-template-compiler');
// const vueCliPluginHbuilderx = require('./lib/vue-cli-plugin-hbuilderx');
// const vueCliPluginUni = require('./lib/vue-cli-plugin-uni');
// const vueCliPluginUniOptimize = require('./lib/vue-cli-plugin-uni-optimize');
// const webpackUniMpLoader = require('./lib/webpack-uni-mp-loader');
// const webpackUniPagesLoader = require('./lib/webpack-uni-pages-loader');
// const yjplUniLoader = require('./lib/yjpl-uni-loader');

module.exports = {
  // types,
  // uniAppPlus,
  uniAutomator,
  uniCliI18n,
  uniCliShared,
  // uniH5,
  uniHelperJson,
  uniI18n,
  // uniMigration,
  // uniMp360,
  // uniMpAlipay,
  // uniMpBaidu,
  // uniMpKuaishou,
  // uniMpQq,
  // uniMpToutiao,
  // uniMpVue,
  // uniMpWeixin,
  // uniQuickappNative,
  // uniQuickappWebview,
  // uniStat,
  // uniTemplateCompiler,
  // vueCliPluginHbuilderx,
  // vueCliPluginUni,
  // vueCliPluginUniOptimize,
  // webpackUniMpLoader,
  // webpackUniPagesLoader,
  // yjplUniLoader
}