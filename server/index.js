var express = require('express');
var app = express();

var port = process.env.PORT || 8000;

app.use('/pastes', require('./controllers/pastes'));

app.listen(port);
console.log("app is listening on " + port);
