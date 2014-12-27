var config = require('../../server_config');
var mongoose = require('mongoose');

mongoose.connect(config.dbURL);
var db = mongoose.connection;
db.on('error', console.error.bind(console));

//db.once('open', function() {
//
//});

var Paste = require('./pasteModel');
var History = require('./historyModel');

module.exports = {
  getByKey(key) {

  }
};
