var Fluxxor = require('fluxxor');
var React = require('react/addons');

var FluxMixin = Fluxxor.FluxMixin(React),
    cx        = React.addons.classSet;

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
    var classes = cx({
      'icon': true,
      'help': true,
      'disabled': this.props.disabled
    });
    return (
        <img  className={ classes }
              src={ this.props.src }
              onClick={ this.props.disabled ? null : this.props.action }
              data-help={ this.props.helpText }/>
    )
  }
});
