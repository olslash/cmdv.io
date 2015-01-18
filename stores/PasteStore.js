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
    return this._pastes.get(key)
  },

  _emitChange() {
    this.emit('change')
  },

  _onPasteLoaded(payload) {
    this._pastes = this._pastes.set(payload.pasteID, payload.pasteContent);

    this._emitChange();
  }
});
