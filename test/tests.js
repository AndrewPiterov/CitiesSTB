var request = require('supertest'),
  app = require('./../app');


describe('Requests to the root path', function () {
  'use strict';

  it('Returns a 200 status code', function (done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});