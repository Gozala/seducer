"use strict";

var delay = require("reducers/delay")
var concat = require("reducers/concat")
var drop = require("reducers/drop")
var server = require("../server")

// Try by running:
// curl -d "hello world" http://localhost:8080/

var app = server(function hanler(request) {
  var head = { statusCode: 200, headers: { "ContentType": "text/plain" } }
  var body = concat("header\n", drop(request, 1), "\nfooter")

  return concat(head, body)
})
module.exports = app

if (require.main === module) app(8080)
