var express    = require('express');
var app        = express();
var https      = require('https');
var fs         = require('fs');
var port       = 3000;
var bodyParser = require('body-parser');
var cors       = require('cors');
  
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/managerApiRoutes'); //importing route
routes(app); //register the route

https.createServer({
	key: fs.readFileSync('certs/key.pem'),
	cert: fs.readFileSync('certs/cert.pem')
},app).listen(port);

console.log(Date.now() + ' -- ByeBuyCheckout Manager RESTful API server started on: ' + port);

