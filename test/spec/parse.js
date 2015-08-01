import test from 'tape'
import { read } from '../../'
import map from 'map-stream'
import { resolve } from 'path'
import {
  pipe,
} from 'ramda'

test('read', t => {
  const expectedFileNames = [
    'downdoc.js',
    'overwrite.js',
    'parse.js',
    'read.js',
    'render.js',
  ]

  t.plan(expectedFileNames.length)

  const fileGlob = resolve(__dirname, '../../lib/**/*.js')

  const readAndParse = pipe(read, parse)
})
