var fs = require('io.filesystem')(require('fs'))
var parse = require('./src/parse')
var render = require('./src/render')

/**
 * Reads a JS file from the FS, parses it and returns a markdown doc.
 *
 * @summary String -> Markdown
 */
module.exports = function (file) {
  return render(parse(file)) //file.map(parse).map(render)
}
