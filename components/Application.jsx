var Fluxxor = require('fluxxor'),
    React = require('react/addons');

var Sidebar = require('./Sidebar.jsx'),
    Footer  = require('./Footer.jsx'),
    Editor  = require('./Editor.jsx');

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin,
    PureRenderMixin = React.addons.PureRenderMixin;

// Application component
module.exports = React.createClass({
  mixins: [FluxMixin, PureRenderMixin, StoreWatchMixin('NavigationStore', 'PasteRevisionsStore')],

  getStateFromFlux() {
    var flux = this.getFlux();

    return {
      currentKey: flux.store('NavigationStore').currentKey,
      currentRevisions: flux.store('PasteRevisionsStore').getRevisionsOfCurrentPaste(),
      unsavedRevisions: flux.store('PasteRevisionsStore').getUnsavedRevisionsOfCurrentPaste(),
      editorContent: flux.store('PasteStore').getPaste( flux.store('NavigationStore').getCurrentKey() )
    };
  },

  componentDidMount() {
    this.getFlux().actions.loadPaste(this.state.currentKey)
  },

  render() {
    return (
        <div id="main-container">
          <Editor initialContent={ this.state.editorContent }/>
          <Sidebar>
              <ButtonsPanel />
              <RevisionsList  currentRevisions={ this.state.currentRevisions }
                              unsavedRevisions={ this.state.unsavedRevisions }
                              selectedRevision={ this.state.currentKey }/>
          </Sidebar>
          <Footer />
        </div>
    );
  }
});

//jumomito
