var Fluxxor = require('fluxxor');

var constants = require('../constants'),
    Immutable = require('immutable');

// NavigationStore
module.exports = Fluxxor.createStore({
  initialize: function () {
    this._state = Immutable.Map({
      currentKey: '',
      currentLanguage: null
    });

    this.bindActions(
      constants.PAGE_LOADED, this._onPageLoad,
      constants.PASTE_LOADED, this._onPasteLoaded,
      constants.PASTE_SELECTED, this._onPasteSelected,
      constants.PRISTINE_PASTE_MODIFIED, this._onPristinePasteModified,
      constants.PASTE_SAVED, this._onPasteSaved,
      constants.LANGUAGE_SELECTED, this._onLanguageSelected
    )
  },

  _emitChange() {
    this.emit('change');
  },

  getState() {
    return this._state;
  },

  replaceState(newState) {
    this._state = newState;
//    this._updateURL();

    this._emitChange();
  },

  getCurrentKey() {
    return this._state.get('currentKey');
  },

  getCurrentLanguage() {
    return this._state.get('currentLanguage');
  },

  _updateURL() {
    // maintain the correct URL across state transitions
    var key = this.getCurrentKey();
    var language = this.getCurrentLanguage();
    var newURL = key + (language ? language : '');
    window.history.replaceState(null, null, newURL);
  },

  _setCurrentKey(pasteID) {
    this._state = this._state.set('currentKey', pasteID);
  },

  _setCurrentLanguage(language) {
    this._state = this._state.set('currentLanguage', language);
  },

  _onPageLoad(payload) {
    var path = payload.path;
    var routeRegex = /^\/([a-zA-Z]+)\.?([a-zA-Z]*)$/; // '/(key).(language)?'
    var routeComponents = path.match(routeRegex);

    if(routeComponents !== null) {
      if(routeComponents[2].length > 0) {
        this._setCurrentLanguage(routeComponents[2]);
      }
      this._setCurrentKey(routeComponents[1])
    }

    this._emitChange();
  },

  _onPasteLoaded() {
    if(this.getCurrentLanguage() === null) {
      this.waitFor(['HighlightedPasteStore'], function (HighlightedPasteStore) {
        var detectedLanguage = HighlightedPasteStore.getDetectedLanguage();

        if (detectedLanguage !== null) {
          this._setCurrentLanguage(detectedLanguage);

          this._emitChange();
        }
      });
    }
  },

  _onPasteSelected(payload) {
    if(payload.pasteID !== this.getCurrentKey()) {
      this._setCurrentKey(payload.pasteID);

      this._emitChange();
    }
  },

  _onPristinePasteModified(payload) {
    this._setCurrentKey(payload.tempKey);

    this._emitChange();
  },

  _onPasteSaved(payload) {
    if (this.getCurrentKey() === payload.tempID) {
      this._setCurrentKey(payload.pasteID);
    }

    this._emitChange();
  },

  _onLanguageSelected(payload) {
    this._setCurrentLanguage(payload.language);

    this._emitChange();
  }
});
