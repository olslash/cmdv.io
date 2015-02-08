// The HistoryManager is not a standard store, but requires much of the functionality given to stores in the Flux
// architecture. Its responsibility is to track application state over time, keeping a history stack of those
// state changes that should affect undo/redo operations (ie. front- and back-button).

var Fluxxor = require('fluxxor'),
    Immutable = require('immutable');

var constants = require('../constants');

// HistoryManager
module.exports = Fluxxor.createStore({
  initialize() {
    this._applicationStateHistory = Immutable.List();
    this._cursorPosition = 0;

    this.bindActions(
      constants.PAGE_LOADED, this._onPageLoaded,
      constants.PASTE_LOADED, this._onPasteLoaded, // only affects history if navstore's current lang changes as a result
      constants.PASTE_SELECTED, this._onPasteSelected,
      constants.LANGUAGE_SELECTED, this._onLanguageSelected
    )
  },

  moveStateForward() {
    // no action if we're already at the most recent state
    if(this._cursorPosition === this._applicationStateHistory.size) return;

    var nextAppState = this._applicationStateHistory.get(this._cursorPosition);
    this._cursorPosition += 1;
    this.flux.stores['NavigationStore'].replaceState(nextAppState['NavigationStore']);
  },

  moveStateBack() {
    if (this._cursorPosition === 1) return;

    var PreviousAppState = this._applicationStateHistory.get(this._cursorPosition - 1);
    this._cursorPosition -= 1;
    this.flux.stores['NavigationStore'].replaceState(PreviousAppState['NavigationStore']);
  },

  _saveApplicationState(stateObject) {
    // clear everything to the right of the cursor, then add the new state to the end
    this._applicationStateHistory = this._applicationStateHistory.take(this._cursorPosition + 1)
                                                                 .push(stateObject);
    // move cursor to end
    this._cursorPosition = this._applicationStateHistory.size - 1;
  },

  _onPageLoaded() {
    this.waitFor(['NavigationStore'], function (NavigationStore) {
      var navigationStoreState = NavigationStore.getState();

      this._saveApplicationState({
        NavigationStore: navigationStoreState
      });
    });
  },

  _onPasteLoaded() {
    this.waitFor(['NavigationStore'], function (NavigationStore) {
      var navigationStoreState = NavigationStore.getState();
      var lastNavigationStoreState = this._applicationStateHistory.get(this._cursorPosition)['NavigationStore'];

      if (lastNavigationStoreState === undefined || lastNavigationStoreState !== navigationStoreState) {
        this._saveApplicationState({
          NavigationStore: navigationStoreState
        });
      }
    });
  },

  _onPasteSelected() {
    this.waitFor(['NavigationStore'], function (NavigationStore) {
      // check the last entry for navigationstore. no changes? do not save the history.
      var navigationStoreState = NavigationStore.getState();
      var lastNavigationStoreState = this._applicationStateHistory.get(this._cursorPosition)['NavigationStore'];

      if (lastNavigationStoreState === undefined || lastNavigationStoreState !== navigationStoreState) {
        this._saveApplicationState({
          NavigationStore: navigationStoreState
        });
      }
    });
  },

  _onLanguageSelected() {
    this.waitFor(['NavigationStore'], function (NavigationStore) {

      var navigationStoreState = NavigationStore.getState();
      this._saveApplicationState({
        NavigationStore: navigationStoreState
      });
    });
  }
});
