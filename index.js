var espree = require('espree')
var fs = require('io.filesystem')(require('fs'))

var parse = function (file) { return espree.parse(file, {
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

var first = function (array) { return array[0] }

/**
 * @summary String -> String
 */
module.exports = function (file) {
  var out = out || 'docs'
  out.replace(/\//g, '')

  return fs.readAsText(file)
    .map(parse)
    .map(function (ast) {
      return ast.body
        .filter(function (node) {
          return node.type === 'ExportNamedDeclaration'
        })
        .map(function (node) { 
           return {
             path: file.replace(process.cwd(), ''),
             name: first(node.declaration.declarations
               .map(function (n) { return n.id.name })),
             comment: first(node.leadingComments
               .filter(function (comment) { return comment.type === 'Block' })
               .map(function (comment) { return comment.value })
               .map(function (comment) {
                 return comment
                   .replace(/\*/g, '')
                   .replace(/\//g, '')
                   .split('\n')
                   .map(function (line) { return line.replace('  ', '') })
                   .join('\n')
               }))
          }
        })
    })
    .map(function (docs) {
      return docs.map(function (doc) {
        return '## ' + doc.name + '\n\n' + doc.comment + '\n\n'
      })
    })
}
