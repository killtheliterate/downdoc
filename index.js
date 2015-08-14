var fs = require('io.filesystem')(require('fs'))
var parse = require('./src/parse')
var render = require('./src/render')

var first = function (array) { return array[0] }

/**
 * Create a markdown string from a files AST
 *
 * @summary AST -> Markdown
 */
module.exports = function (file) {
  return fs.readAsText(file)
    .map(parse)
    .map(render)
}
