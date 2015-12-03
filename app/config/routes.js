var bodyParser = require('body-parser'),
  urlencoded = bodyParser.urlencoded({extended: false});

module.exports = function (app) {

  var cities = {
    'Cheb': 'desc',
    'Moscow': 'desc desc',
    'NY': 'desc desc desc'
  };

  app.get('/', function (request, result) {
    result.render('index');
  });

  app.get('/cities', function (request, response) {

    response.json(Object.keys(cities));
  });

  app.post('/cities', urlencoded, function (request, response) {

    var newCity = request.body;
    cities[newCity.name] = newCity.description;
    response.status(201).json(newCity.name);

  });

};