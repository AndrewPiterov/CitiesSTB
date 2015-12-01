var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

app.get('/', function(request, result) {
    result.send('OK');
});

var port = 3000;
app.listen(port, function(){
    console.log('Listening on ' + port + ' port...');
});