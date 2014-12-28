var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT || 8000;

app.use( bodyParser.json() );

app.use('/pastes', require('./controllers/pastes'));

app.listen(port);
console.log("app is listening on " + port);
