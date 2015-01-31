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
  mixins: [FluxMixin, PureRenderMixin, StoreWatchMixin('PasteStore', 'NavigationStore', 'PasteRevisionsStore')],

  getStateFromFlux() {
    var flux = this.getFlux();

    return {
      currentKey:        flux.store('NavigationStore').getCurrentKey(),
      currentRevisions:  flux.store('PasteRevisionsStore').getRevisionsOfCurrentPaste(),
      unsavedRevisions:  flux.store('PasteRevisionsStore').getUnsavedRevisionsOfCurrentPaste(),
      currentPasteData: flux.store('PasteStore').getPaste( flux.store('NavigationStore').getCurrentKey() )
    };
  },

  componentDidMount() {
    if(this.state.currentKey.length > 0) {
      this.getFlux().actions.loadPaste(this.state.currentKey)
    }
  },

  _saveCurrentPaste() {
    var parentPasteKey = this.state.currentRevisions.toJS()[0]; // could be any key in the chain.
    this.getFlux().actions.savePaste(this.state.currentKey, parentPasteKey, this.state.editedPasteContent);
  },

  _pasteContentChanged(newValue) {
    this.getFlux().actions.pasteModified(this.state.currentKey, newValue);
  },

  render() {
    return (
        <div id="main-container">
          <ToolTip />

          <Editor valueLink  =       { this.state.currentPasteData.paste }
                  onDirty=       { this.getFlux().actions.pristinePasteModified.bind(null, this.state.currentKey) }
                  onChange=      { this._pasteContentChanged }
                  valueIsPristine = { this.state.currentPasteData.isClean  }/>

          <nav id="sidebar">
              <ButtonPanel>
                  <Button helpText="create a new document, starting a new revision chain."
                          src="public/images/icon-new.png" />
                  <Button helpText="clone the current paste, starting a new revision chain."
                          src="public/images/icon-clone.png" />
                  <Button helpText="save the current paste (assigns a key and disables further editing)."
                          src="public/images/icon-save.png"
                          action={ this._saveCurrentPaste }
                          disabled={ false }/>
              </ButtonPanel>
              <RevisionsList  currentRevisions={ this.state.currentRevisions }
                              unsavedRevisions={ this.state.unsavedRevisions }
                              selectedRevision={ this.state.currentKey }/>
          </nav>

          <Footer />
        </div>
    );
  }
});
