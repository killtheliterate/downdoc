/**
 * Replaces the given folder with the files in the stream.
 *
 * @summary String -> (Stream[Map[String, Buffer]] -> Effect[IO])
 */
export const overwrite = folder => stream => stream
  .pipe(through((chunk, enc, cb) => {
    // TODO
    console.log('writing to')

    cb(null, chunk)
  }))
