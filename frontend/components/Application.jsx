var Fluxxor   = require('fluxxor'),
    React     = require('react/addons'),
    hljs = require('../public/lib/hljs');

var Editor        = require('./Editor.jsx'),
    ButtonPanel   = require('./subcomponents/ButtonPanel.jsx'),
    Button        = require('./subcomponents/Button.jsx'),
    Footer        = require('./Footer.jsx'),
//    ToolTip = require('./subcomponents/Tooltip.jsx'), // fixme: make this more react-y; do not rely on document object
    RevisionsList = require('./RevisionsList.jsx');


var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin,
    PureRenderMixin = React.addons.PureRenderMixin;

var Application;
module.exports = Application = React.createClass({
  mixins: [FluxMixin, PureRenderMixin, StoreWatchMixin('PasteStore',
                                                       'NavigationStore',
                                                       'PasteRevisionsStore',
                                                       'PasteLoadingStore')],

  getStateFromFlux() {
    var flux = this.getFlux();
    var NavigationStore       = flux.store('NavigationStore');
    var PasteRevisionsStore   = flux.store('PasteRevisionsStore');
    var PasteStore            = flux.store('PasteStore');
    var PasteLoadingStore     = flux.store('PasteLoadingStore');
    var HighlightedPasteStore = flux.store('HighlightedPasteStore');

    return {
      currentKey:             NavigationStore.getCurrentKey(),
      currentLanguage :       NavigationStore.getCurrentLanguage(),
      currentRevisions:       PasteRevisionsStore.getRevisionsOfCurrentPaste(),
      unsavedRevisions:       PasteRevisionsStore.getUnsavedRevisionsOfCurrentPaste(),
      currentPasteData:       PasteStore.getPaste( NavigationStore.getCurrentKey() ),
      highlightedPasteData:   HighlightedPasteStore.getHighlightedPaste( NavigationStore.getCurrentKey() ),
      loadingRevisions:       PasteLoadingStore.getLoadingPastes(),
      failedLoadingRevisions: PasteLoadingStore.getFailedLoadingPastes()
    };
  },

  componentDidMount() {
    if(this.state.currentKey.length > 0) {
      this.getFlux().actions.loadPaste(this.state.currentKey)
    }

    this._setKeybindings();
  },

  _setKeybindings() {
    Mousetrap.bind(['meta+s', 'ctrl+s'], (e) => {
      // save with cmd/ctrl-s
      e.preventDefault();
      this._saveCurrentPaste();
    });

    Mousetrap.bind('esc', () => {
      // esc to return from editor to highlighted version of a paste
      this.getFlux().actions.pasteSelected(this.state.currentKey);
    });
  },

  _saveCurrentPaste() {
    if(!this._saveIsDisabled()){
      var parentPasteKey = this.state.currentRevisions.toJS()[0]; // could be any key in the chain.
      this.getFlux().actions.savePaste(this.state.currentKey,
                                       parentPasteKey,
                                       this.state.currentPasteData.pasteContent);
    }
  },

  _pasteContentChanged(newValue) {
    this.getFlux().actions.pasteModified(this.state.currentKey, newValue);
  },

  _saveIsDisabled() {
    var pasteData = this.state.currentPasteData;
    return pasteData.pasteContent.length === 0 || pasteData.isClean
  },

  render() {
    var pasteData = this.state.currentPasteData;
    var highlightedPasteData = this.state.highlightedPasteData;

    return (
        <div id="main-container">
          <Editor valueLink           = { pasteData.pasteContent }
                  onDirty             = { this.getFlux().actions.pristinePasteModified
                                                                .bind(null, this.state.currentKey) }
                  onChange            = { this._pasteContentChanged }
                  valueIsPristine     = { pasteData.isClean }
                  highlightedValue    = { highlightedPasteData } />

          <nav id="sidebar">
              <ButtonPanel>
                  <Button helpText="create a new document, starting a new revision chain."
                          src="public/images/icon-new.png"
                          action={ this.getFlux().actions.newPaste }
                          disabled={ false } />
                  <Button helpText="clone the current paste, starting a new revision chain."
                          src="public/images/icon-clone.png"
                          action={ this.getFlux().actions.clonePaste.bind(null, this.state.currentKey) }
                          disabled={ false } />
                  <Button helpText="save the current paste (assigns a key and disables further editing)."
                          src="public/images/icon-save.png"
                          action={ this._saveCurrentPaste }
                          disabled={ this._saveIsDisabled() } />
              </ButtonPanel>
              <RevisionsList  currentRevisions       = { this.state.currentRevisions }
                              unsavedRevisions       = { this.state.unsavedRevisions }
                              loadingRevisions       = { this.state.loadingRevisions }
                              failedLoadingRevisions = { this.state.failedLoadingRevisions }
                              selectedRevision       = { this.state.currentKey } />
          </nav>

          <Footer selectedLanguage={ this.state.currentLanguage }
                  allLanguages={ hljs.listLanguages() }
                  languageSelectDisabled={ !pasteData.isClean }
                  onSelectLanguage={ this.getFlux().actions.languageSelected.bind(null) }/>
        </div>
    );
  }
});
