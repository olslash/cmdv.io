var express = require('express'),
    React   = require('react');

var Index = require('../../frontend/Index.jsx'),
    db = require('../db');

var indexRouter;
module.exports = indexRouter = express.Router();

indexRouter.get('/:key?', function (req, res) {
  res.send(React.renderToString(React.createElement(Index)))
});

// /raw/:key(.extension)
indexRouter.get(/^\/raw\/(\w+).?(.+)?$/, function (req,res) {
  res.set('Content-Type', 'text/plain');
  db.retrievePaste(req.params[0]).then(function (result) {
    res.send(result.pasteContent);
  }).catch(function (err) {
    res.status(404).send(err);
  });
});
