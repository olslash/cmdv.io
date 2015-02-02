var PasteStore          = require('./PasteStore'),
    PasteLoadingStore   = require('./PasteLoadingStore'),
    PasteRevisionsStore = require('./PasteRevisionsStore'),
    PasteSavingStore    = require('./PasteSavingStore'),
    NavigationStore     = require('./NavigationStore');

module.exports = {
  PasteStore: new PasteStore(),
  PasteLoadingStore: new PasteLoadingStore(),
  PasteRevisionsStore: new PasteRevisionsStore(),
  PasteSavingStore: new PasteSavingStore(),
  NavigationStore: new NavigationStore()
};
