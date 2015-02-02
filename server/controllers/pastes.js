var express = require('express'),
    bodyParser = require('body-parser');

var db = require('../db'); // fixme: don't pretend this is sync

module.exports =  pasteRouter = express.Router();

pasteRouter.use(bodyParser.text());

pasteRouter.get('/:key', function (req, res) {
  var key = req.params.key.toLowerCase();

  db.retrievePaste(key).then(function (result) {
    res.json(result);
  }).catch(function(err) {
    res.status(404).json({error: err});
  });
});

pasteRouter.post('/:key?', function (req, res) {
  // 'key' is the optional existing key to associate this new revision with
  // returns
  // pasteContent: the content just saved
  // pasteID: the ID of the paste just saved
  // revisions: array of revisions related to this ID

  var key = req.params.key;
  if(key) key = key.toLowerCase();

  var content = req.body;
  if (content.length === 0) return res.status(400).send({error: 'cannot save paste of zero length'});

  db.savePaste(content, key).then(function (data) {
    res.json(data);
  }).catch(function(err) {
    res.status(500).json({error: err});
  })
});


