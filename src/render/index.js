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
  return '## ' + doc.name + ' :: ' + doc.signature + '\n' + doc.comment
}

var parseComment = function (comment) {

  var isTag = function (line) {
    return first(first(line.split(' ')).split('')) === '@'
  }
  var isNotTag = function (line) {
    return first(first(line.split(' ')).split('')) !== '@'
  }

  var body = comment
    .split('\n')
    .filter(isNotTag)
    .join('\n')

  var tags = comment
    .split('\n')
    .filter(isTag)
    .reduce(function (map, line) {
      var content = line.split(' ').slice(1).join(' ')
      var tag = line.split(' ')[0].replace('@', '')
      map[tag] = content
      return map 
    }, {})

  return {body: body, tags: tags}
}

/**
 *
 * A doc looks like this:
 *  
 * ```js
 * {
 *   name: '', // Exported Variable Name
 *   comment: '', // The leading comment
 *   signature: '' // the type signature of the function
 * }
 * ```
 *
 * @summary ASTNode -> Doc
 */
var generateDoc = function (node) { 
   var comment = parseComment(first(node.leadingComments
     .filter(function (comment) { return comment.type === 'Block' })
     .map(function (comment) { return comment.value })
     .map(cleanComment)))
   console.log(comment.tags.summary)
   return {
     name: first(node.declaration.declarations
       .map(function (n) { return n.id.name })),
     comment:  comment.body,
     signature: comment.tags.summary
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
