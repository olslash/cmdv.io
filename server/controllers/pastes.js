var express = require('express'),
    bodyParser = require('body-parser');

var db = require('../db'), // fixme: don't pretend this is sync
    helpers = require('../helpers');

module.exports =  pasteRouter = express.Router();

//pasteRouter.param('key', /^[a-zA-Z]+$/);
pasteRouter.use(bodyParser.text());

//pasteRouter.get('/test', function (req, res) {
////  db.getRevisionHistoryForKey('ragupuyo').then(function(key) {
////    console.log('result');
////    console.log(key);
////  }).catch(function(err) {
////    console.log(err);
////  });
////  db.retrievePaste('sajifose').then(function(result) {
////    console.log(result);
////  })
//  db.savePaste('content', 'ragupuyo');
////  db.generateUniqueKey(8).then(function(key) {
////    console.log(key);
////  })
//});

pasteRouter.get('/:key', function (req, res) {
  var key = req.params.key.toLowerCase();

  db.retrievePaste(key).then(function (result) {
    res.json(result);
  }).catch(function(err) {
    res.status(404).json({error: err});
  });
});

// save a paste, unrelated to any other
pasteRouter.post('/', function (req, res) {
  // returns
  // pasteContent: the content just saved
  // pasteID: the ID of the paste just saved
  // revisions: array of revisions related to this ID

  var content = req.body;
  db.savePaste(content).then(function(data) {
    res.json(data);
  }).catch(function(err) {
    res.status(404).json({error: err});
  });
});

pasteRouter.post('/:key', function (req, res) {
  // 'key' is the existing key to associate this new revision with
  var key = req.params.key.toLowerCase();
  var content = req.body;
  db.savePaste(content, key).then(function (data) {
    res.json(data);
  })
});


