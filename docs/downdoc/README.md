## `defaultExport :: VinyFile -> ()`

Create markdown docs from a VinylFile AST
 
```js
var map = require('map-stream')
var parse = require('downdocsrcparse')
var downdoc = require('downdoc')
 
fs.src('src.js')
  .pipe(map(parse))
  .pipe(map(downdoc))
```
 
 