const { resolve } = require('path');
const fse = require('fs-extra');
const { spawn } = require('child_process');
const os = require('os');

// 获取打包的多入口文件
function getMultipleEntries (sourcePath) {
  // 获取源码文件夹
  const sources = fse.readdirSync(sourcePath);
  // 多入口对象
  const multipleEntries = {};
  for (let i = 0; i < sources.length; i++) {
    const dir = sources[i];
    if(dir === 'types') continue;
    // packages下的文件夹路径
    const dirPath = resolve(sourcePath, dir);
    const stat = fse.lstatSync(dirPath);
    // 过滤非文件夹
    const isDirectory = stat.isDirectory(stat);
    if (!isDirectory) continue;
    // 过滤空文件夹
    if (fse.readdirSync(dirPath).length === 0) continue;
    // preparePackages(dirPath);
    const main = preparePackages(dirPath);
    console.log('multipleEntries...');
    multipleEntries[`${dir}/index`] = `${dirPath}/${main}`;
  }
  return multipleEntries;
}

/**
 * 如果子包含有非空的package.json，且package.json包含preinstall字段，就执行npm i
 * @param {*} dirPath packages里子包的路径
 * @returns main入口路径
 */
function preparePackages (dirPath) {
  const pkgPath = resolve(dirPath, 'package.json');
  const isExitPkg = fse.existsSync(pkgPath);
  if (!isExitPkg) return;
  const pkgJson = fse.readFileSync(pkgPath, 'utf-8');
  const preinstall = pkgJson && JSON.parse(pkgJson)['preinstall'];
  const main = pkgJson && JSON.parse(pkgJson)['main'];
  if (!preinstall) return main;
  const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';
  spawn(
    npmCmd,
    ['i'],
    {
      env: process.env,
      cwd: dirPath,
      stdio: 'inherit'
    });
  return main;
}

module.exports = {
  getMultipleEntries
}

