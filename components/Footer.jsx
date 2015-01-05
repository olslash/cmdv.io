var Fluxxor = require('fluxxor');
var React = require('react');

var FluxMixin = Fluxxor.FluxMixin(React);

// Footer component
module.exports = React.createClass({
  mixins: [FluxMixin],

  propTypes: {
//    onSave: React.PropTypes.func.isRequired,
//    value: React.PropTypes.string
  },

  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {

  },

  render: function () {
    return (
      <footer id="footer">
        <div className="footer-content">
          <span className="lang-select">Javascript</span>
          <span className="detected">(detected)</span>
        </div>
      </footer>
    );
  }
});
