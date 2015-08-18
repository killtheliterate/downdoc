#!/usr/bin/env node

var compose = require('lodash.compose')
var async = require('control.async')(require('data.task'))
var remove = async.liftNode(require('fs-extra').remove)

var argv = require('minimist')(process.argv.slice(2))
var folder = argv._[0]
var out = argv._[1]
var plugin = argv.template || argv.t || '../lib/downdoc'

var write = require('../src/write')
var parse = require('../src/parse')
var read = require('../src/read')

var createDocs = require(plugin)

var jsFile = function (file) {
  return file.path.match(/(.+)\.js$/)
}

/**
 * - Remove the docs folder
 * - Read files and create docs
 * - Write to docs folder
 */
remove(process.cwd() + '/' + out)
  .chain(function () {
    return read(jsFile, folder).map(function (files) {
      return files.map(parse).map(createDocs)
    })
  })
  .chain(write(out))
  .fork(
    function (e) {throw e},
    function (x) {
      console.log('Documentation has been generated!')
    }
  )
