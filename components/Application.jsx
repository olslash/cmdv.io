var Fluxxor = require('fluxxor'),
    React = require('react');

var Sidebar = require('./Sidebar.jsx'),
    Footer  = require('./Footer.jsx'),
    Editor  = require('./Editor.jsx');

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

// Application component
module.exports = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('NavigationStore', 'PasteLoadingStore', 'PasteStore')],

  getStateFromFlux() {
    return {
      currentKey: this.getFlux().store('NavigationStore').currentKey,
      currentLanguage: this.getFlux().store('NavigationStore').currentLanguage,
      isLoading: this.getFlux().store('PasteLoadingStore').isLoading(),
      pastes: this.getFlux().store('PasteStore').getPastes()
    };
  },

  componentDidMount() {
    this.getFlux().actions.loadPaste(this.state.currentKey)
  },

  render() {
    return (
        <div id="main-container">
          <Editor />
          <Sidebar />
          <Footer />
        </div>
    );
  }
});

//jumomito
