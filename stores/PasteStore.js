var Fluxxor = require('Fluxxor'),
    Immutable = require('immutable'),
    constants = require('../constants');

module.exports = Fluxxor.createStore({
  initialize: function() {
    this._pastes = Immutable.Map(); // pastes that have been retrieved from the server
    this._tempPastes = Immutable.Map(); // locally edited pastes that have not been saved

    this.bindActions(
      constants.PASTE_LOADED, this._onPasteLoaded,
      constants.PASTE_SAVED, this._onPasteSaved,
      constants.PASTE_SELECTED, this._onPasteSelected,
      constants.PASTE_MODIFIED, this._onPasteModified,
      constants.PRISTINE_PASTE_MODIFIED, this._onPristinePasteModified
    );
  },

  getPaste(pasteID) {
    // if not in the store, should be loaded by PASTE_SELECTED
    // fixme: clean up this logic
    var pasteIsTemp = false;
    var paste = this._pastes.get(pasteID);
    if(paste === undefined) {
      paste = this._tempPastes.get(pasteID);

      if(paste !== undefined) {
        pasteIsTemp = true;
      }
    }

    return {
      pasteContent: paste || '',
      isClean: !pasteIsTemp
    }
  },

  _emitChange() {
    this.emit('change')
  },

  _onPasteLoaded(payload) {
    this._pastes = this._pastes.set(payload.pasteID, payload.pasteContent);

    this._emitChange();
  },

  _onPasteSaved(payload) {
    this._tempPastes = this._tempPastes.delete(payload.tempID);

    this._emitChange();
  },

  _onPasteSelected(payload) {
    var selectedPaste = this._pastes.get(payload.pasteID) || this._tempPastes.get(payload.pasteID);

    if(selectedPaste === undefined) { // not in memory-- ask for it from the server
      helpers.callAsync(this.flux.actions.loadPaste, this, payload.pasteID);
    }
  },

  _onPasteModified(payload) {
    this._tempPastes = this._tempPastes.set(payload.pasteID, payload.pasteContent);

    this._emitChange();
  },

  _onPristinePasteModified(payload) {
    // fixme: can this be rolled into _onPasteModified?
    this._tempPastes = this._tempPastes.set(payload.tempKey, payload.pasteContent);

    this._emitChange();
  }
});
