var Fluxxor   = require('fluxxor'),
    React     = require('react/addons'),
    Immutable = require('immutable');

//var NavListItem = require('./NavListItem.jsx');
var FluxMixin = Fluxxor.FluxMixin(React),
    PureRenderMixin = React.addons.PureRenderMixin,
    cx = React.addons.classSet;

// Sidebar component
module.exports = React.createClass({
  mixins: [FluxMixin, PureRenderMixin],

  propTypes: {
    currentRevisions: React.PropTypes.instanceOf(Immutable.List), // immutableJS array
    unsavedRevisions: React.PropTypes.instanceOf(Immutable.List), // immutableJS array
    selectedRevision: React.PropTypes.string
  },

  render: function () {
    var pasteSelectedAction = this.getFlux().actions.pasteSelected;

    var listItem = (text, classList) => <li onClick  ={ pasteSelectedAction.bind(null, text) }
                                            className={ classList }
                                            key      ={ text }>
                                            { text } </li>;

    var currentItems = this.props.currentRevisions.toJS().map( pasteID => {
      var isActive = this.props.selectedRevision === pasteID;
      var classes = cx({
        active: isActive
      });

      return listItem(pasteID, classes);
    });

    var unsavedItems = this.props.unsavedRevisions.toJS().map( pasteID => {
      var isActive = this.props.selectedRevision === pasteID;
      var classes = cx({
        active: isActive,
        unsaved: true
      });

      return listItem(pasteID, classes)
    } );

    return (
        <div className="sidebar-item">
          <h1>REVISIONS</h1>
          <ol className="revisions">{ currentItems }</ol>
          <ol className="revisions">{ unsavedItems }</ol>
        </div>
    );
  }
});
