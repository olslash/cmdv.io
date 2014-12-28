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
  getRevisionHistoryForKey: function(key) {
    return History.findAsync({revisions: key})
  },

  savePaste: function(content, existingKey) {
    return Paste.savePaste(content, existingKey);
  },

  generateUniqueKey: function(length) {
    return Paste.generateUniqueKey(length);
  }
};
