"use strict";

var server = require('../server')

var app = server(function hanler(request) {
  return [
    {
      statusCode: 200,
      head: { 'ContentType': 'text/plain' }
    },
    "hello world"
  ]
})
module.exports = app

if (require.main === module) app(8080)
