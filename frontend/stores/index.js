var PasteStore            = require('./PasteStore'),
    HighlightedPasteStore = require('./HighlightedPasteStore'),
    PasteLoadingStore     = require('./PasteLoadingStore'),
    PasteRevisionsStore   = require('./PasteRevisionsStore'),
    PasteSavingStore      = require('./PasteSavingStore'),
    NavigationStore       = require('./NavigationStore');

module.exports = {
  PasteStore: new PasteStore(),
  HighlightedPasteStore: new HighlightedPasteStore(),
  PasteLoadingStore: new PasteLoadingStore(),
  PasteRevisionsStore: new PasteRevisionsStore(),
  PasteSavingStore: new PasteSavingStore(),
  NavigationStore: new NavigationStore()
};
