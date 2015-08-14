/**
 * TODO:
 *
 * Walk a folder and get all the files and their contents.
 *
 * ```
 * src
 *   |- parse
 *     |- helper.js
 *     |- index.js
 *   |- render
 *     |- index.js
 * ```
 *
 * ```js
 * files('src') === [
 *                    'parse/helper.js',
 *                    'parse/index.js',
 *                    'render/index.js',
 *                  ]
 * ```
 *
 * @summary String -> Array String 
 */
module.export = function (folder) {
  /**
   * FIXME:
   *   This is WIP code. It doesn't work yet.
   */
  function getFiles (dir) {
    return fs.listDirectory(dir)
      .chain(function (path) {
         return fs.isDirectory(path)
           .map(function (isDir) {
             if (!isDir) return path
             return getJSFiles(path)
           })
      })
  }
  
  fs.isDirectory(folder)
    .map(function (isDir) {
      if (!isDir) throw new Error('Please provide a folder to downdoc-cli')
      return folder
    })
    .chain(getFiles)
}
