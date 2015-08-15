var curry = require('core.lambda').curry

/**
 * Create a document string from an AST.
 *
 * @summary (AST -> Object) -> (Object -> String) -> AST -> String
 */
module.exports = curry(3, function (pluckAST, template, ast) {
  return pluckAST(ast).map(template)
})
