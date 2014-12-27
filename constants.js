var keyMirror = require('react/lib/keyMirror');

module.exports = {
  LOAD_PASTE: 'LOAD_PASTE', // load a particular paste
  PASTE_LOADING: 'PASTE_LOADING', // particular paste is loading
  PASTE_LOADED: 'PASTE_LOADED', // particular paste has loaded
  PASTE_LOAD_FAILED: 'PASTE_LOAD_FAILED', // loading of a particular paste failed

  SAVE_PASTE: 'SAVE_PASTE', // save a paste, either with ID as a revision, or without as a new revision
  PASTE_SAVING: 'PASTE_SAVING', // saving a particular paste
  PASTE_SAVED: 'PASTE_SAVED', // particular paste has been saved
  PASTE_SAVE_FAILED: 'PASTE_SAVE_FAILED' // saving of a particular paste failed
};
