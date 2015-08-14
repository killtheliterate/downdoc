var espree = require('espree')

/**
 * Parse JavaScript into an AST. ES2015 options enabled.
 *
 * @summary String -> AST
 */
module.exports = function (file) { return espree.parse(file, {
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
})}

