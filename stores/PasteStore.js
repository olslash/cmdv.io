var Fluxxor = require('Fluxxor'),
    Immutable = require('immutable'),
    constants = require('../constants');

module.exports = Fluxxor.createStore({
    initialize: function() {
//        this.currentPaste = ''; // key of current paste that the UI should be displaying
        this.pastes = Immutable.Map(); // pastes that have been retrieved from the server

        this.bindActions(
            constants.PASTE_LOADED, this.o_nPasteLoaded
        );
    },

    _emitChange() {
        this.emit('change')
    },

    _onPasteLoaded(payload) {
        this.pastes[payload.pasteID] = this.pastes.set(payload.pasteID, payload.pasteContent);

        this._emitChange();
    }
});
