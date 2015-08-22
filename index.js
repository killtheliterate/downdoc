var path     = require('path')
var map      = require('map-stream')
var comments = require('acorn-extract-comments')
var extend   = require('xtend')

var extract = function (string) {
  return comments(string, {sourceType: 'module'}).comments
    .filter(function (comment) {
      return comment.after.match(/export/)
    })
    .map(function (comment) {
      var afterParts = comment.after
        .split(' ')
        .slice(0,3)
      var name = 'module'
      var exportsName = afterParts[0].match(/exports\.\S+/)

      if (exportsName) { name = exportsName[0].split('.')[1] }

      else if (
        afterParts[0] === 'export' &&
        afterParts[1] !== 'default'
      ) { name = afterParts[2] }

      return extend(comment, {
        name: name
      })
    })
    .map(function (comment) {
      return comment.value.split('\n')
        .map(function (line) {return line.slice(2)})
        .reduce(function (doc, line) {
          var tagRegex = /^@\S+/
          var tag = line.trim().match(tagRegex)
          if (tag) { 
            var name = tag[0].replace('@', '')
            doc.tags[name] = line.trim().replace(tagRegex, '').trim()
          } else {
            doc.content = doc.content + line + '\n'
          }
          return doc
        }, extend(comment, {content: '', tags: {}}))
    })
    .map(function (comment) {
      return extend(comment, {
        content: comment.content.trim()
      })
    })
}

/**
 * @summary Docs -> String 
 */
var template = function (docs) {
  return docs.map(function (doc) {
    return '## `' + doc.name + ' :: ' + doc.tags.summary + '`' +
      '\n\n' + doc.content + '\n'
  }).join('\n').trim()
}

var md = function (p) {
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
 * Pipe a stream of vinyl files to this to get them turned into markdown docs.
 *
 * ```js
 * var vinyl = require('vinyl-fs')
 * var map = require('map-stream')
 * var downdoc = require('downdoc')
 *
 * vinyl.src('src/*.js')
 *   .pipe(downdoc())
 *   .pipe(vinyl.dest('docs'))
 * ```
 *
 * @summary () -> Stream Vinyl -> Stream Vinyl
 */
module.exports = function () {
  return map(function (file, cb) {
    file.path = md(file.path)
    file.contents = new Buffer(
      template(extract(String(file.contents), {sourceType: 'module'}))
    )
    cb(null, file)
  })
}
