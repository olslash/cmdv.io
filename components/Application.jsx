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
  mixins: [FluxMixin, PureRenderMixin, StoreWatchMixin('NavigationStore', 'PasteRevisionsStore')],

  getStateFromFlux() {
    var flux = this.getFlux();

    return {
      currentKey:       flux.store('NavigationStore').getCurrentKey(),
      currentRevisions: flux.store('PasteRevisionsStore').getRevisionsOfCurrentPaste(),
      unsavedRevisions: flux.store('PasteRevisionsStore').getUnsavedRevisionsOfCurrentPaste(),
      editorContent:    flux.store('PasteStore').getPaste( flux.store('NavigationStore').getCurrentKey() )
    };
  },

  componentDidMount() {
    this.getFlux().actions.loadPaste(this.state.currentKey)
  },

  render() {
    return (
        <div id="main-container">
          <ToolTip />
          <Editor initialContent={ this.state.editorContent }
                  onDirty={ this.getFlux().actions.currentPasteModified }/>

          <nav id="sidebar">
              <ButtonPanel>
                  <Button data-help="create a new document, starting a new revision chain."
                          src="public/images/icon-new.png" />
                  <Button data-help="clone the current paste, starting a new revision chain."
                          src="public/images/icon-clone.png" />
                  <Button data-help="save the current paste (assigns a key and disables further editing)."
                          src="public/images/icon-save.png" />
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

//jumomito
