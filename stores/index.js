var PasteStore      = require('./PasteStore'),
    NavigationStore = require('./NavigationStore');

module.exports = {
  PasteStore: new PasteStore(),
  NavigationStore: new NavigationStore()
};
