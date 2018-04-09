var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var User = require('./User');
var bcrypt = require('bcryptjs');
var config = require('../config');
var jwt=require('jsonwebtoken');

router.post('/register', function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            username : req.body.username,
            password : hashedPassword
        }, 
        function (err, user) {
            console.log(err);
            if(err && err.code === 11000){
               return res.status(500).send("Username already exists.");
            }
            else if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});
// RETURNS ALL THE USERS IN THE DATABASE
router.post('/login', function (req, res) {
    
    User.findOne ({username: req.body.username}, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem finding the users.");
        }
        if(!user) {
            return res.status(500).send("Username or Password Incorrect.");
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(500).send("Username or Password Incorrect.");
        }
        // create a token
        var token = jwt.sign({ id: user._id, username: user.username }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
    });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/users', function (req, res) {
    
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

module.exports = router;