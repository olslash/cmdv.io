var Fluxxor = require('Fluxxor');

var constants = require('../constants');

// NavigationStore
module.exports = Fluxxor.createStore({
  initialize: function () {
    var _currentKey = '';
    var _currentLanguage = '';

    this.bindActions(
      constants.PAGE_LOADED, this._onPageLoad
    )
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

  getCurrentKey() {
    return this._currentKey
  }
});
