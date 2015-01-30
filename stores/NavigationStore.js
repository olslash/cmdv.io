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
      constants.PRISTINE_PASTE_MODIFIED, this._onPristinePasteModified
    )
  },

  _emitChange() {
    this.emit('change');
  },

  getCurrentKey() {
    return this._currentKey
  },

  _onPageLoad: function(payload) {
    var path = payload.path;
    var routeRegex = /^\/([a-zA-Z]+)\.?([a-zA-Z]*)$/; // '/(key).(language)?'
    var routeComponents = path.match(routeRegex);

    if(routeComponents !== null) {
      this._currentKey = routeComponents[1];
//      this.currentLanguage = routeComponents[2];
    }

    this._emitChange();
  },

  _onPasteSelected: function(payload) {
    this._currentKey = payload.pasteID;

    this._emitChange();
  },

  _onPristinePasteModified(payload) {
    this._currentKey = payload.tempKey;
    this._emitChange();
  }

//  _onCurrentPasteModified(payload) {
//    this._currentKey = payload.tempKey;
//    this._emitChange();
//  }
});
