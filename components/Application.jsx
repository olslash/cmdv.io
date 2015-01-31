var Fluxxor = require('fluxxor'),
    React   = require('react/addons');

var Editor        = require('./Editor.jsx'),
    ToolTip       = require('./subcomponents/Tooltip.jsx'),
    ButtonPanel   = require('./subcomponents/ButtonPanel.jsx'),
    Button        = require('./subcomponents/Button.jsx'),
    Footer        = require('./Footer.jsx'),
    RevisionsList = require('./RevisionsList.jsx');

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin,
    PureRenderMixin = React.addons.PureRenderMixin;

// Application component
module.exports = React.createClass({
  mixins: [FluxMixin, PureRenderMixin, StoreWatchMixin('PasteStore',
                                                       'NavigationStore',
                                                       'PasteRevisionsStore',
                                                       'PasteLoadingStore')],

  getStateFromFlux() {
    var flux = this.getFlux();

    return {
      currentKey:       flux.store('NavigationStore').getCurrentKey(),
      currentRevisions: flux.store('PasteRevisionsStore').getRevisionsOfCurrentPaste(),
      unsavedRevisions: flux.store('PasteRevisionsStore').getUnsavedRevisionsOfCurrentPaste(),
      currentPasteData: flux.store('PasteStore')
                            .getPaste( flux.store('NavigationStore').getCurrentKey() ),
      loadingRevisions: flux.store('PasteLoadingStore').getLoadingPastes(),
      failedLoadingRevisions: flux.store('PasteLoadingStore').getFailedLoadingPastes()
    };
  },

  componentDidMount() {
    if(this.state.currentKey.length > 0) {
      this.getFlux().actions.loadPaste(this.state.currentKey)
    }
  },

  _saveCurrentPaste() {
    var parentPasteKey = this.state.currentRevisions.toJS()[0]; // could be any key in the chain.
    this.getFlux().actions.savePaste(this.state.currentKey,
                                     parentPasteKey,
                                     this.state.currentPasteData.pasteContent);
  },

  _pasteContentChanged(newValue) {
    this.getFlux().actions.pasteModified(this.state.currentKey, newValue);
  },

  render() {
    var pasteData = this.state.currentPasteData;
    var saveDisabled = pasteData.isClean || pasteData.pasteContent.length === 0;

    return (
        <div id="main-container">
          <ToolTip />

          <Editor valueLink       = { pasteData.pasteContent }
                  onDirty         = { this.getFlux().actions.pristinePasteModified
                                                             .bind(null, this.state.currentKey) }
                  onChange        = { this._pasteContentChanged }
                  valueIsPristine = { pasteData.isClean } />

          <nav id="sidebar">
              <ButtonPanel>
                  <Button helpText="create a new document, starting a new revision chain."
                          src="public/images/icon-new.png" />
                  <Button helpText="clone the current paste, starting a new revision chain."
                          src="public/images/icon-clone.png" />
                  <Button helpText="save the current paste (assigns a key and disables further editing)."
                          src="public/images/icon-save.png"
                          action={ this._saveCurrentPaste }
                          disabled={ !pasteData.pasteContent.length > 0 } />
              </ButtonPanel>
              <RevisionsList  currentRevisions       = { this.state.currentRevisions }
                              unsavedRevisions       = { this.state.unsavedRevisions }
                              loadingRevisions       = { this.state.loadingRevisions }
                              failedLoadingRevisions = { this.state.failedLoadingRevisions }
                              selectedRevision       = { this.state.currentKey } />
          </nav>

          <Footer />
        </div>
    );
  }
});
