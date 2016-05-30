var express = require('express');
var router = express.Router();

var passport = require('passport');

var User = require('../model/userSchema');

// create a new local user account (POST http://localhost:5000/api/user/signup)
router.post('/signup', function(req, res) {
    console.log(req.body.userName + " - " + req.body.password);

    if (!req.body.userName || !req.body.password) {
        res.json({success: false, msg: 'Please enter username and password.'});
    } else {
        console.log("USERNAME: "+ req.body.userName);
        console.log("PASSWORD: "+ req.body.password);

        var newUser = new User();
        newUser.local.password = req.body.password;
        newUser.local.userName = req.body.userName;

        // save the user
        newUser.save(function(err) {
            if (err) {
                console.log(err);
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});


module.exports = router;
