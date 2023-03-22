const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');

const { resolve } = require('path');
const { resetPkgJson, getDirPathAndPkgJson, mergeFinalPkg, pnpmInstall } = require('./rollup-tool');

// 重置package.json
resetPkgJson();
/**
 * 获取多入口文件对象
 * 重命名入口文件，组装成如下的结构
 * input: {
 *  'foo/index': 'src/index.js',
 *  'bar/index': 'src/album.js'
 * }
 */
// packages目录下所有有效包的信息
const packagesInfo = getDirPathAndPkgJson(resolve(__dirname, './packages'));
// 多入口对象
const multipleEntries = {};
packagesInfo.map(info => {
  const { dirName, dirPath, pkgJson } = info;
  multipleEntries[`${dirName}/index`] = `${dirPath}/${pkgJson.main}`;
});
// lib目录下所有有效包的信息
// const libInfo = getDirPathAndPkgJson(resolve(__dirname, './lib'));
// mergeFinalPkg(packagesInfo.concat(libInfo));
// pnpmInstall();

module.exports = {
  input: multipleEntries,
  output: {
    dir: 'lib',
    format: 'cjs'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json()
  ]
}