var express = require('express');
var app = express();
var db = require('./db');
var config = require('./config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var cors = require('cors')
app.use(cors());

app.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  console.log(req.headers);
  if (req.originalUrl === '/auth/register' || req.originalUrl === '/auth/login') {
    next();
  }
  else{
    var token = req.headers['authorization'];
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