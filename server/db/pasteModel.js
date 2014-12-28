var mongoose = require('mongoose'),
    Promise  = require('bluebird');

var History = require('./historyModel'),
    helpers = require('../helpers'),
    config = require('../../server_config');

var pasteSchema = mongoose.Schema({
  key: {type: String, unique: true},
  content: String
});

pasteSchema.statics.generateUniqueKey = function(length) {
  return new Promise(function(resolve, reject) {
    var newKey = helpers.generateUniqueKey(length);

    this.verifyKeyIsUnique(newKey)
      .then(function () {
        resolve(newKey);
      })

      .catch(function (err) {
        return this.generateUniqueKey(length);
      });
  }.bind(this));
};

pasteSchema.statics.verifyKeyIsUnique = function(key) {
  return new Promise(function (resolve, reject) {
    this.findAsync({key: key}).then(function (key) {
      if (key.length === 0) {
        return resolve();
      } else {
        return reject();
      }
    });
  }.bind(this));
};

pasteSchema.statics.savePaste = function(content, existingKey) {
  var self = this;

  var verifyExistingKey = self.findAsync({key: existingKey}) // does existingKey really exist?
    .then(function (key) {
      var verifiedKey = existingKey;
      if (key.length === 0) {
        verifiedKey = null;
      } // not provided, or it didn't exist
      return Promise.resolve(verifiedKey);
    });

  function generateNewKey() {
    return self.generateUniqueKey(config.keyLength);
  }

  Promise.join(verifyExistingKey, generateNewKey(), function(verifiedExistingKey, newKey) {
    var newPaste = new self({key: newKey, content: content});
    return newPaste.saveAsync()
      .then(function () {
        return History.addRevision(verifiedExistingKey, newKey)
      });
  });
};


module.exports = PasteModel = mongoose.model('pasteSchema', pasteSchema);

Promise.promisifyAll(PasteModel);
Promise.promisifyAll(PasteModel.prototype);
