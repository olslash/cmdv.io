// The HistoryManager is not a standard store, but requires much of the functionality given to stores in the Flux
// architecture. Its responsibility is to track application state over time, keeping a history stack of those
// state changes that should affect undo/redo operations (ie. front- and back-button).

var Fluxxor = require('fluxxor'),
    Immutable = require('immutable');

var constants = require('../constants');

// HistoryManager
module.exports = Fluxxor.createStore({
  initialize() {
    this._applicationState = Immutable.List();
    this._cursorPosition = 1; // 1-indexed for convenience with take/size

    this.bindActions(
      constants.PAGE_LOADED, this._onPageLoad,
      constants.PASTE_SELECTED, this._onPasteSelected,
      constants.LANGUAGE_SELECTED, this._onLanguageSelected
    )
  },

  moveStateForward() {
    // no action if we're already at the most recent state
    if(this._cursorPosition === this._applicationState.size) return;

    var appStateAtCursorPlusOne = this._applicationState.get(this._cursorPosition);
    this._cursorPosition += 1;
    this.flux.stores['NavigationStore'].replaceState(appStateAtCursorPlusOne['NavigationStore']);
    console.log('app state moved forward; cursor is at', this._cursorPosition);
  },

  moveStateBack() {
    if (this._cursorPosition === 1) return;

    var appStateAtCursorMinusOne = this._applicationState.get(this._cursorPosition - 2);
    this._cursorPosition -= 1;
    this.flux.stores['NavigationStore'].replaceState(appStateAtCursorMinusOne['NavigationStore']);
    console.log('app state moved back; cursor is at', this._cursorPosition);
  },

  _saveApplicationState(stateObject) {
    // clear everything to the right of the cursor, then add the new state to the end
    this._applicationState = this._applicationState.take(this._cursorPosition)
                                                   .push(stateObject);
    // move cursor to end
    this._cursorPosition = this._applicationState.size;
  },

  _onPageLoad() {
    this.waitFor(['NavigationStore'], function (NavigationStore) {

      var navigationStoreState = NavigationStore.getState();
      this._saveApplicationState({
        NavigationStore: navigationStoreState
      });
    });
  },

  _onPasteSelected() {
    this.waitFor(['NavigationStore'], function (NavigationStore) {
      
      var navigationStoreState = NavigationStore.getState();
      this._saveApplicationState({
        NavigationStore: navigationStoreState
      });
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
