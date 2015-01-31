var Fluxxor = require('Fluxxor'),
    Immutable = require('immutable'),
    constants = require('../constants');


module.exports = Fluxxor.createStore({
  initialize: function () {
    // todo: refactor to use Set instead of Map
    this._loadingPasteIDs = Immutable.Map();
    this._failedLoadingPasteIDs = Immutable.Map();

    this.bindActions(
        constants.PASTE_LOADING, this._onPasteLoading,
        constants.PASTE_LOADED, this._onPasteLoaded,
        constants.PASTE_LOAD_FAILED, this._onPasteLoadFailed
    );
  },

  isLoading() {
    return this._loadingPasteIDs.size > 0;
  },

  getLoadingPastes() {
    return this._loadingPasteIDs;
  },

  getFailedLoadingPastes() {
    return this._failedLoadingPasteIDs;
  },

  _emitChange() {
    this.emit('change')
  },

  _onPasteLoading(payload) {
    this._loadingPasteIDs = this._loadingPasteIDs.set(payload.pasteID, true);
    this._failedLoadingPasteIDs = this._failedLoadingPasteIDs.delete(payload.pasteID);

    this._emitChange();
  },

  _onPasteLoaded(payload) {
    this._loadingPasteIDs = this._loadingPasteIDs.delete(payload.pasteID);
    this._failedLoadingPasteIDs = this._failedLoadingPasteIDs.delete(payload.pasteID);

    this._emitChange();
  },

  _onPasteLoadFailed(payload) {
    this._loadingPasteIDs = this._loadingPasteIDs.delete(payload.pasteID);
    this._failedLoadingPasteIDs = this._failedLoadingPasteIDs.set(payload.pasteID, true);

    this._emitChange();
  }
});
