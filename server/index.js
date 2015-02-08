var express = require('express'),
    Promise = require('bluebird'),
    cors = require('express-cors'),
    compression = require('compression');

require('node-jsx').install();

var app = express();
var port = process.env.PORT || 8000;

var appPromise = new Promise(function (resolve, reject) {
  app.use(cors({
    allowedOrigins: [
      '*.cmdv.io'
    ]
  }));

  // fixme?
  app.set('views', __dirname + '/../frontend');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  app.use(compression());
  app.use('/public', express.static(__dirname + '/../frontend/public'));
  app.use('/', require('./controllers/index'));
  app.use('/pastes', require('./controllers/pastes'));

  app.listen(port, function() {
    console.log("app is listening on " + port);
    resolve(app);
  });
});

module.exports = appPromise;
