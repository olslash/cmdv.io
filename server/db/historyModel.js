var mongoose = require('mongoose'),
    Promise  = require('bluebird');

var historySchema = mongoose.Schema({
  revisions: {type: [String], unique: true}
});

// add a new key to the history document that contains existingKey
// returns a promise.
historySchema.statics.addRevision = function(existingKey, newKey) {
    return this.update({revisions: existingKey},
        {$addToSet: {revisions: newKey}});
};

module.exports = HistoryModel = mongoose.model('historySchema', historySchema);

Promise.promisifyAll(HistoryModel);
Promise.promisifyAll(HistoryModel.prototype);
