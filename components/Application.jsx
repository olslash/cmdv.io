var Fluxxor = require('fluxxor'),
    React = require('react');

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

// Application component
module.exports = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('NavigationStore', 'PasteStore')],

  getStateFromFlux() {
    return {
      currentKey: this.getFlux().store('NavigationStore').currentKey,
      currentLanguage: this.getFlux().store('NavigationStore').currentLanguage,
      loading: this.getFlux().store('PasteStore').isLoading,
      saving: this.getFlux().store('PasteStore').isSaving
    };
  },

  componentDidMount() {
    this.getFlux().actions.loadPaste(this.state.currentKey)
  },

  render() {
    return (
        <div id="paste">
        {this.state.loading && "LOADING!"}
        {this.getFlux().store('PasteStore').pastes[this.state.currentKey]}
          test
        </div>
    );
  }
});