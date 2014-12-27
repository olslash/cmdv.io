var mongoose = require('mongoose'),
    Promise  = require('bluebird');

var pasteSchema = mongoose.Schema({
  key: {type: String, unique: true},
  content: String
});



module.exports = PasteModel = mongoose.model('pasteSchema', pasteSchema);

Promise.promisifyAll(PasteModel);
Promise.promisifyAll(PasteModel.prototype);
