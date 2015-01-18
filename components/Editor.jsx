var Fluxxor = require('fluxxor');
var React = require('react/addons');

var FluxMixin = Fluxxor.FluxMixin(React),
    PureRenderMixin = React.addons.PureRenderMixin;

// Editor component
module.exports = React.createClass({
  mixins: [FluxMixin, PureRenderMixin],

  propTypes: {
    initialContent: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      value: this.props.initialContent,
      isClean: true
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.initialContent
    });
  },

  _onChange(e) {
    if(this.state.isClean) {
      this.getFlux().actions.pasteModified();
    }

    this.setState({
      value: e.target.value,
      isClean: false
    });
  },

  render: function () {
    return (
      <section id="paste-content">
        <textarea value={ this.state.value }
                  onChange={ this._onChange }
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck="false"
                  autoFocus />
      </section>
    );
  }
});
