var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var User = require('../model/userSchema');
var passport = require('passport');

const jwtConfig = require('../configurations/jwtConfig').jwtConfig;

//local strategy, gives you a token.
router.post('/authenticate', function (req, res) {
    User.findOne({userName: req.body.userName}, function (err, user) { //Tjekker efter user
        if (err) throw err;
        if (!user) { //Hvis user ikke findes
            res.status(401).send({msg: 'Authentication failed. User not found.'});
        } else { //hvis user fidnes
            user.comparePassword(req.body.password, function (err, isMatch) { //Hvis password passer
                if (isMatch && !err) { // if user is found and password is right create a token

                    //Her laves et token til useren.
                    var iat = new Date().getTime() / 1000; // convert to seconds - hvornår token udstedes

                    var exp = iat + jwtConfig.tokenExpirationTime; // hvornår det udløber

                    var payload = {
                        aud: jwtConfig.audience, //hvem skal modtage token (websitet eksempelvis)
                        iss: jwtConfig.issuer, //hvem udsteder token
                        iat: iat, //isued at - hvornår er token givet
                        exp: exp, //Expirering in...
                        sub: user.userName //hvem skal bruge token
                    };

                    var token = jwt.encode(payload, jwtConfig.secret);

                    // return the information including token as JSON
                    res.json({token: 'JWT ' + token});

                } else { //Hvis password ikke passer
                    res.status(401).send({msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });


});



//FACEBOOK LOGIN, localhost:5000/api/auth/login/facebook
router.get('/login/facebook', passport.authenticate('facebook', {scope: 'public_profile,email,user_friends,user_birthday'})); //her sættes ind hvad man ønsker retur.


//Facebook kalder denne, med data som vi har requested.
router.get('/login/facebook/callback',
    passport.authenticate('facebook'),
    function (req, res) {

        ////Her laves et token til useren.
        //var iat = new Date().getTime() / 1000; // convert to seconds
        //
        //var exp = iat + jwtConfig.tokenExpirationTime;
        //
        //var payload = {
        //    aud: jwtConfig.audience,
        //    iss: jwtConfig.issuer,
        //    iat: iat,
        //    exp: exp,
        //    sub: user.userName
        //};
        //
        //var token = jwt.encode(payload, jwtConfig.secret);
        ////
        ////// return the information including token as JSON
        ////res.json({token: 'JWT ' + token});

        console.log("in facebook return!");
        console.log(res);
        //res.redirect('/#home', {token: token});
        res.redirect('/#home');
    });

module.exports = router;
