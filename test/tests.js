var request = require('supertest'),
  app = require('./../app'),
  redis = require('redis');

process.env.NODE_ENV = 'test';
var client = redis.createClient();
client.select('test'.length);
client.flushdb();

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

describe('Listing cities on /cities', function () {
  'use strict';

  var path = '/cities';

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

  it('Validates city name and description', function (done) {

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

  after(function () {
    client.flushdb();
  });

  it('Returns a 204 status code', function (done) {

    request(app)
      .delete('/cities/Banana')
      .expect(204, done);
  });
});

describe('Shows city info', function () {
  'use strict';

  before(function () {
    client.hset('cities', 'Mango', 'a lovely fruit');
  });

  after(function () {
    client.flushdb();
  });

  var path = '/cities/Mango';

  it('Returns a 200 status code', function (done) {

    request(app)
      .get(path)
      .expect(200, done);
  });

  it('Returns a HTML format', function (done) {
    request(app)
      .get(path)
      .expect('Content-Type', /html/, done);
  });

  it('Returns information of giving city', function(done){
    request(app)
      .get(path)
      .expect(/fruit/, done);
  });

});