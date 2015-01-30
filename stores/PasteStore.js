var Fluxxor = require('Fluxxor'),
    Immutable = require('immutable'),
    constants = require('../constants');

module.exports = Fluxxor.createStore({
  initialize: function() {
    this._pastes = Immutable.Map(); // pastes that have been retrieved from the server

    this.bindActions(
      constants.PASTE_LOADED, this._onPasteLoaded,
      constants.PASTE_SELECTED, this._onPasteSelected,
      constants.PASTE_MODIFIED, this._onPasteModified
    );
  },

  getPaste(pasteID) {
    var paste = this._pastes.get(pasteID);
    if(paste) {
      return paste;
    } else { // not in the store-- but should be loaded by PASTE_SELECTED
      return '';
    }
  },

  _emitChange() {
    this.emit('change')
  },

  _onPasteLoaded(payload) {
    this._pastes = this._pastes.set(payload.pasteID, payload.pasteContent);

    this._emitChange();
  },

  _onPasteSelected(payload) {
    var selectedPaste = this._pastes.get(payload.pasteID);

    if(!selectedPaste) { // not in memory-- ask for it from the server
      helpers.callAsync(this.flux.actions.loadPaste, this, payload.pasteID);
    }
  },

  _onPasteModified(payload) {
    this._pastes = this._pastes.set(payload.pasteID, payload.pasteContent);

    this._emitChange();
  }
});
