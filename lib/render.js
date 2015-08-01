/**
 * Fills in markdown template given a stream of doc comments.
 *
 * TODO:
 *   Allow providing of template.
 *
 * @summary Stream[AST] -> Stream[Map[String, Buffer]]
 */
export default stream => stream
  .pipe(through((chunk, enc, cb) => {
    // TODO
    console.log('render', chunk)

    cb(null, chunk)
  }))

