var Fluxxor = require('fluxxor');
var React = require('react/addons');

//var NavListItem = require('./NavListItem.jsx');
var FluxMixin = Fluxxor.FluxMixin(React),
    PureRenderMixin = React.addons.PureRenderMixin;

// Sidebar component
module.exports = React.createClass({
  mixins: [FluxMixin, PureRenderMixin],

  propTypes: {
    currentRevisions: React.PropTypes.arrayOf(React.PropTypes.string),
    unsavedRevisions: React.PropTypes.arrayOf(React.PropTypes.string),
    selectedRevision: React.PropTypes.string
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
          <ol className="revisions">{ this.props.currentRevisions }</ol>
        </div>
    );
  }
});
