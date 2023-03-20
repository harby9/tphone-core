'use strict';

var require$$0 = require('@babel/parser');
var require$$0$1 = require('@babel/traverse');
var require$$1 = require('@babel/types');
var require$$2 = require('@babel/generator');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);

const parser = require$$0__default["default"];

// 分离出源码的template部分
const getTemplateAst$1 = function (source) {
  const reg = /\<(template|page)\>[\s\S]*\<\/(template|page)\>/;
  const template = splitSourceCode(source, reg);
  return parserToAst(template);
};

// 分离出源码的script部分
const getScriptAst$1 = function (source) {
  const reg = /(\<script)\>[\s\S]*\<\/script\>/;
  const script = splitSourceCode(source, reg);
  return parserToAst(script);
};

// 分离出源码的style部分
const getStyleAst$1 = function (source) {
  const reg = /(\<style)\>[\s\S]*\<\/style\>/;
  const style = splitSourceCode(source, reg);
  return parserToAst(style);
};
/**
 * 分割源码
 * 分离出来template、script、style
 * @param {*} source 源码
 * @param {*} reg 分割规则
 */
function splitSourceCode(source, reg) {
  const __source = source.match(reg);
  const part = __source && __source[0] ? __source[0] : source;
  return part;
}

/**
 * 源码转成ast结构
 * @param {*} source 源码
 * @returns 转换后的ast
 */
function parserToAst(source) {
  const ast = parser.parse(source, {
    plugins: ['jsx', 'typescript']
  });
  return ast;
}

var templateParser = {
  getTemplateAst: getTemplateAst$1,
  getScriptAst: getScriptAst$1,
  getStyleAst: getStyleAst$1
};

const traverse = require$$0__default$1["default"];
const types = require$$1__default["default"];
const generator = require$$2__default["default"];

// 对template的ast节点进行递归遍历并修改
const traverseTemplate$1 = function (ast) {
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
};

// 对script的ast节点进行递归遍历并修改
const traverseScript$1 = function (ast) {
  traverse.default(ast, {});
  return generatorSource(ast);
};

// 对style的ast节点进行递归遍历并修改
const traverseStyle$1 = function (ast) {
  traverse.default(ast, {});
  return generatorSource(ast);
};

// 根据修改过后的ast生成新的代码
const generatorSource = function(ast) {
  const { code } = generator.default(ast, {});
  // 去除结尾的分号(@babel/generator在转译的过程中自动添加的)
  return code.replace(/;$/, '');
};

// 将新的template、script、style写到一起
const combineSourceCode$1 = function (...args) {
  return args.join('\n');
};

var templateTraverse = {
  traverseTemplate: traverseTemplate$1,
  traverseScript: traverseScript$1,
  traverseStyle: traverseStyle$1,
  combineSourceCode: combineSourceCode$1
};

/**
 * 同步：this.callback(null, transformContent)
 * 第一个参数，表明有无错误，没有就传一个null
 * 第二个参数，最终要暴露出去的内容
 * 
 * 异步：this.async()
 * 放在异步loader方法中，loader会卡在异步方法里，不往后传递，直到主动去调用this.async()
 * loader卡住不动时，其他进程操作可以照旧
 */

const { getTemplateAst, getScriptAst, getStyleAst } = templateParser;
const { traverseTemplate, traverseScript, traverseStyle, combineSourceCode } = templateTraverse;

var packages = function (content, map, meta) {
  // 获取template、script、style部分的ast
  const templateAst = getTemplateAst(content);
  const scriptAst = getScriptAst(content);
  const styleAst = getStyleAst(content);
  // 对ast节点进行修改后，转回字符串返回
  const newTemplate = traverseTemplate(templateAst);
  const newScript = traverseScript(scriptAst);
  const newStyle = traverseStyle(styleAst);
  // 将新的template、script、style写到一起
  const finalCode = combineSourceCode(newTemplate, newScript, newStyle);


  this.callback(null, finalCode);
};

module.exports = packages;
