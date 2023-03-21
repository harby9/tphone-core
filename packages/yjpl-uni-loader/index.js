/**
 * 同步：this.callback(null, transformContent)
 * 第一个参数，表明有无错误，没有就传一个null
 * 第二个参数，最终要暴露出去的内容
 * 
 * 异步：this.async()
 * 放在异步loader方法中，loader会卡在异步方法里，不往后传递，直到主动去调用this.async()
 * loader卡住不动时，其他进程操作可以照旧
 */
const { getTemplateAst, getScriptAst, getStyleAst } = require('./packages/page-parser');
const { traverseTemplate, traverseScript, traverseStyle, combineSourceCode } = require('./packages/page-traverse')

module.exports = function (content, map, meta) {
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
}