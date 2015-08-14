var first = function (array) { return array[0] }

/**
 * Removes all the JS syntax stuff around a comment block.
 *
 * @summary String -> String
 */
var cleanComment = function (comment) {
  return comment
    .replace(/\*/g, '')
    .replace(/\//g, '')
    .split('\n')
    .map(function (line) { return line.replace('  ', '') })
    .join('\n')
}

/**
 * @summary Doc -> Markdown
 */
var template = function (doc) {
  return '## ' + doc.name + '\n' + doc.comment
}

/**
 * TODO:
 *   Extract `@summary` if it exists as the property `signature`
 *
 * A doc looks like this:
 *  
 * ```js
 * {
 *   name: '', // Exported Variable Name
 *   comment: '', // The leading comment
 *   // signature: 'string' // the type signature of the function
 * }
 * ```
 *
 * @summary ASTNode -> Doc
 */
var generateDoc = function (node) { 
   return {
     name: first(node.declaration.declarations
       .map(function (n) { return n.id.name })),
     comment: first(node.leadingComments
       .filter(function (comment) { return comment.type === 'Block' })
       .map(function (comment) { return comment.value })
       .map(cleanComment))
  }
}

/**
 * Create a markdown string from an AST.
 *
 * @summary AST -> Markdown 
 */
module.exports = function (ast) {
  return ast.body
    .filter(function (node) {
      return node.type === 'ExportNamedDeclaration'
    })
    .map(generateDoc)
    .map(template)
    .join('\n\n')
}
