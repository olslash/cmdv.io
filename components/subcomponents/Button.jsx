var Fluxxor = require('fluxxor');
var React = require('react');

var FluxMixin = Fluxxor.FluxMixin(React);

// Sidebar component
module.exports = React.createClass({
  mixins: [FluxMixin],

  propTypes: {
    src: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {

  },

  render: function () {
    return (
        <img className="icon help" {...this.props} />
    )
  }
});
