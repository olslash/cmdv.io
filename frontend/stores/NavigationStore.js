var Fluxxor = require('fluxxor');

var constants = require('../constants');

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

  getCurrentKey() {
    return this._currentKey;
  },

  getCurrentLanguage() {
    return this._currentLanguage;
  },

  _setCurrentKey(pasteID, setHistory, replaceState) {
    // do not set history for the same paste twice -- unless we are doing a replaceState
    if(setHistory && (this._currentKey !== pasteID || replaceState)) {

      var newURLState = pasteID;

      if(this._currentLanguage !== null) {
        newURLState += ('.' + this._currentLanguage);
      }

      var method = replaceState ? 'replaceState' : 'pushState';
      history[method]({ pasteID }, null, newURLState);
    }
    this._currentKey = pasteID;
  },

  _setCurrentLanguage(language) {
    this._currentLanguage = language;
    this._setCurrentKey(this._currentKey, true, true); // force url update with type extension
  },

  _onPageLoad(payload) {
    var path = payload.path;
    var routeRegex = /^\/([a-zA-Z]+)\.?([a-zA-Z]*)$/; // '/(key).(language)?'
    var routeComponents = path.match(routeRegex);

    if(routeComponents !== null) {
      if(routeComponents[2].length > 0) {
        this._currentLanguage = routeComponents[2];
      }
      this._setCurrentKey(routeComponents[1], true, true)
    }

    this._emitChange();
  },

  _onPasteLoaded() {
    this.waitFor(['HighlightedPasteStore'], function(HighlightedPasteStore) {
      var detectedLanguage = HighlightedPasteStore.getDetectedLanguage();
      if (this._currentLanguage === null && detectedLanguage !== null) {
        this._setCurrentLanguage(detectedLanguage);
        this._emitChange();
      }
    });
  },

  _onPasteSelected(payload) {
    this._setCurrentKey(payload.pasteID, payload.setHistory);

    this._emitChange();
  },

  _onPristinePasteModified(payload) {
    this._setCurrentKey(payload.tempKey, false);

    this._emitChange();
  },

  _onPasteSaved(payload) {
    if (this._currentKey === payload.tempID) {
      this._setCurrentKey(payload.pasteID, true);
    }

    this._emitChange();
  },

  _onLanguageSelected(payload) {
    this._setCurrentLanguage(payload.language);
    this._emitChange();
  }
});
