#!/usr/bin/env node
var compose = require('core.lambda').compose

var argv = require('minimist')(process.argv.slice(2))

var folder = argv._[0]
var out = process.cwd() + '/' + argv._[1]

var write = require('../src/write')
var parse = require('../src/parse')
var render = require('../src/render')

write(compose(render, parse), folder, out)
  .fork(
    function (e) {throw e},
    function (x) {
      console.log('Documentation has been generated.')
    }
  )
