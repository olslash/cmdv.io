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
    currentRevisions: React.PropTypes.instanceOf(Immutable.List),
    unsavedRevisions: React.PropTypes.instanceOf(Immutable.List),
    loadingRevisions: React.PropTypes.instanceOf(Immutable.Set),
    failedLoadingRevisions: React.PropTypes.instanceOf(Immutable.Set),
    selectedRevision: React.PropTypes.string
  },

  render: function () {
    var pasteSelectedAction = this.getFlux().actions.pasteSelected;
    var loading = this.props.loadingRevisions.toObject();
    var failedLoading = this.props.failedLoadingRevisions.toObject();

    function listItem(text, classList, setBrowserHistory) {
      return (
        <li onClick  ={ pasteSelectedAction.bind(null, text, setBrowserHistory, false) }
            className={ classList }
            key      ={ text }>

          { text }

          <img src="public/images/ajax-loader.gif"
               className={ loading[text] || 'hidden' } />
          <img src="public/images/icon-fail.png"
               className={ failedLoading[text] || 'hidden' } />
        </li>
      )
    }

    var currentItems = this.props.currentRevisions.toJS().map( pasteID => {
      var isActive = this.props.selectedRevision === pasteID;
      var classes = cx({
        active: isActive
      });

      return listItem(pasteID, classes, true);
    });

    var unsavedItems = this.props.unsavedRevisions.toJS().map( pasteID => {
      var isActive = this.props.selectedRevision === pasteID;
      var classes = cx({
        active: isActive,
        unsaved: true
      });

      return listItem(pasteID, classes, false)
    } );

    var hideHeader = currentItems.length === 0 && unsavedItems.length === 0;
    var headerClasses = cx({'hidden': hideHeader});

    return (
        <div className="sidebar-item">
          <h1 className={ headerClasses }>REVISIONS</h1>
          <ol className="revisions">{ currentItems }</ol>
          <ol className="revisions">{ unsavedItems }</ol>
        </div>
    );
  }
});
