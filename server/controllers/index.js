var express = require('express');

module.exports = indexRouter = express.Router();

indexRouter.get('/:key?', function (req, res) {
  console.log('here');
  res.render('index')
});
