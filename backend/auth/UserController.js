var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var User = require('./User');

// CREATES A NEW USER
router.post('/register', function (req, res) {

    User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            username : req.body.username,
            password : req.body.password
        }, 
        function (err, user) {
            
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});
// RETURNS ALL THE USERS IN THE DATABASE
router.post('/login', function (req, res) {
    
    User.findOne ({username: req.body.username,password: req.body.password}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(user);
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