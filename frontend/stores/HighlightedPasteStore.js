var Fluxxor = require('fluxxor'),
    Immutable = require('immutable'),
    constants = require('../constants');

module.exports = Fluxxor.createStore({
  initialize: function () {
    // cache highlighted results along with the language they were highlighted with
    this._highlightedPastes = Immutable.Map();
    this._initialDetectedLanguage = null;

    this.bindActions(
        constants.PASTE_LOADED, this._onPasteLoaded
    );
  },

  getDetectedLanguage() {
    return this._initialDetectedLanguage;
  },

  getHighlightedPaste(pasteID) {
    var rawPaste = this.flux.stores.PasteStore.getPaste(pasteID).pasteContent;
    if(rawPaste.length === 0) return '';
    var currentLanguage = this.flux.stores.NavigationStore.getCurrentLanguage();

    var cachedResult = this._tryCache(pasteID, currentLanguage);
    if(cachedResult) {
      return cachedResult.value;
    } else {
      var highlightResult = this._highlight(rawPaste, currentLanguage);

      if (this._initialDetectedLanguage === null && highlightResult.language !== undefined) {
        this._setDetectedLanguage(highlightResult.language);
      }
      this._cacheHighlightResult(pasteID, highlightResult.value, highlightResult.language);
//    this._emitChange();
      return highlightResult.value;
    }
  },

  _onPasteLoaded(payload) {
    var highlightResult = this._highlight(payload.pasteContent);
    if (this._initialDetectedLanguage === null && highlightResult.language !== undefined) {
      this._setDetectedLanguage(highlightResult.language)
    }
    this._cacheHighlightResult(payload.pasteID, highlightResult.value, highlightResult.language);
  },

  _tryCache(pasteID, language) {
    var existingCachedResult = this._highlightedPastes.get(pasteID);
    if (existingCachedResult === undefined || existingCachedResult.toJS().language !== language) {
      // cache miss
      return false;
    }
    // cache hit
    return existingCachedResult.toJS();
  },

  _highlight(value, languages) {
    if(languages && !Array.isArray(languages)) {
      languages = [languages];
    }

    return hljs.highlightAuto(value, languages);
  },

  _cacheHighlightResult(pasteID, result, language) {
    var pasteMap = Immutable.Map({
      value: result,
      language: language || null
    });
    this._highlightedPastes = this._highlightedPastes.set(pasteID, pasteMap);
  },

  _setDetectedLanguage(language) {
    this._initialDetectedLanguage = language;
  }
});
