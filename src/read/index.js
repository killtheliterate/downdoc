var path = require('path')

var fs = require('io.filesystem')(require('fs'))
var Task = require('data.task')
var async = require('control.async')(Task)
var curry = require('core.lambda').curry

var listDirectoryRecursively = fs.listDirectoryRecursively
var readAsText = fs.readAsText
var cwd = process.cwd()

/**
 * Reads in a file whilst stripping the path down to the root given.
 *
 * Given `project` as root:
 * /Users/talon/project/file.js -> /file.js
 *
 * @summary String -> String -> File
 */
var readWithRoot = function (folder) {
  return function (file) {
    return new Task(function (reject, resolve) {
      readAsText(file).fork(reject, function (content) {
        var filepath = file
          .replace(new RegExp('(.+)/' + folder), '')
        resolve({
          path: filepath,
          content: content,
        })
      })
    })
  }
}

/**
 * Reads all the files in a folder that match the predicate and turns them into
 * an array of file objects.
 *
 * file objects look like:
 * ```
 * {
 *   path :: String,
 *   content :: String,
 *   ast: :: Object,
 *   doclet :: a 
 * }
 * ```
 *
 * @summary (File -> Bool) -> String -> IO (Array File)
 */
module.exports = curry(2, function (predicate, folder) {
  return listDirectoryRecursively(path.resolve(folder))
    .chain(function (files) {
      return async.parallel(files.map(readWithRoot(folder)))
    })
    .map(function (files) {
      return files.filter(predicate)
    })
})
