var Fluxxor = require('fluxxor');
var React = require('react');

var FluxMixin = Fluxxor.FluxMixin(React);

// Editor component
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
      <section id="paste-content">
        <textarea autoComplete="off" autoCapitalize="none" spellCheck="false" autoFocus>
            text
        </textarea>
      </section>
    );
  }
});
