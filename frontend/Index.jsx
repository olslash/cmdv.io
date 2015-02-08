var React = require('react/addons'),
    Fluxxor = require('fluxxor'),
    Immutable = require('immutable'),
    actions = require('./actions/actions'),
    stores = require('./stores'),
    Application = require('./components/Application.jsx');

var Index;
module.exports = Index = React.createClass({
  propTypes: {
    initialKey: React.PropTypes.string,
    initialLanguage: React.PropTypes.string,
    initialRevisions: React.PropTypes.array,
    initialPasteContent: React.PropTypes.string
  },

  componentWillMount() {
    this.flux = new Fluxxor.Flux(stores, actions);
    console.log(this.props);
//    if (process.browser) {
      // bootstrap into browser
//      this.flux.actions.pageLoaded(document.location.pathname);
      // hydrate stores in a horrible way fixme
      var navStore = this.flux.stores['NavigationStore'];
      console.log('trying with', this.props.initialKey);
      navStore._setCurrentKey(this.props.initialKey);
      navStore._setCurrentLanguage(this.props.initialLanguage);
      if(process.browser) navStore._updateURL();

      var pasteRevisionStore = this.flux.stores['PasteRevisionsStore'];
      pasteRevisionStore._revisions = Immutable.List(this.props.initialRevisions);

      var pasteStore = this.flux.stores['PasteStore'];
      pasteStore._pastes = pasteStore._pastes.set(this.props.initialKey, this.props.initialPasteContent);

      this.flux.on('dispatch', function (type, payload) {
        console.log("[Dispatch]", type, payload);
      });
//    }
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
