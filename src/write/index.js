var fs = require('io.filesystem')(require('fs'))
var Task = require('data.task')
var async = require('control.async')(Task)
var ensureDir = async.liftNode(require('fs-extra').ensureDir)

/**
 * Takes a `doccer` or documentation creating function (typically a composition
 * of `parse` and `render`, a folder to document and a path to write the docs
 * and does it.
 *
 * TODO:
 *   Refactor! This file feels dirty. The signature seems okay though
 *
 * @summary (Doc -> String) -> String -> String -> Future Error Void
 */
module.exports = function (doccer, ext, folder, out) {
  var cwd = process.cwd()

  var write = function (file) {
    var directory = file.path
      .replace(cwd, '')
      .replace(file.path.split('/').slice(-1), '')
  
    return ensureDir(cwd + directory)
      .chain(function () {
        return fs.writeAsText(file.path, file.content)
      })
  }
  
  var read = function (file) {
    return new Task(function (reject, resolve) {
      fs.readAsText(file).fork(reject, function (content) {
        resolve({
          path: file.replace(cwd, '').replace('/' + folder, ''),
          content: content,
        })
      })
    })
  }
  
  var parse = function (file) {
    return {
      path: file.path,
      content: doccer(file.content),
    }
  }

  return fs.listDirectoryRecursively(cwd + '/' + folder)
    .chain(function (files) { return async.parallel(files.map(read)) })
    .map(function (files) { return files.map(parse) })
    .chain(function (files) {
      return async.parallel(files.map(function (file) {
        return write({
          path: out + file.path.replace('.js', ext),
          content: file.content
        })
      }))
    })
}
