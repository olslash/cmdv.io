var Fluxxor = require('Fluxxor'),
    Immutable = require('immutable'),
    constants = require('../constants');


module.exports = Fluxxor.createStore({
  initialize: function () {
    this._revisions = Immutable.List();
    this._unsavedRevisions = Immutable.List();

    this.bindActions(
        constants.PASTE_LOADED, this._onPasteLoaded,
        constants.CURRENT_PASTE_MODIFIED, this._onCurrentPasteModified
    );
  },

  getRevisionsOfCurrentPaste() {
    return this._revisions
  },

  getUnsavedRevisionsOfCurrentPaste() {
    return this._unsavedRevisions
  },

  _emitChange() {
    this.emit('change')
  },

  _onPasteLoaded(payload) {
    this._revisions = Immutable.fromJS(payload.revisions);
    this._emitChange();
  },

  _onCurrentPasteModified(payload) {
    this._unsavedRevisions = this._unsavedRevisions.push(payload.tempKey);
    this._emitChange();
  }
});
