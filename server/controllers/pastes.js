var express = require('express');

var db = require('db'); // fixme: don't pretend this is sync

module.exports =  pasteRouter = express.Router();

pasteRouter.param('key', /^[a-zA-Z]+$/);

pasteRouter.get('/:key', function (req, res) {
  var key = req.params.key.toLowerCase();
  db.getByKey(key).then(function (paste) {
    paste.pasteContent;
    paste.key;
    paste.revisions;
  })
});

pasteRouter.post('/:key', function (req, res) {

});

pasteRouter.post('/', function (req, res) {

});


