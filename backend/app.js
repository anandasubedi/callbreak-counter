var express = require('express');
var app = express();
var db = require('./db');
var config = require('./config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, authorization');
 
  // Request headers you wish to allow
  res.setHeader('Access-Control-Request-Headers', 'X-Requested-With,content-type, authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  if (req.originalUrl === '/auth/register' || req.originalUrl === '/auth/login') {
    next();
  }
  else{
    console.log(req.headers);
    var token = req.headers['Authorization'];
    if (token) {
      //Decode the token
      jwt.verify(token, config.secret, (err, decod) => {
        if (err) {
          res.status(403).json({
            message: 'Wrong Token'
          });
        }
        else {
          //If decoded then call next() so that respective route is called.
          req.decoded = decod;
          next();
        }
      });
    }
    else {
  
      res.status(403).json({
        message: 'No Token'
      });
    }
  }
});

var UserController = require('./auth/UserController');
app.use('/auth', UserController);
module.exports = app;