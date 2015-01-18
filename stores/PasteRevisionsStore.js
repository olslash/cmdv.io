var Fluxxor = require('Fluxxor'),
    Immutable = require('immutable'),
    constants = require('../constants');


module.exports = Fluxxor.createStore({
  initialize: function () {
    this._revisions = Immutable.Map();
    this._unsavedRevisions = Immutable.Map();

    this.bindActions(
        constants.PASTE_LOADED, this._onPasteLoaded,
        constants.CURRENT_PASTE_MODIFIED, this._onCurrentPasteModified
    );
  },

  getRevisionsOfCurrentPaste() {
    // if the currently selected paste is an unsaved revision, we still need to get the parent's revisions
    var key = this.flux.stores.NavigationStore.getCurrentKey();
    return this._revisions.get(key)
  },

  getUnsavedRevisionsOfCurrentPaste() {
    var key = this.flux.stores.NavigationStore.getCurrentKey();
    return this._unsavedRevisions.get(key)
  },

  _emitChange() {
    this.emit('change')
  },

  _onPasteLoaded(payload) {
    // associate every key in the payload's revisions array with that revisions array
    payload.revisions.forEach( key => this._revisions = this._revisions.set(key, payload.revisions) );

    this._emitChange();
  },

  _onCurrentPasteModified(payload) {
    var key = this.flux.stores.NavigationStore.getCurrentKey();
    var unsavedRevisions = this._unsavedRevisions.get(key);

    if(unsavedRevisions) {
      unsavedRevisions.push(payload.tempKey);
    } else {
      unsavedRevisions = [payload.tempKey];
    }

    this._unsavedRevisions = this._unsavedRevisions.set(key, unsavedRevisions);
    this._emitChange();
  }
});
