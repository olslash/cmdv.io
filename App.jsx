var React = require('react'),
  // Navigation = require('./pages/Navigation.jsx'),
  DocumentTitle = require('react-document-title'),
  { RouteHandler } = require('react-router'),
  { PropTypes } = React;

var App = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },

  render() {
    return ( 
      <DocumentTitle title = 'PasteClone'>
        <div className='App'>
          <RouteHandler { ...this.props }/>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = App;
