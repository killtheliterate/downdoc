var espree = require('espree')
var extend = require('xtend')

/**
 * Parse file contents into an AST. ES2015 options enabled.
 *
 * @summary File -> File
 */
module.exports = function (file) {
  return extend(file, {
    ast: espree.parse(file.content, {
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
    })
  })
}
