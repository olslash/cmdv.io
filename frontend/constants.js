module.exports = {
  LOAD_PASTE: 'LOAD_PASTE', // ask to load a particular paste
  PASTE_LOADING: 'PASTE_LOADING', // particular paste is loading
  PASTE_LOADED: 'PASTE_LOADED', // particular paste has loaded
  PASTE_LOAD_FAILED: 'PASTE_LOAD_FAILED', // loading of a particular paste failed

  SAVE_PASTE: 'SAVE_PASTE', // save a paste, either with a parent ID as a revision, or without as a new chain
  PASTE_SAVING: 'PASTE_SAVING', // saving a particular paste
  PASTE_SAVED: 'PASTE_SAVED', // particular paste has been saved
  PASTE_SAVE_FAILED: 'PASTE_SAVE_FAILED', // saving of a particular paste failed

  PAGE_LOADED: 'PAGE_LOADED', // the site has loaded, at a particular URL
  PASTE_SELECTED: 'PASTE_SELECTED', // user selects a paste to view
  LANGUAGE_SELECTED: 'LANGUAGE_SELECTED', // user selects a language from the selectbox

  PRISTINE_PASTE_MODIFIED: 'PRISTINE_PASTE_MODIFIED', // called by editor when a clean paste is edited by the user
  PASTE_MODIFIED: 'PASTE_MODIFIED' // called by editor when a paste is changed
};
