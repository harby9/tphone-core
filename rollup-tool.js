const { resolve } = require('path');
const fse = require('fs-extra');
const { spawn } = require('child_process');
const os = require('os');

// 从package-original.json里读取信息重置package.json
function resetPkgJson () {
  const rootOriginalPkg = getPkgJson(__dirname, 'package-original.json');
  const rootOriginalPkgJsonStr = JSON.stringify(rootOriginalPkg, null, 2);
  fse.writeFileSync(resolve(__dirname, 'package.json'), rootOriginalPkgJsonStr);
}
/**
 * 通过文件路径，获取里面包的信息
 * @param {*} sourcePath 文件夹路径
 * @returns {
 *  dirPath: 文件夹路径
 *  pkgJson: package.json对象
 * }
 */
function getDirPathAndPkgJson (sourcePath) {
  rootPkg = getPkgJson(__dirname);
  // 获取打包前源码文件夹
  const sources = fse.readdirSync(sourcePath);
  // 多入口对象
  const multipleEntries = [];
  for (let i = 0; i < sources.length; i++) {
    const dirName = sources[i];
    if (dirName === 'types') continue;
    const dirPath = resolve(sourcePath, dirName);
    const stat = fse.lstatSync(dirPath);
    const isDirectory = stat.isDirectory(stat);
    // 过滤非文件夹
    if (!isDirectory) continue;
    // 过滤空文件夹
    if (fse.readdirSync(dirPath).length === 0) continue;
    const pkgJson = getPkgJson(dirPath);
    multipleEntries.push({
      dirName,
      dirPath,
      pkgJson
    });
  }
  return multipleEntries;
}

// 根据dirPath包路径，获取其下的package.json
function getPkgJson (dirPath, pkgName = 'package.json') {
  const pkgPath = resolve(dirPath, pkgName);
  const isExitPkg = fse.existsSync(pkgPath);
  if (!isExitPkg) return {};
  const pkgJson = fse.readFileSync(pkgPath, 'utf-8');
  return pkgJson && JSON.parse(pkgJson);
}

/**
 * 合并分包里的package.json依赖到主package.json
 * @param {*} packagesInfo 
 */
function mergeFinalPkg (packagesInfo) {
  const rootPkg = getPkgJson(__dirname, 'package-original.json');
  let mergeDevDependencies = rootPkg.devDependencies || {};
  let mergeDependencies = rootPkg.dependencies || {};
  let mergePeerDependencies = rootPkg.peerDependencies || {};
  packagesInfo.map(info => {
    const { pkgJson } = info;
    const { devDependencies, dependencies, peerDependencies } = pkgJson || {};
    mergeDevDependencies = { ...mergeDevDependencies, ...devDependencies };
    mergeDependencies = { ...mergeDependencies, ...dependencies };
    mergePeerDependencies = { ...mergePeerDependencies, ...peerDependencies };
  });
  rootPkg.devDependencies = mergeDevDependencies;
  rootPkg.dependencies = mergeDependencies;
  rootPkg.peerDependencies = mergePeerDependencies;
  // json对象转回json
  const rootPkgJsonStr = JSON.stringify(rootPkg, null, 2);
  fse.writeFileSync(resolve(__dirname, 'package.json'), rootPkgJsonStr);
}

/**
 * 通过pnpm安装依赖
 * @param {*} dirPath 执行路径
 * @returns main入口路径
 */
function pnpmInstall (dirPath) {
  const npmCmd = os.platform().startsWith('win') ? 'pnpm.cmd' : 'pnpm';
  spawn(
    npmCmd,
    ['i'],
    {
      env: process.env,
      cwd: dirPath || __dirname,
      stdio: 'inherit'
    });
}
/**
 * 删除文件夹
 * node 删除目录下所有文件，不能直接删，要把目录所有文件、子目录清空才能删除
 * @param {*} dirPath 删除路径
 */
function deletDir (dirPath) {
  console.log('pppppp', dirPath);
  if (!fse.existsSync(dirPath)) return;
  files = fse.readdirSync(dirPath);
  files.map(file => {
    const curPath = `${dirPath}/${file}`;
    if (fse.statSync(curPath).isDirectory()) {
      // 递归删除文件夹
      deletDir(curPath);
    } else {
      // 删除文件
      fse.unlinkSync(curPath);
    }
  });
  // 删除当前空文件夹
  fse.rmdirSync(dirPath)
}

module.exports = {
  resetPkgJson,
  getDirPathAndPkgJson,
  mergeFinalPkg,
  pnpmInstall,
  deletDir
}

