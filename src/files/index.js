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
 * files('src') // ~=> [
 *                       {path: 'parse/helper.js', content: ''},
 *                       {path: 'parse/index.js', content: ''},
 *                       {path: 'render/index.js', content: ''},
 *                     ]
 * ```
 *
 * @summary String -> Array Object
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
