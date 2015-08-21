var path    = require('path')
var map     = require('map-stream')
var extract = require('parse-comments')
var extend  = require('xtend')

/**
 * @summary Comments -> String 
 */
var template = function (doclets) {
  return doclets.map(function (doclet) {
    return '## `' + doclet.name + ' :: ' + doclet.summary + '`' +
      '\n\n' + doclet.comment.content + '\n'
  }).join('\n')
}

var pathToMd = function (p) {
  var ext = '.md'
  var parsed = path.parse(p)

  var name = parsed.name === 'index' ? 'README' : parsed.name 

  return path.format(extend(parsed, {
    name: name,
    ext: ext,
    base: name + ext,
  }))
}

/**
 * ```js
 * var map = require('map-stream')
 * var downdoc = require('downdoc')
 * var parse = require('downdoc/util/parse')
 *
 * fs.src('src/*.js')
 *   .pipe(map(downdoc))
 *   .pipe(fs.dest('docs'))
 * ```
 */
module.exports = function () {
  return map(function (file, cb) {
    file.path = pathToMd(file.path)
    file.contents = new Buffer(
      template(extract(String(file.contents)))
    )
    cb(null, file)
  })
}
