var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var cors = require('cors');
  
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(function(req, res) {
//  res.status(404).send({url: req.originalUrl + ' not found'})
//});

var routes = require('./api/routes/managerApiRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('ByeBuyCheckout Manager RESTful API server started on: ' + port);

