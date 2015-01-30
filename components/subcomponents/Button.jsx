var Fluxxor = require('fluxxor');
var React = require('react');

var FluxMixin = Fluxxor.FluxMixin(React);

// Sidebar component
module.exports = React.createClass({
  mixins: [FluxMixin],

  propTypes: {
    src: React.PropTypes.string.isRequired,
    action: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    'helpText': React.PropTypes.string
  },

  render: function () {
    return (
        <img  className="icon help"
              src={ this.props.src }
              onClick={ this.props.disabled ? null : this.props.action }
              data-help={ this.props.helpText }/>
    )
  }
});
