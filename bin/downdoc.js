#!/usr/bin/env node
var path = require('path')

var compose = require('lodash.compose')
var async = require('control.async')(require('data.task'))
var remove = async.liftNode(require('fs-extra').remove)

var error = function (message) {
  console.log('\n' + 'ERROR: ' + message)
  usage()
  process.exit(1)
} 

var usage = function () {
  console.log([
    '\nUsage: downdoc [OPTION] [SRC_DIR] [OUT_DIR]\n\n',
    '  -t --template      A local or npm module\n'
  ].join(''))
}

var argv = require('minimist')(process.argv.slice(2))
var folder = argv._[0]
var out = argv._[1]
var help = argv.help || argv.h
var plugin = argv.template || argv.t


if (help) { usage(); process.exit(0) }
if (!folder) error('Please provide a source folder.')
if (!out) error('Please provide an out folder.')


var write = require('../src/write')
var parse = require('../src/parse')
var read = require('../src/read')

var createDocs = require('../lib/downdoc')

if (plugin) {
  try {
    createDocs = require(plugin)
  } catch (e) {
    createDocs = require(path.resolve(plugin))
  }
}

var jsFile = function (filepath) {
  return filepath.match(/(.+)\.js$/)
}

/**
 * - Remove the docs folder
 * - Read files and create docs
 * - Write to docs folder
 */
remove(path.resolve(out))
  .chain(function () {
    return read(jsFile, folder).map(function (files) {
      return files.map(parse).map(createDocs)
    })
  })
  .chain(function (files) {
    return write(out, files)
  })
  .fork(
    function (e) {throw e},
    function () {
      console.log(
        '\nDocumentation has been written to `' + path.resolve(out) + '`\n')
    }
  )
