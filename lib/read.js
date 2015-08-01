import fs from 'vinyl-fs'

/**
 * Streams in all the files matched by a given glob.
 *
 * @summary Glob -> Stream[Buffer]
 */
export default fs.src
