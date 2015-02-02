var express = require('express'),
    cors = require('express-cors');

var app = express();
var port = process.env.PORT || 8000;

app.use(cors({
  allowedOrigins: [
    '*.cmdv.io'
  ]
}));

// fixme?
app.set('views', __dirname + '/../frontend');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/public', express.static(__dirname + '/../frontend/public'));
app.use('/', require('./controllers/index'));
app.use('/pastes', require('./controllers/pastes'));

app.listen(port);
console.log("app is listening on " + port);
