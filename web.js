var express = require("express");
var logfmt = require("logfmt");

var login = require('./actions/login.js');
var authenticated = require('./actions/authenticated.js');

var app = express();
app.use(logfmt.requestLogger());
app.use(express.bodyParser());
app.use(express.favicon());
app.use(express.static(__dirname + '/public'));

app.post('/login', login.create);

app.get('/balance', authenticated.balance);

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
