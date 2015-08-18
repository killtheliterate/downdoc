var path = require('path')

var fs = require('io.filesystem')(require('fs'))
var async = require('control.async')(require('data.task'))
var curry = require('core.lambda').curry

var listDirectoryRecursively = fs.listDirectoryRecursively
var readAsText = fs.readAsText

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
    return readAsText(file).map(function (content) {
      return {
        path: file.replace(new RegExp('(.+)/' + folder), ''),
        content: content,
      }
    })
  }
}

/**
 * Reads all the files in a folder that match the predicate and turns them into
 * an array of file objects.
 *
 * file objects look like:
 *
 * ```
 * {
 *   path :: String,
 *   content :: String,
 * }
 * ```
 *
 * @summary (String -> Bool) -> String -> IO (Array File)
 */
module.exports = curry(2, function (predicate, folder) {
  return listDirectoryRecursively(path.resolve(folder))
    .map(function (files) {
      return files.filter(predicate)
    })
    .chain(function (files) {
      return async.parallel(files.map(readWithRoot(folder)))
    })
})
