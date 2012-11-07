"use strict";

// Import reducers implementation for node streams.
require("stream-reduce")

var curry = require("functional").curry
var http = require("http")
var concat = require("reducers/concat")
var hub = require("reducers/hub")
var accumulate = require("reducers/accumulate")
var end = require("reducers/end")
var isError = require("reducers/is-error")


function input(raw) {
  /**
  Takes raw http [ServerRequest] and produces reducible request that has
  a following shape:

      < head body body body >

  Where head an objects like:

      { url: "/", method: "GET", headers: { ... } }

  And bodies are just buffers of chunks delivered.

  [ServerRequest]:http://nodejs.org/api/http.html#http_class_http_serverrequest
  **/

  // Note we wrap first raw into array so that raw request is treated as a
  // `head` element and concat that with `raw` which is instance of node stream
  // that reducers can reduce to `body` chunks. Also multicast result to share
  // reads across consumers.
  return hub(concat([raw], raw))
}

module.exports = curry(function server(handler, port) {
  var raw = http.createServer()
  raw.on("request", function onRequest(request, response) {
    var output = handler(input(request))
    // TODO: Implement back pressure. We will need to implement back pressure
    // in a similar way to "fs-reduce".

    accumulate(output, function(value, isHead) {
      if (value === end) {
        response.end()
      } else if (isHead) {
        response.writeHead(value.statusCode, value.headers || {})
        isHead = false
      } else if (isError(value)) {
        // Errors should be handled before returning an output!
        response.statusCode = 500
        response.end()
      } else {
        response.write(value)
      }
      return isHead
    }, true)
  })

  raw.listen(port)
})
