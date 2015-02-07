var request = require('supertest'),
    mongoose = require('mongoose'),
    should = require('should'),
    sinon  = require('sinon'),
    config = require('../test_server_config'),
    appPromise = require('../../server');

it('ignore this', function() {
  // must have one synchronous test, i guess
  'a'.should.equal('a');
});

appPromise.then(function(app) {
  describe('GET /', function () {
    it('responds with HTML', function (done) {
      request(app)
        .get('/')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200)
        .expect(/cmdv/, done)
    });
  });

});
