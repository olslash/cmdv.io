var Fluxxor = require('fluxxor');

var constants = require('../constants'),
    Immutable = require('immutable');

// NavigationStore
module.exports = Fluxxor.createStore({
  initialize: function () {
    this._currentKey = '';
    this._currentLanguage = null;

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
    return Immutable.Map({
      _currentKey:      this._currentKey,
      _currentLanguage: this._currentLanguage
    });
  },

  replaceState(newState) {
    this._currentKey = newState.get('_currentKey');
    this._currentLanguage = newState.get('_currentLanguage');

    this._emitChange();
  },

  getCurrentKey() {
    return this._currentKey;
  },

  getCurrentLanguage() {
    return this._currentLanguage;
  },

  _setCurrentKey(pasteID) {
    this._currentKey = pasteID;
  },

  _setCurrentLanguage(language) {
    this._currentLanguage = language;
    this._setCurrentKey(this._currentKey); // force url update with type extension
  },

  _onPageLoad(payload) {
    var path = payload.path;
    var routeRegex = /^\/([a-zA-Z]+)\.?([a-zA-Z]*)$/; // '/(key).(language)?'
    var routeComponents = path.match(routeRegex);

    if(routeComponents !== null) {
      if(routeComponents[2].length > 0) {
        this._currentLanguage = routeComponents[2];
      }
      this._setCurrentKey(routeComponents[1])
    }

    this._emitChange();
  },

  _onPasteLoaded() {
    if(this._currentLanguage === null) {
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
    this._setCurrentKey(payload.pasteID);

    this._emitChange();
  },

  _onPristinePasteModified(payload) {
    this._setCurrentKey(payload.tempKey);

    this._emitChange();
  },

  _onPasteSaved(payload) {
    if (this._currentKey === payload.tempID) {
      this._setCurrentKey(payload.pasteID);
    }

    this._emitChange();
  },

  _onLanguageSelected(payload) {
    this._setCurrentLanguage(payload.language);

    this._emitChange();
  }
});
