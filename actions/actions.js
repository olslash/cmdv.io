var config = require('../frontend_config.js'),
    constants = require('../constants'),
    helpers   = require('../helpers');

var uuidCounter = 0;

module.exports = {
  savePaste(pasteID, pasteContent) {
    pasteID = pasteID || '';

    this.dispatch(constants.PASTE_SAVING, { pasteID });
    $.post(`${config.serverBaseURL}/pastes/${pasteID}`, pasteContent)
      .done((response) => {
        this.dispatch(constants.PASTE_SAVED, {
          pasteID: response.pasteID,
          pasteContent: response.pasteContent,
          revisions: response.revisions
        })
      })

      .fail((error) => {
        this.dispatch(constants.PASTE_SAVE_FAILED, { pasteID })
      });
  },

  loadPaste(pasteID) {
    this.dispatch(constants.PASTE_LOADING, { pasteID });
    $.get(`${config.serverBaseURL}/pastes/${pasteID}`)
      .done((response) => {
        this.dispatch(constants.PASTE_LOADED, {
          pasteID: response.pasteID,
          pasteContent: response.pasteContent,
          revisions: response.revisions
        })
      })

      .fail((error) => {
        this.dispatch(constants.PASTE_LOAD_FAILED, { pasteID })
      });
  },

  pageLoaded(urlPath) {
    this.dispatch(constants.PAGE_LOADED, {path: urlPath})
  },

  currentPasteModified() {
    var tempKey = '(unsaved)' + uuidCounter;
    this.dispatch(constants.CURRENT_PASTE_MODIFIED, {
      tempKey: tempKey
    })
  }
};
