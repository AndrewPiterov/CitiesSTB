var bodyParser = require('body-parser'),
  urlencoded = bodyParser.urlencoded({extended: false});

// Redis connection
var redis = require('redis');

if (process.env.REDISTOGO_URL) {
  var rtg = require("url").parse(process.env.REDISTOGO_URL);
  var client = require("redis").createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
  var client = redis.createClient();
  client.select('development'.length);
}
// End Redis connection

module.exports = function (app) {

  app.get('/', function (request, result) {
    result.render('index');
  });

  app.get('/cities', function (request, response) {
    client.hkeys('cities', function (error, names) {
      if (error) throw error;
      response.json(names);
    });
  });

  app.post('/cities', urlencoded, function (request, response) {
    var newCity = request.body;

    if(!newCity.name || !newCity.description){
      response.sendStatus(400);
      return false;

    }

    client.hset('cities', newCity.name, newCity.description, function (error) {
      if (error) throw error;
      response.status(201).json(newCity.name);
    });
  });

  app.delete('/cities/:name', function(request, response){

    client.hdel('cities', request.params.name, function(error){
      if(error) throw  error;
      response.sendStatus(204);
    })
  });
};