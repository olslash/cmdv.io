var Fluxxor = require('Fluxxor'),
    Immutable = require('immutable'),
    constants = require('../constants');


module.exports = Fluxxor.createStore({
  initialize: function () {
    this._revisions = Immutable.Map();
    this._unsavedRevisions = Immutable.Map();

    this.bindActions(
        constants.PASTE_LOADED, this._onPasteLoaded
    );
  },

  getRevisionsOfCurrentPaste() {
    var key = this.flux.stores.NavigationStore.currentKey;
    return this._revisions.get(key)
  },

  getUnsavedRevisionsOfCurrentPaste() {
    var key = this.flux.stores.NavigationStore.currentKey;
    return this._unsavedRevisions.get(key)
  },

  _emitChange() {
    this.emit('change')
  },

  _onPasteLoaded(payload) {
    this._revisions = this._revisions.set(payload.pasteID, payload.revisions);
    this._emitChange();
  }
});
