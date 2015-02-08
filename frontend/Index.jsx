var React = require('react/addons'),
    Fluxxor = require('fluxxor'),
    actions = require('./actions/actions'),
    stores = require('./stores'),
    Application = require('./components/Application.jsx');

var Index;
module.exports = Index = React.createClass({
  componentWillMount() {
    this.flux = new Fluxxor.Flux(stores, actions);

    if (process.browser) {
      // bootstrap into browser
      this.flux.actions.pageLoaded(document.location.pathname);

      this.flux.on('dispatch', function (type, payload) {
        console.log("[Dispatch]", type, payload);
      });
    }
  },

  render() {
    return(
       <html>
         <head>
           <title>cmdv</title>
           <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
           <link rel="stylesheet" href="public/index.css" />
           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/styles/monokai_sublime.min.css" />
         </head>
         <body>
           <div id="app">
             <Application flux={ this.flux } />
           </div>
           <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
           <script src="public/mousetrap.min.js"></script>
           <script src="public/app.js"></script>
         </body>
       </html>
    )
  }
});
