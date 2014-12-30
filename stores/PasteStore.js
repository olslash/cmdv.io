var Fluxxor = require('Fluxxor'),
    Immutable = require('immutable'),
    constants = require('../constants');

module.exports = Fluxxor.createStore({
  initialize: function() {
    this.pastes = Immutable.Map(); // pastes that have been retrieved from the server

    this.bindActions(
      constants.PASTE_LOADED, this._onPasteLoaded
    );
  },

  getPastes() {
    return this.pastes;
  },

  _emitChange() {
    this.emit('change')
  },

  _onPasteLoaded(payload) {
    this.pastes = this.pastes.set(payload.pasteID, payload.pasteContent);

    this._emitChange();
  }
});
