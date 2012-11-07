"use strict";

var delay = require("reducers/delay")
var concat = require("reducers/concat")
var server = require('../server')

var app = server(function hanler(request) {
  var head = {
    statusCode: 200,
    head: { 'ContentType': 'text/plain' },
  }
  var body = delay(["hello\n", "world"], 500)

  return concat(head, body)
})
module.exports = app

if (require.main === module) app(8080)

