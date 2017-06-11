'use strict'

let express = require('express'),
  app = express(),
  path = require('path'),
  bodyParser = require('body-parser');

require('./Utilities/mongooseConfig')();

let loginRoute = require('./Routes/login'),
  util = require('./Utilities/util'),
  config = require("./Utilities/config").config;


app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(express.static('../public'));



app.use(function(err, req, res, next) {
  return res.send({ "errorCode": util.statusCode.FOUR_ZERO_ZERO, "errorMessage": util.statusMessage.SOMETHING_WENT_WRONG });
});

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use('/login', loginRoute);

app.get('/', function(req, res) { res.sendFile(path.resolve('../public/index.html')) });
/*first API to check if server is running*/
/*app.get('/', function(req, res) {
  res.send('hello, world!!');
});*/

app.listen(config.NODE_SERVER_PORT.port,()=>{
  console.log("VOD server started @",config.NODE_SERVER_PORT.port)
});
