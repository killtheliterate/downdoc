var get = require('lodash.get')
var extend = require('xtend')

var first = function (array) {return array[0]}
var words = function (message) {return message.split(' ')}
var chars = function (message) {return message.split('')}
var trim = function (message) {return message.trim()}

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

var parseComment = function (comment) {

  var isTag = function (line) {
    return first(first(line.split(' ')).split('')) === '@'
  }
  var isNotTag = function (line) {
    return first(first(line.split(' ')).split('')) !== '@'
  }

  var body = comment
    .split('\n')
    .filter(function (line) {return line.length > 0})
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

var isExport = function (node) {
  var objectName = get(node,
    'expression.left.object.name', '')
  return (
    node.type.match(/Export(.+)Declaration/) || 
    (
      node.type.match(/ExpressionStatement/) &&
      objectName.match(/exports|module/)
    )
  )
      
}

/**
 *
 * A doclet looks like this:
 *  
 * ```js
 * {
 *   name: '', // Exported Variable Name
 *   comment: '', // The leading comment
 *   signature: '' // the type signature of the function
 * }
 * ```
 *
 * @summary File -> File 
 */
var pluckAST = function (ast) { 
  return ast.body
    .filter(isExport)
    .filter(function (node) {
      return node.leadingComments
    })
    .map(function (node) {

      var propertyName = get(node,
        'expression.left.property.name', '')

      var name =
        propertyName === 'exports' ? 'defaultExport' : propertyName || 
        first(node.declaration.declarations
          .map(function (n) { return n.id.name }))

      var comment = parseComment(first(node.leadingComments
        .filter(function (comment) { return comment.type === 'Block' })
        .map(function (comment) { return comment.value })
        .map(cleanComment)))

      return {
        name: name,
        comment:  comment.body,
        signature: comment.tags.summary
      }
    })
}

/**
 * @summary Array Doclet -> String 
 */
var template = function (doclets) {
  return doclets.map(function (doclet) {
    return '## ' + doclet.name + ' :: ' + doclet.signature +
      '\n\n' + doclet.comment
  }).join('\n')
}

/**
 * @summary String -> String
 */
var docPath = function (path) {
  var ext = '.md' 

  var parts = path.split('/')
  var fileParts = parts.pop().split('.')
  var name = fileParts[0]

  if (name.match(/^index/)) name = 'README' 

  var newFileName = name + ext

  return parts.concat([newFileName]).join('/')
}

module.exports = function (file) {
  return extend(file, {
    path: docPath(file.path),
    content: template(pluckAST(file.ast))
  })
}
