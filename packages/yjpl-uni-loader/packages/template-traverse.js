const traverse = require('@babel/traverse');
const types = require('@babel/types');
const generator = require('@babel/generator');

// 对template的ast节点进行递归遍历并修改
const traverseTemplate = function (ast) {
  traverse.default(ast, {
    // 所有节点
    enter(path) {
      const { node } = path;
      /**
       * 判断是否是div节点
       * 将div节点修改成view节点
       */
      const isDiv = types.isJSXIdentifier(node) && node.name === 'div';
      if (isDiv) {
        node.name = 'view';
      }
      const isImg = types.isJSXIdentifier(node) && node.name === 'img';
      if (isImg) {
        node.name = 'image';
      }
    }
  });
  return generatorSource(ast);
}

// 对script的ast节点进行递归遍历并修改
const traverseScript = function (ast) {
  traverse.default(ast, {});
  return generatorSource(ast);
}

// 对style的ast节点进行递归遍历并修改
const traverseStyle = function (ast) {
  traverse.default(ast, {});
  return generatorSource(ast);
}

// 根据修改过后的ast生成新的代码
const generatorSource = function(ast) {
  const { code } = generator.default(ast, {});
  // 去除结尾的分号(@babel/generator在转译的过程中自动添加的)
  return code.replace(/;$/, '');
}

// 将新的template、script、style写到一起
const combineSourceCode = function (...args) {
  return args.join('\n');
}

module.exports = {
  traverseTemplate,
  traverseScript,
  traverseStyle,
  combineSourceCode
}