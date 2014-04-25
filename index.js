
var http = require('http');
var https = require('https');
var express = require('express');

function Pinocchio(list) {
  
  // list expected to be:
  //  1. method: get/post/..., path: ...
  var self = this;
  this.app = express();

  // fulling test cases
  if (!list) {
    this.app.get('/', fakeResponse);
  } else {
    list.forEach(function(tc) {
      self.app[tc.method.toLowerCase()](tc.path.toLowerCase(), fakeResponse);
    });
  }

  function fakeResponse(req, res, next) {
    res.end(self.status, self.body);
  }
}

Pinocchio.prototype.setResponse = function(statusCode) {
  this.body = 'Just for debug';
  this.statusCode = statusCode;
}

Pinocchio.prototype.listen = function(port, callback) {
  this.server = http.createServer(this.app);
  this.server.listen(port, callback);
}

Pinocchio.prototype.shutdown = function() {
  this.server.close();
}

module.exports = Pinocchio;