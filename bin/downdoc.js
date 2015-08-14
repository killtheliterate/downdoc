#!/usr/bin/env node

var doc = require('..')
var argv = require('minimist')(process.argv.slice(2))
var fs = require('io.filesystem')(require('fs'))

var cwd = process.cwd()

var folder = cwd + '/' + argv._[0]
var out = cwd + '/' + argv._[1]

/**
 * TODO:
 *   Parallelize the process of reading/writing the JS files to markdown docs. 
 */
fs.listDirectoryRecursively(folder)
  .map(function (filePath) {
    return {
      path: out + '/' + filePath,
      content: doc(cwd + '/' + folder + '/' + filePath) 
    }
  })
  .map(/* Write to doc folder */)
  .fork(
    function (e) {throw e},
    function (x) {console.log(x)}
  )
