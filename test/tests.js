var request = require('supertest'),
  app = require('./../app'),
  redis = require('redis'),
  client = redis.createClient();

client.select('test'.length);

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

  it('Returns an index file with cities', function (done) {
    request(app)
      .get(path)
      .expect(/cities/i, done);
  })

});

describe('Listining cities on /cities', function () {
  'use strict';

  var path = '/cities';

  before(function(){
    client.flushdb();
  });

  it('Returns a 200 status code', function (done) {
    request(app)
      .get(path)
      .expect(200, done);
  });

  it('Returns JSON format', function (done) {

    request(app)
      .get(path)
      .expect('Content-Type', /json/, done);
  });

  it('Returns initial cities', function (done) {

    request(app)
      .get(path)
      .expect(JSON.stringify([]), done);
  })
});

describe('Creating new cities', function () {
  'use strict';

  var path = '/cities';

  after(function(){
    client.flushdb();
  });

  it('Returns a 201 status code', function (done) {

    request(app)
      .post(path)
      .send('name=Springfield&description=where+simpsons+live')
      .expect(201, done);
  });

  it('Returns the city name', function (done) {

    request(app)
      .post(path)
      .send('name=Springfield&description=where+simpsons+live')
      .expect(/springfield/i, done);
  });

  it('Validates city name and description', function(done){

    request(app)
      .post(path)
      .send('name=&description=')
      .expect(400, done);
  });

});

describe('Deleting cities', function () {
  'use strict';

  before(function () {
    client.hset('cities', 'Banana', 'a tasty fruit');
  });

  after(function(){
    client.flushdb();
  });

  it('Returns a 204 status code', function (done) {

    request(app)
      .delete('/cities/Banana')
      .expect(204, done);
  });
});