"use strict";

var delay = require("reducers/delay")
var concat = require("reducers/concat")
var server = require('../server')

// Try by running:
// curl http://localhost:8080/

var app = server(function hanler(request) {
  var head = { statusCode: 200, headers: { 'ContentType': 'text/plain' } }
  var body = delay(["hello\n", "world"], 500)

  return concat(head, body)
})
module.exports = app

if (require.main === module) app(8080)

