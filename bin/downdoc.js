#!/usr/bin/env node
var fs      = require('vinyl-fs')
var extend  = require('xtend')
var rimraf  = require('rimraf')
var resolve = require('path').resolve

var error = function (message) {
  console.log('\n' + 'ERROR: ' + message)
  usage()
  process.exit(1)
} 

var usage = function () {
  console.log([
    '\nUsage: downdoc [GLOB] [OUT_DIR]\n',
  ].join(''))
}

var argv = require('minimist')(process.argv.slice(2))
var glob = argv._[0]
var out  = argv._[1]
var help = argv.help || argv.h


if (help) { usage(); process.exit(0) }
if (!glob) error('Please provide a source folder.')
if (!out) error('Please provide an out folder.')

var downdoc = require('..')

rimraf(resolve(out), function (e) {
  if (e) throw e
  fs.src(glob)
    .pipe(downdoc())
    .pipe(fs.dest(out))
    .on('end', function () {
      console.log(
        '\nDocumentation has been written to `' + resolve(out) + '`\n')
    })
})
