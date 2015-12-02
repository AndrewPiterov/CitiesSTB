var express = require('express'),
  bodyParser = require('body-parser');

var app = express();

app.get('/', function (request, result) {
  result.send('OK');
});

module.exports = app;