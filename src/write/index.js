var path = require('path')

var fs = require('io.filesystem')(require('fs'))
var async = require('control.async')(require('data.task'))
var ensureDir = async.liftNode(require('fs-extra').ensureDir)
var curry = require('core.lambda').curry

var writeAsText = fs.writeAsText

/**
 * Writes the files given in parallel to the provided folder.
 *
 * @summary String -> Array File -> Future Error (IO ())
 */
module.exports = curry(2, function (out, files) {
  return async.parallel(
    files.map(function (file) {
      var filepath = path.resolve(out + file.path)

      var folder = file.path.split('/')
      folder.pop()
      folder = path.resolve(out + folder.join('/'))

      return ensureDir(folder)
        .chain(function () {
          return writeAsText(filepath, file.content)
        })
      })
  )
})
