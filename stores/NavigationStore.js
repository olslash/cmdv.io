var Fluxxor = require('Fluxxor');

var constants = require('../constants');

// NavigationStore
module.exports = Fluxxor.createStore({
  initialize: function () {
    this._currentKey = '';
//    this. _currentLanguage = '';

    this.bindActions(
      constants.PAGE_LOADED, this._onPageLoad,
      constants.PASTE_SELECTED, this._onPasteSelected,
      constants.PRISTINE_PASTE_MODIFIED, this._onPristinePasteModified,
      constants.PASTE_SAVED, this._onPasteSaved
    )
  },

  _emitChange() {
    this.emit('change');
  },

  getCurrentKey() {
    return this._currentKey
  },

  _setCurrentKey(pasteID, setHistory) {
    this._currentKey = pasteID;
    if(setHistory && this._currentKey != pasteID) { // do not set history for the same paste twice
      history.pushState({ pasteID }, null, pasteID);
    }
  },

  _onPageLoad: function(payload) {
    var path = payload.path;
    var routeRegex = /^\/([a-zA-Z]+)\.?([a-zA-Z]*)$/; // '/(key).(language)?'
    var routeComponents = path.match(routeRegex);

    if(routeComponents !== null) {
      this._currentKey = routeComponents[1];
      history.replaceState({ pasteID: routeComponents[1] }, null, routeComponents[1]);
//      this.currentLanguage = routeComponents[2];
    }

    this._emitChange();
  },

  _onPasteSelected: function(payload) {
    this._setCurrentKey(payload.pasteID, payload.setHistory);

    this._emitChange();
  },

  _onPasteSaved: function(payload) {
    if(this._currentKey === payload.tempID) {
      this._setCurrentKey(payload.pasteID, true);
    }

    this._emitChange();
  },

  _onPristinePasteModified(payload) {
    this._setCurrentKey(payload.tempKey, false);
    this._emitChange();
  }
});
