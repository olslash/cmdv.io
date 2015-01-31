var Fluxxor = require('fluxxor');
var React = require('react/addons');

var FluxMixin = Fluxxor.FluxMixin(React),
    PureRenderMixin = React.addons.PureRenderMixin;

// Editor component
module.exports = React.createClass({
  mixins: [FluxMixin, PureRenderMixin],

  propTypes: {
    valueLink: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onDirty: React.PropTypes.func, // function to call when a paste is modified for the first time
    valueIsPristine: React.PropTypes.bool // is the content in valuelink an unmodified paste?
  },

  getInitialState: function () {
    return {
      isClean: this.props.valueIsPristine
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      isClean: nextProps.valueIsPristine
    });
  },

  _onChange(e) {
    var newValue = e.target.value;

    if(this.state.isClean) {
      this.props.onDirty(newValue);
    } else {
      this.props.onChange(newValue);
    }



    this.setState({
////      value: newValue,
      isClean: false
    });
  },

  render: function () {
    return (
      <section id="paste-content">
        <textarea value={ this.props.valueLink }
                  onChange={ this._onChange }
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck="false"
                  autoFocus />
      </section>
    );
  }
});
