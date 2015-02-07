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

  describe('/pastes', function () {
    beforeEach(function(done) {
      mongoose.connection.db.dropDatabase(function() {
        done();
      });
    });
    it('should save and retrieve a single paste', function (done) {
      request(app)
        .post('/pastes')
        .type('text/plain')
        .send('this is a paste!')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          var assignedPasteID = res.body.pasteID;
          assignedPasteID.should.be.a.String;
          assignedPasteID.length.should.equal(config.keyLength);
          res.body.pasteContent.should.equal('this is a paste!');
          res.body.revisions.length.should.equal(1);
          res.body.revisions.should.containEql(assignedPasteID);
        })
        .end(done)
    });

    it('should re-generate keys that are not unique', function(done) {
      var helpers = require('../../helpers');
      var stub = sinon.stub(helpers, 'generateKey').onCall(0).returns('himom')
                                                   .onCall(1).returns('himom')
                                                   .onCall(2).returns('himom')
                                                   .onCall(3).returns('byemom');

      // save a paste with key 'himom'
      request(app)
        .post('/pastes')
        .type('text/plain')
        .send('this is a paste!')
        .expect('Content-Type', /json/)
        .expect(function (res) {
          var assignedPasteID = res.body.pasteID;
          assignedPasteID.should.equal('himom');
        })
          // force it to try and save another paste with that key-- it should
          // call generateKey until it finds a keyi that is not unique
        .end(function() {
          request(app)
            .post('/pastes')
            .type('text/plain')
            .send('this is a paste!')
            .expect(function (res) {
              var assignedPasteID = res.body.pasteID;
              assignedPasteID.should.equal('byemom');
            })
            .end(function(err) {
                helpers.generateKey.restore();
                done(err);
              });
        });
    });

    it('should create a single-entry revision chain for new pastes', function(done) {
      request(app)
        .post('/pastes')
        .type('text/plain')
        .send('this is a paste!')
        .end(function (err, res) {
            res.body.revisions.length.should.equal(1);
            res.body.revisions.should.containEql(res.body.pasteID);
            done(err)
          });
    });

    it('should append to the revision chain when saving a paste to an existing ID', function(done) {
      // save a paste
      request(app)
        .post('/pastes')
        .type('text/plain')
        .send('this is a paste!')

      // save a new paste as a revision of the first
        .end(function(err, res) {
          var firstResponse = res.body;
          request(app)
            .post('/pastes/' + firstResponse.pasteID)
            .type('text/plain')
            .send('this is another paste!')
            .end(function (err, res) {
                var secondResponse = res.body;
                var firstKey = firstResponse.pasteID;
                var secondKey = secondResponse.pasteID;

                firstKey.should.not.equal(secondKey);

                firstResponse.pasteContent.should.equal('this is a paste!');
                secondResponse.pasteContent.should.equal('this is another paste!');
                secondResponse.revisions.length.should.equal(2);
                secondResponse.revisions.should.containEql(firstKey);

                request(app)
      // save a paste to the second paste
                  .post('/pastes/' + secondResponse.pasteID)
                  .type('text/plain')
                  .send('this is a third paste!')
                  .end(function(err, res) {
                      var thirdKey = res.body.pasteID;
                      res.body.revisions.length.should.equal(3);
      // retrieve the first paste and make sure everything is there
                      request(app)
                        .get('/pastes/' + firstKey)
                        .end(function(err, res){
                            res.body.revisions.should.containEql(firstKey);
                            res.body.revisions.should.containEql(secondKey);
                            res.body.revisions.should.containEql(thirdKey);

                            done(err);
                          });
                    });
            });
        });
    })
  });

});
