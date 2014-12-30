var Fluxxor = require('Fluxxor');

var constants = require('../constants');

// NavigationStore
module.exports = Fluxxor.createStore({
  initialize: function () {
    var currentKey = '';
    var currentLanguage = '';

    this.bindActions(
      constants.PAGE_LOADED, this.onPageLoad
    )
  },

  onPageLoad: function(payload) {
    var path = payload.path;


    var routeRegex = /^\/([a-zA-Z]+)\.?([a-zA-Z]*)$/;
    var routeComponents = path.match(routeRegex);

    if(routeComponents !== null) {
      this.currentKey = routeComponents[1];
      this.currentLanguage = routeComponents[2];
    }
    this.emit('change');
  }
});
