var request = require('supertest'),
  app = require('./../app');

describe('Requests to the root path', function () {
  'use strict';

  var path = '/';

  it('Returns a 200 status code', function (done) {
    request(app)
      .get(path)
      .expect(200, done);
  });

  it('Returns a HTML format', function (done) {
    request(app)
      .get(path)
      .expect('Content-Type', /html/, done)
  });

  it('Returns an index file with cities', function(done){
    request(app)
      .get(path)
      .expect(/cities/i, done);
  })

});

describe('Listining cities on /cities', function () {
  'use strict';

  var path = '/cities';

  it('Returns a 200 status code', function (done) {
    request(app)
      .get(path)
      .expect(200, done);
  });

  it('Returns JSON format', function(done){
    request(app)
      .get(path)
      .expect('Content-Type', /json/, done);
  });

  it('Returns initial cities', function(done){
    request(app)
      .get(path)
      .expect(JSON.stringify(['Cheb', 'Moscow', 'NY']), done);
  })
});