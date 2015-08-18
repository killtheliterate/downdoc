var path = require('path')

var fs = require('io.filesystem')(require('fs'))
var Task = require('data.task')
var async = require('control.async')(Task)
var ensureDir = async.liftNode(require('fs-extra').ensureDir)
var curry = require('core.lambda').curry

var writeAsText = fs.writeAsText

/**
 * Writes the files in parallel to the provided folder.
 *
 * @summary String -> Array File -> Future Error (IO ())
 */
module.exports = curry(2, function (out, files) {
  return async.parallel(
    files.map(function (file) {

      var filepath = path.parse(file.path)
      var folder = path.resolve(out + filepath.dir)

      // Don't write empty files/folders
      if (file.content.length <= 0) return Task.of(null)
      return ensureDir(folder)
        .chain(function () {
          return writeAsText(path.resolve(folder, filepath.base), file.content)
        })
      })
  )
})
