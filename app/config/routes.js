module.exports = function (app) {

  app.get('/', function (request, result) {
    result.render('index');
  });

  app.get('/cities', function (request, response) {
    var cities = ['Cheb', 'Moscow', 'NY'];
    response.json(cities);
  });

};