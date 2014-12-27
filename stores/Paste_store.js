var Fluxxor = require('Fluxxor'),
    constants = require('../constants');

module.exports = Fluxxor.createStore({
    initialize: function() {
        this.isLoading = () => Object.keys(this.loadingPasteIDs).length > 0;
        this.isSaving = () => Object.keys(this.savingPasteIDs).length > 0;

        this.loadingPasteIDs = {};
        this.savingPasteIDs = {};

        this.failedLoadPasteIDs = {};
        this.failedSavePasteIDs = {};

        this.pastes = {};

        this.revisions = {};

        this.bindActions(
            constants.PASTE_LOADING, this.onPasteLoading,
            constants.PASTE_LOADED, this.onPasteLoaded,
            constants.PASTE_LOAD_FAILED, this.onPasteLoadFailed,

            constants.PASTE_SAVING, this.onPasteSaving,
            constants.PASTE_SAVED, this.onPasteSaved,
            constants.PASTE_SAVE_FAILED, this.onPasteSaveFailed
        );
    },

    emitChange() {
        this.emit('change')
    },

    onPasteLoading(payload) {
        this.loadingPasteIDs[payload.pasteID] = true;
        this.emitChange();
    },

    onPasteLoaded(payload) {
        this.pastes[payload.pasteID] = payload.pasteContent;
        this.revisions[payload.pasteID] = payload.revisions;

        delete this.loadingPasteIDs[payload.pasteID];
        delete this.failedLoadPasteIDs[payload.pasteID];
        this.emitChange();
    },

    onPasteLoadFailed(payload) {
        delete this.loadingPasteIDs[payload.pasteID];
        this.failedLoadPasteIDs[payload.pasteID] = true;
        this.emitChange();
    },

    onPasteSaving(payload) {
        this.savingPasteIDs[payload.pasteID] = true;
        this.emitChange();
    },

    onPasteSaved(payload) {
        this.pastes[payload.pasteID] = payload.pasteContent;
        this.revisions[payload.pasteID] = payload.revisions;

        delete this.savingPasteIDs[payload.pasteID];
        delete this.failedSavePasteIDs[payload.pasteID];
        this.emitChange();
    },

    onPasteSaveFailed(payload) {
        delete this.savingPasteIDs[payload.pasteID];
        this.failedSavePasteIDs[payload.pasteID] = true;
        this.emitChange();
    }
});
