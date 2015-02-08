var express = require('express'),
    React   = require('react'),
    request = require('superagent');

var Index = require('../../frontend/Index.jsx'),
    config = require('../../frontend_config');

var indexRouter;
module.exports = indexRouter = express.Router();

indexRouter.get('/:key?', function (req, res) {
  var path = req.params.key || '';
  var routeRegex = /^([a-zA-Z]+)\.?([a-zA-Z]*)$/; // '(key).(language)?'
  var routeComponents = path.match(routeRegex);
  var urlKey = '';
  var urlLanguage = null;

  if (routeComponents !== null) {
    if (routeComponents[2].length > 0) {
      urlLanguage = routeComponents[2];
    }
    urlKey = routeComponents[1]
  }
  console.log('requesting', urlKey);
  request
    .get(`${ config.serverBaseURL }/pastes/${ urlKey }`)
    .end(function(err, response) {
        sendResponse(res, {
          pasteID: response.pasteID || urlKey,
          pasteContent: response.body.pasteContent || '',
          revisions: response.body.revisions || [],
          language: urlLanguage
        });
      });
});

function sendResponse(res, options) {
  res.send(React.renderToString(React.createElement(Index, {
    initialKey: options.pasteID,
    initialLanguage: options.language,
    initialRevisions: options.revisions,
    initialPasteContent: options.pasteContent
  })));
}