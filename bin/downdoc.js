#!/usr/bin/env node

var doc = require('..')
var argv = require('minimist')(process.argv.slice(2))
var fs = require('io.filesystem')(require('fs'))

var cwd = process.cwd()
var folder = cwd + '/' + argv._[0].replace(/\//g, '')

function getJSFiles (dir) {
  return fs.listDirectory(dir)
    .chain(function (path) {
       return fs.isDirectory(path)
         .map(function (isDir) {
           if (!isDir) return path
           return getJSFiles(path)
         })
    })
}

fs.isDirectory(folder)
  .map(function (isDir) {
    if (!isDir) throw new Error('Please provide a folder to downdoc-cli')
    return folder
  })
  .chain(getJSFiles)
  .fork(
    function (e) {throw e},
    function (bool) {console.log(bool)}
  )
