var Fluxxor   = require('fluxxor'),
    React     = require('react/addons'),
    Immutable = require('immutable');

//var NavListItem = require('./NavListItem.jsx');
var FluxMixin = Fluxxor.FluxMixin(React),
    PureRenderMixin = React.addons.PureRenderMixin;

// Sidebar component
module.exports = React.createClass({
  mixins: [FluxMixin, PureRenderMixin],

  propTypes: {
    currentRevisions: React.PropTypes.instanceOf(Immutable.List),
    unsavedRevisions: React.PropTypes.instanceOf(Immutable.List), // immutableJS array
    selectedRevision: React.PropTypes.string  // immutableJS array
  },

  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {

  },

  render: function () {
//    console.log(this.props);
//    var revisions = [];
//
//    if (this.props.items) {
//      revisions = this.props.items.map(itemName => {
//        var className = this.props.selectedItem === itemName ? 'active' : '';
//
//        return <li className={ className } key={ itemName }>
//          <span className="num">| </span> { itemName }
//        </li>
//      });
//    }
//    if (this.props.unsavedItems) {
//      this.props.unsavedItems.forEach(itemName => {
//        var className = this.props.selectedItem === itemName ? 'active' : '';
//
//        revisions.push(<li className={ className } key={ itemName }>
//          <span className="num">| </span> { itemName }
//        </li>)
//      })
//    }
//
    return (
        <div className="sidebar-item">
          <h1>REVISIONS</h1>
          <ol className="revisions">{ this.props.currentRevisions.toJS() }</ol>
          <ol className="revisions">{ this.props.unsavedRevisions.toJS() }</ol>
        </div>
    );
  }
});
