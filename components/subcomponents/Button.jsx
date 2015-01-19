var Fluxxor = require('fluxxor');
var React = require('react');

var FluxMixin = Fluxxor.FluxMixin(React);

// Sidebar component
module.exports = React.createClass({
  mixins: [FluxMixin],

  propTypes: {
    src: React.PropTypes.string.isRequired,
    action: React.PropTypes.func,
    'helpText': React.PropTypes.string
  },

  render: function () {
    return (
        <img  className="icon help"
              src={ this.props.src }
              data-help={ this.props.helpText }/>
    )
  }
});
