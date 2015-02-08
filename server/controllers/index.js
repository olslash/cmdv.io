var express = require('express'),
    React   = require('react');

var Index = require('../../frontend/Index.jsx');

var indexRouter;
module.exports = indexRouter = express.Router();

indexRouter.get('/:key?', function (req, res) {
  res.send(React.renderToString(React.createElement(Index)))
});
