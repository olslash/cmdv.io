var Fluxxor = require('fluxxor'),
    Immutable = require('immutable'),
    constants = require('../constants');


module.exports = Fluxxor.createStore({
  initialize() {
    this._loadingPasteIDs = Immutable.Set();
    this._failedLoadingPasteIDs = Immutable.Set();

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
    this._loadingPasteIDs = this._loadingPasteIDs.add(payload.pasteID);
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
    this._failedLoadingPasteIDs = this._failedLoadingPasteIDs.add(payload.pasteID);

    this._emitChange();
  }
});
