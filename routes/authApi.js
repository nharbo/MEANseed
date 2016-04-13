var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var User = require('../model/userSchema');
var passport = require('passport');

const jwtConfig = require('../configurations/jwtConfig').jwtConfig;

//local strategy, gives you a token.
router.post('/authenticate', function (req, res) {
    User.findOne({userName: req.body.userName}, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).send({msg: 'Authentication failed. User not found.'});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) { // if user is found and password is right create a token

                    var iat = new Date().getTime() / 1000; // convert to seconds

                    var exp = iat + jwtConfig.tokenExpirationTime;

                    var payload = {
                        aud: jwtConfig.audience,
                        iss: jwtConfig.issuer,
                        iat: iat,
                        exp: exp,
                        sub: user.userName
                    };

                    var token = jwt.encode(payload, jwtConfig.secret);

                    // return the information including token as JSON
                    res.json({token: 'JWT ' + token});

                } else {
                    res.status(401).send({msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });


});



//FACEBOOK LOGIN, localhost:5000/api/auth/login/facebook
router.post('/login/facebook', passport.authenticate('facebook', {scope: 'public_profile,email,user_friends,user_birthday'})); //her sættes ind hvad man ønsker retur.


//Facebook kalder denne, med data som vi har requested.
router.get('/login/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/#' }),
    function (req, res) {
        //res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
        //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        //res.header('Access-Control-Allow-Credentials', 'true');
        console.log("in facebook return!");
        console.log(req.user);
        //req.url = "/home";
        //res.redirect('/#home'/*, { user: req.user }*/)
    });

module.exports = router;
