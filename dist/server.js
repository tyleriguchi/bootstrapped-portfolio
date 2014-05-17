'use strict';

var express = require('express'),
	app     = express();

app.set('views', __dirname + '/');

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
	res.send('index');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('started on ' + port);
});
