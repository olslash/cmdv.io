var Fluxxor = require('Fluxxor'),
    Immutable = require('immutable'),
    constants = require('../constants');

module.exports = Fluxxor.createStore({
  initialize: function() {
    this._pastes = Immutable.Map(); // pastes that have been retrieved from the server

    this.bindActions(
      constants.PASTE_LOADED, this._onPasteLoaded
    );
  },

  getPaste(key) {
    var paste = this._pastes.get(key);
    if (paste) return paste;

    // paste not cached-- ask for it from the server
//    this.flux.actions.loadPaste(key);
  },

  _emitChange() {
    this.emit('change')
  },

  _onPasteLoaded(payload) {
    this._pastes = this._pastes.set(payload.pasteID, payload.pasteContent);

    this._emitChange();
  }
});
