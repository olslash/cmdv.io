var Fluxxor = require('fluxxor'),
    React = require('react/addons');

// ButtonPanel component
module.exports = React.createClass({
  render() {
    return (
        <div className="buttons-container">
          { this.props.children }
        </div>
    )
  }
});
