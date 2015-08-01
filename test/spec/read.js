import test from 'tape'
import { read } from '../../'
import map from 'map-stream'
import { resolve } from 'path'
import {
  contains,
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

  read(fileGlob)
    .pipe(map((file, cb) => {
      const fileName = file.path.replace(file.base, '')

      t.ok(contains(fileName, expectedFileNames), 'reads in expected file')
    }))
})
