const parser = require('@babel/parser');

// 分离出源码的template部分
const getTemplateAst = function (source) {
  const reg = /\<(template|page)\>[\s\S]*\<\/(template|page)\>/;
  const template = splitSourceCode(source, reg);
  return parserToAst(template);
};

// 分离出源码的script部分
const getScriptAst = function (source) {
  const reg = /(\<script)\>[\s\S]*\<\/script\>/;
  const script = splitSourceCode(source, reg);
  return parserToAst(script);
};

// 分离出源码的style部分
const getStyleAst = function (source) {
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

module.exports = {
  getTemplateAst,
  getScriptAst,
  getStyleAst
}