/**
 * A streaming documentation generator for JS.
 *
 * @example
 *   // Easy mode
 *   import downdoc from 'downdoc'
 *   downdoc('docs/', 'src/*.js') // creates .md docs in `docs/`
 *
 * @example
 *   // DIY
 *   import {
 *     read,
 *     parse
 *   } from 'downdoc'
 *
 *   parse(read('src/*.js'))
 *     .pipe(doStuffWithParsedComments())
 *
 * @module downdoc
 */
import read from './read'
import parse from './parse'
import render from './render'
import overwrite from './overwrite'

export {
  read,
  parse,
  render,
  overwrite,
}

/**
 * Replaces the given folder with the generated docs for the files matched by
 * the given glob.
 *
 * @summary String -> (String -> Effect[IO])
 */
export default folder => flow(
  read,
  parse,
  render,
  overwrite(folder)
)
