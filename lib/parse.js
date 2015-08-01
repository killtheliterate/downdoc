import esprima from 'gulp-esprima'

/**
 * Creates a stream of objects representing the file's comments.
 *
 * @summary Stream[Buffer] -> Stream[Object]
 */
export default stream => stream
  .pipe(esprima())
  .pipe(through((chunk, enc, cb) => {
    // TODO
    console.log('parse', chunk)

    cb(null, chunk)
  }))

