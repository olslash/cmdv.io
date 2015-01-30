var Fluxxor = require('fluxxor');
var React = require('react/addons');

var FluxMixin = Fluxxor.FluxMixin(React),
    PureRenderMixin = React.addons.PureRenderMixin;

// Editor component
module.exports = React.createClass({
  mixins: [FluxMixin, PureRenderMixin],

  propTypes: {
    initialContent: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onDirty: React.PropTypes.func // function to call when a paste is modified for the first time
  },

  getInitialState: function () {
    return {
      value: this.props.initialContent,
      isClean: true
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.initialContent,
      isClean: true
    });
  },

  _onChange(e) {
    // fixme: should the application component hold all of the editor's state?
    // could be issues with state.value held in editor component and in application component...
    var newValue = e.target.value;

    if(this.state.isClean) {
      this.props.onDirty();
    }

    this.props.onChange(newValue);

    this.setState({
      value: newValue,
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
