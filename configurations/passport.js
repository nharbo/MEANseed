var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jwt-simple');
var User = require('../model/userSchema'); //mongoose userschema
//var config = require('../configurations/mongoose'); // get db config file
var jwtConfig = require('../configurations/jwtConfig').jwtConfig; //configuration of jwt

module.exports = function(passport) { //passport bliver sendt med ude fra app.js

    var opts = {};
    opts.secretOrKey = jwtConfig.secret;
    opts.issuer = jwtConfig.issuer;
    opts.audience = jwtConfig.audience;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log("PAYLOAD: " + jwt_payload);

        User.findOne({userName: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user); //payload kan returneres i stedet for user hvis ønsket.
            } else {
                done(null, false, "User and token not found");
            }
        });
    }));
};