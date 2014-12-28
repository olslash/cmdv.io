var mongoose = require('mongoose'),
    Promise  = require('bluebird');

var historySchema = mongoose.Schema({
  revisions: {type: [String], unique: true}
});

// add a new key to the history document that contains existingKey.
// returns a promise.
historySchema.statics.addRevision = function(existingKey, newKey) {
  console.log('adding a revision of', existingKey, ': ', newKey);
    return this.updateAsync({revisions: {$in: [existingKey]}},
        {$addToSet: {revisions: newKey}},
        {upsert: true});
};

module.exports = HistoryModel = mongoose.model('historySchema', historySchema);

Promise.promisifyAll(HistoryModel);
Promise.promisifyAll(HistoryModel.prototype);
