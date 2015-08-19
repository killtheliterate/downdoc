var espree = require('espree')
var extend = require('xtend')

/**
 * Parse vinyl file contents into an AST.
 *
 * ```js
 * var map = require('map-stream')
 * var parse = require('downdoc/src/parse')
 *
 * fs.src('src/*.js')
 *   .pipe(map(parse))
 * ```
 *
 * ES2015 syntax enabled
 *
 * @summary VinylFile -> () 
 */
module.exports = function (file, cb) {
  file.contents = new Buffer(JSON.stringify(espree.parse(String(file.contents), {
    attachComment: true,
    tolerant: true,
    ecmaFeatures: {
      arrowFunctions: true,
      blockBindings: true,
      destructuring: true,
      regexYFlag: true,
      regexUFlag: true,
      templateStrings: true,
      binaryLiterals: true,
      octalLiterals: true,
      unicodeCodePointEscapes: true,
      defaultParams: true,
      restParams: true,
      forOf: true,
      objectLiteralComputedProperties: true,
      objectLiteralShorthandMethods: true,
      objectLiteralShorthandProperties: true,
      objectLiteralDuplicateProperties: true,
      generators: true,
      spread: true,
      superInFunctions: true,
      classes: true,
      newTarget: false,
      modules: true,
      jsx: true,
      globalReturn: true,
      experimentalObjectRestSpread: true
    }
  })))
  cb(null, file)
}
