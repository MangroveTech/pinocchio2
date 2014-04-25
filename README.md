
Pinocchio
==========================
fake http server for testing your http server/client

### Installation
```sh
$ npm install pinocchio2 --save
```

### Usage
```js
var request = require('request')
var Pinocchio = require('pinocchio');
var fake = new Pinocchio([
  // your test cases
  { method: 'POST', path: '/hello' },
  { method: 'PATCH', path: '/world'}
]);
fake.listen(10010);

// set your response what you expect to
fake.setResponse(200);

// then you just request this fake server
request({
  uri: 'http://localhost:10010/hello',
  method: 'POST'
}, function(err, req) {
  req.statusCode === 200; // true
});

// else
fake.setResponse(204);
request({
  uri: 'http://localhost:10010/world',
  method: 'PATCH'
}, function(err, req) {
  req.statusCode === 200; // false
  req.statusCode === 204; // true
});
```

### License
MIT