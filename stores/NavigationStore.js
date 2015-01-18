var Fluxxor = require('Fluxxor');

var constants = require('../constants');

// NavigationStore
module.exports = Fluxxor.createStore({
  initialize: function () {
    var _currentKey = '';
    var _currentLanguage = '';

    this.bindActions(
      constants.PAGE_LOADED, this._onPageLoad,
      constants.CURRENT_PASTE_MODIFIED, this._onCurrentPasteModified
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
      this.currentLanguage = routeComponents[2];
    }
    this.emit('change');
  },

  _onCurrentPasteModified(payload) {
    this._currentKey = payload.tempKey;
    this._emitChange();
  }
});
