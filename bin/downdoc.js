#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))

var fs = require('io.filesystem')(require('fs'))
var Task = require('data.task')
var async = require('control.async')(Task)

var ensureDir = async.liftNode(require('fs-extra').ensureDir)

var cwd = process.cwd()
var folder = argv._[0]
var out = cwd + '/' + argv._[1]

var doc = require('..')

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
    content: doc(file.content),
  }
}

fs.listDirectoryRecursively(cwd + '/' + folder)
  .chain(function (files) { return async.parallel(files.map(read)) })
  .map(function (files) { return files.map(parse) })
  .chain(function (files) {
    return async.parallel(files.map(function (file) {
      return write({
        path: out + file.path.replace('.js', '.md'),
        content: file.content
      })
    }))
  })
  .fork(
    function (e) {throw e},
    function (x) {
      console.log('Documentation has been generated.')
    }
  )
