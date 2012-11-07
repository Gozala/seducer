"use strict";

var server = require('../server')

// Try by running:
// curl -d http://localhost:8080/

var app = server(function hanler(request) {
  var head = { statusCode: 200, headers: { 'ContentType': 'text/plain' } }
  return [ head, "hello world" ]
})
module.exports = app

if (require.main === module) app(8080)
