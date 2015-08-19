## `defaultExport :: VinyFile -> ()`

Create downdocs docs stream from an AST stream
 
```js
var map = require('map-stream')
var downdoc = require('downdoc')
var parse = require('downdocutilparse')
 
fs.src('src.js')
  .pipe(map(parse))
  .pipe(map(downdoc))
  .pipe(fs.dest('docs'))
```
 
 