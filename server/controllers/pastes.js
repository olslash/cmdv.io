var express = require('express');

var db = require('../db'); // fixme: don't pretend this is sync
var helpers = require('../helpers');

module.exports =  pasteRouter = express.Router();

//pasteRouter.param('key', /^[a-zA-Z]+$/);

pasteRouter.get('/test', function (req, res) {
  db.getRevisionHistoryForKey('ragupuyo').then(function(key) {
    console.log('result');
    console.log(key);
  }).catch(function(err) {
    console.log(err);
  });

//  db.savePaste('content', 'ragupuyo');
//  db.generateUniqueKey(8).then(function(key) {
//    console.log(key);
//  })
});

pasteRouter.get('/:key', function (req, res) {
  // 'key' is the existing key to associate this new revision with
  var key = req.params.key.toLowerCase();
  db.savePaste('himomcontent', 'himomkey');


//  db.getByKey(key).then(function (paste) {
//    paste.pasteContent;
//    paste.key;
//    paste.revisions;
//  })
});

pasteRouter.post('/:key', function (req, res) {

});

pasteRouter.post('/', function (req, res) {

});


