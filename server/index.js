var express = require('express');
var app = express();

var port = process.env.PORT || 8000;

// fixme?
app.set('views', __dirname + '/../');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/public', express.static(__dirname + '/../public'));
app.use('/', require('./controllers/index'));
app.use('/pastes', require('./controllers/pastes'));

app.listen(port);
console.log("app is listening on " + port);
