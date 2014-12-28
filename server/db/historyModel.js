var mongoose = require('mongoose'),
    Promise  = require('bluebird');

var historySchema = mongoose.Schema({
  revisions: {type: [String], unique: true}
});

// add a new key to the history document that contains existingKey.
historySchema.statics.addRevision = function(newKey, existingKey) {
    existingKey || (existingKey = '');
    return this.updateAsync({revisions: {$in: [existingKey]}},
        {$addToSet: {revisions: newKey}},
        {upsert: true});
};

module.exports = HistoryModel = mongoose.model('historySchema', historySchema);

Promise.promisifyAll(HistoryModel);
Promise.promisifyAll(HistoryModel.prototype);
