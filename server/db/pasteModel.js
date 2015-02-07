var mongoose = require('mongoose'),
    Promise  = require('bluebird');

var History = require('./historyModel'),
    helpers = require('../../helpers');

var config = process.env.NODE_ENV === 'test' ?
    require('../../__tests__/test_server_config') :
    require('../../server_config');

var pasteSchema = mongoose.Schema({
  key: {type: String, unique: true},
  content: String
});

pasteSchema.statics.savePaste = function (content, existingKey) {
  var self = this;

  var verifyExistingKey = self.findAsync({key: existingKey})
  // does existingKey really exist?
    .then(function (key) {
      var verifiedKey = existingKey;

      if (key.length === 0) {
        verifiedKey = null;
      } // not provided, or it didn't exist

      return verifiedKey;
    });

  function generateNewKey() {
    return self._generateUniqueKey(config.keyLength);
  }

  return Promise.join(verifyExistingKey, generateNewKey(), function (verifiedExistingKey, newKey) {
    var newPaste = new self({key: newKey, content: content});

    return newPaste.saveAsync()
      .then(function (paste) {
        return History.addRevision(newKey, verifiedExistingKey);
      }).then(function() {
        return newKey;
      });
  });
};

pasteSchema.statics._generateUniqueKey = function(length) {
  return new Promise(function(resolve, reject) {
    var newKey = helpers.generateKey(length);

    this._verifyKeyIsUnique(newKey)
      .then(function () {
        resolve(newKey);
      })

      .catch(function (err) {
        this._generateUniqueKey(length).then(resolve)
      }.bind(this));
  }.bind(this));
};

pasteSchema.statics._verifyKeyIsUnique = function(key) {
  return new Promise(function (resolve, reject) {
    this.findAsync({key: key}).then(function (key) {
      if (key.length === 0) {
        return resolve();
      } else {
        return reject('key already exists!');
      }
    });
  }.bind(this));
};


module.exports = PasteModel = mongoose.model('pasteSchema', pasteSchema);

Promise.promisifyAll(PasteModel);
Promise.promisifyAll(PasteModel.prototype);
