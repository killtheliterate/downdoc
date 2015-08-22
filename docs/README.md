## `module :: () -> Stream Vinyl -> Stream Vinyl`

Pipe a stream of vinyl files to this to get them turned into markdown docs.

 ```js
 var vinyl = require('vinyl-fs')
 var map = require('map-stream')
 var downdoc = require('downdoc')

 vinyl.src('src/*.js')
   .pipe(downdoc())
   .pipe(vinyl.dest('docs'))
 ```