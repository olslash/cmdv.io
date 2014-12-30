var Fluxxor = require('Fluxxor'),
    Immutable = require('immutable'),
    constants = require('../constants');



module.exports = Fluxxor.createStore({
  initialize: function () {
    this._savingPasteIDs = Immutable.Map();
    this._failedSavingPasteIDs = Immutable.Map();

    this.bindActions(
        constants.PASTE_SAVING, this._onPasteSaving,
        constants.PASTE_SAVED, this._onPasteSaved,
        constants.PASTE_SAVE_FAILED, this._onPasteSaveFailed
    );
  },

  isSaving() {
    return this._savingPasteIDs.size > 0;
  },

  getSavingPastes() {
    return this._savingPasteIDs;
  },

  getFailedSavingPastes() {
    return this._failedSavingPasteIDs;
  },

  _emitChange() {
    this.emit('change')
  },

  _onPasteSaving(payload) {
    this._savingPasteIDs = this._savingPasteIDs.set(payload.pasteID, true);
    this._failedSavingPasteIDs = this._failedSavingPasteIDs.delete(payload.pasteID);
    this.emitChange();
  },

  _onPasteSaved(payload) {
    this._savingPasteIDs = this._savingPasteIDs.delete(payload.pasteID);
    this._failedSavingPasteIDs = this._failedSavingPasteIDs.delete(payload.pasteID);
    this.emitChange();
  },

  _onPasteSaveFailed(payload) {
    this._savingPasteIDs = this._savingPasteIDs.delete(payload.pasteID);
    this._failedSavingPasteIDs = this._failedSavingPasteIDs.set(payload.pasteID, true);

    this._emitChange();
  }
});
