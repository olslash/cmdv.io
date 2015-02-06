var Fluxxor = require('fluxxor'),
    React = require('react/addons');

var ButtonPanel;
module.exports = ButtonPanel = React.createClass({
  render() {
    return (
        <div className="buttons-container">
          { this.props.children }
        </div>
    )
  }
});
