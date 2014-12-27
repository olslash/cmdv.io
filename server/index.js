var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', process.env.PORT || 8000);

app.use( bodyParser.json() );

app.use('/pastes', require('./controllers/pastes'));
