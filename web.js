var express = require("express");
var logfmt = require("logfmt");

var app = express();
app.use(logfmt.requestLogger());
app.use(express.bodyParser());
app.use(express.favicon());

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
	res.send('Hello');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
