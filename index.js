
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
      self.app[tc.method.toLowerCase()](tc.path.toLowerCase(), fakeResponse(tc));
    });
  }

  function fakeResponse(context) {
    return function(req, res, next) {
      res.status(tc.status || self.status || 200);
      res.end(tc.body || self.body);
    };
  };
}

Pinocchio.prototype.setResponse = function(statusCode) {
  this.body = 'Just for debug';
  this.status = statusCode;
}

Pinocchio.prototype.listen = function(port, callback) {
  this.server = http.createServer(this.app);
  this.server.listen(port, callback);
}

Pinocchio.prototype.shutdown = function() {
  this.server.close();
}

module.exports = Pinocchio;
