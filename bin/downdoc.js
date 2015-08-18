#!/usr/bin/env node
var fs = require('vinyl-fs')
var map = require('map-stream')
var extend = require('xtend')

var error = function (message) {
  console.log('\n' + 'ERROR: ' + message)
  usage()
  process.exit(1)
} 

var usage = function () {
  console.log([
    '\nUsage: downdoc [GLOB] [OUT_DIR]\n',
    //'  -t --template      A local or npm module\n'
  ].join(''))
}

var argv = require('minimist')(process.argv.slice(2))
var glob = argv._[0]
var out = argv._[1]
var help = argv.help || argv.h


if (help) { usage(); process.exit(0) }
if (!glob) error('Please provide a source folder.')
if (!out) error('Please provide an out folder.')


var parse = require('../src/parse')
var transform = require('../src/downdoc')

fs.src(glob)
  .pipe(map(function (file, cb) {
    cb(null, extend(file, {
      path: file.history[0]
    }))
  }))
  .pipe(map(parse))
  .pipe(map(transform))
  .pipe(map(function (file, cb) {
    console.log(typeof file.path)
    cb(null, file)
  }))
  .pipe(fs.dest(out))
