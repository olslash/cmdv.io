var React = require('react/addons'),
    Fluxxor = require('fluxxor'),
    constants = require('./constants'),
    actions = require('./actions/actions'),
    stores = require('./stores'),
    Application = require('./components/Application.jsx');

require('Mousetrap'); // global Mousetrap object

var flux = new Fluxxor.Flux(stores, actions);
//window.flux = flux;

// log dispatches
flux.on('dispatch', function (type, payload) {
  console.log("[Dispatch]", type, payload);
});

window.addEventListener('popstate', function (e) {
  if(e.state !== undefined) {
    flux.actions.pasteSelected(e.state.pasteID, true, true);
  }
});

flux.actions.pageLoaded(document.location.pathname);
React.render(<Application flux={flux} />, document.getElementById("app"));

