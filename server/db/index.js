var mongoose = require('mongoose'),
    Promise  = require('bluebird');

var config = process.env.NODE_ENV === 'test' ?
    require('../../__tests__/test_server_config') :
    require('../../server_config');

mongoose.connect(`mongodb://${config.dbUser}:${config.dbPassword}@${config.dbURL}`);
var db = mongoose.connection;
db.on('error', console.error.bind(console));

db.once('open', function() {

});

var Paste = require('./pasteModel');
var History = require('./historyModel');

module.exports = {
  // retrieves a paste and its history
  retrievePaste: function(key) {
    return Paste.findAsync({key: key}).bind(this)
      .then(function(paste) {
        if(paste.length === 0) {
          return Promise.reject('Paste was not found');
        }

        return this.getRevisionHistoryForKey(paste[0].key)
          .then(function(history) {
              if (paste.length === 0) {
                return Promise.reject('server error: History was not found');
              }
              return { pasteID: paste[0].key,
                       pasteContent: paste[0].content,
                       revisions:history[0].revisions };
          });
      });
  },

  // saves a new paste, then returns it
  savePaste: function(content, existingKey) {
    return Paste.savePaste(content, existingKey).bind(this).then(function(key) {
      return this.retrievePaste(key)
    });
  },

  getRevisionHistoryForKey: function (key) {
    return History.findAsync({revisions: key})
  }
};
