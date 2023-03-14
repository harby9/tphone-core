const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');

const { resolve } = require('path');
const { getMultipleEntries } = require('./packages/plugins');
/**
 * 获取多入口文件对象
 * 重命名入口文件，组装成如下的结构
 * input: {
 *  foo: 'src/index.js',
 *  bar: 'src/album.js'
 * }
 */
const sourcePath = resolve(__dirname, 'packages');
const multipleEntries = getMultipleEntries(sourcePath);


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