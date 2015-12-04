var bodyParser = require('body-parser'),
  urlencoded = bodyParser.urlencoded({extended: false});

var redis = require('redis');

// Redis connection

if (process.env.REDISTOGO_URL) {
  var rtg = require('url').parse(process.env.REDISTOGO_URL);
  var client = rtg.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(':')[1]);
} else {
  client = redis.createClient();
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

    client.hset('cities', newCity.name, newCity.description, function (error) {
      if (error) throw error;
      response.status(201).json(newCity.name);
    });
  });
};