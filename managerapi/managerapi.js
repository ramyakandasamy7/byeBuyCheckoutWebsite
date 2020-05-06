var express    = require('express');
var app        = express();
var https      = require('https');
var fs         = require('fs');
var port       = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var cors       = require('cors');
  
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes'); //importing route
routes(app); //register the route

https.createServer({
	key: fs.readFileSync('certs/key.pem'),
	cert: fs.readFileSync('certs/cert.pem')
},app).listen(port);

console.log(Date.now() + ' -- ByeBuyCheckout Managers RESTful APIs server started on: ' + port);

if (process.env.RUN_TEST) {
	setTimeout(function() {
		process.exit(0);
	}, 3000);
}

process.once('SIGUSR2', function() {
	server.close(function() {
		process.kill(process.pid, 'SIGUSR2')
	});
});


