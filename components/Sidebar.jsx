var Fluxxor = require('fluxxor');
var React = require('react');

var FluxMixin = Fluxxor.FluxMixin(React);

// Sidebar component
module.exports = React.createClass({
  mixins: [FluxMixin],

  propTypes: {
//    onSave: React.PropTypes.func.isRequired,
//    value: React.PropTypes.string
  },

  getInitialState: function () {
    return {

    };
  },

  componentDidMount: function () {

  },

  render: function () {
    return (
      <nav id="sidebar">
        <div className="buttons-container">
          <img className="icon help" data-help="create a new document, starting a new revision chain." src="public/images/icon-new.png" />
          <img className="icon help" data-help="clone the current paste, starting a new revision chain." src="public/images/icon-clone.png" />
          <img className="icon help" data-help="save the current paste (assigns a key and disables further editing)." src="public/images/icon-save.png" />
        </div>
        <div className="sidebar-item">
          <h1>REVISIONS</h1>
            <ul className="revisions">
              <li className="">
                <span className="num">0 | </span>
                somemnemonic</li>
              <li className="active">
                <span className="num">1 | </span>
                othrmnemonic</li>
              <li className="unsaved">
                <span className="num">2 | </span>
                (unsaved)</li>
            </ul>
        </div>

        <div className="sidebar-item">
          <h1>SAVED PASTES</h1>
          <ul className="revisions">
            <li className="">
              <span className="num">0 | </span>
              somemnemonic
              <img src="public/images/icon-fail.png" /></li>
            <li className="">
              <span className="num">0 | </span>
              othrmnemonic
              <img src="public/images/ajax-loader.gif" /></li>
          </ul>
        </div>
      </nav>
    );
  }
});
