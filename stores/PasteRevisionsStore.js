var Fluxxor = require('Fluxxor'),
    Immutable = require('immutable'),
    constants = require('../constants');


module.exports = Fluxxor.createStore({
  initialize: function () {
    this._revisions = Immutable.Map();

    this.bindActions(
        constants.PASTE_LOADED, this._onPasteLoaded
    );
  },

  getRevisions() {
    return this._revisions;
  },

  _emitChange() {
    this.emit('change')
  },

  _onPasteLoaded(payload) {
    this._revisions = this._revisions.set(payload.pasteID, payload.revisions);
    this._emitChange();
  }
});
