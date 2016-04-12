var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
var FacebookStrategy = require('passport-facebook').Strategy;
var jwt = require('jwt-simple');
var User = require('../model/userSchema'); //mongoose userschema
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

    passport.use(new FacebookStrategy({
            clientID: "600121516807390",
            clientSecret: "57247e652342f4a35717b8a0476500af",
            callbackURL: 'http://localhost:5000/api/auth/login/facebook/return',
            profileFields: ['id', 'email', 'birthday', 'displayName', 'friends'] //Hvad vi vil have retur...
        },
        function(accessToken, refreshToken, profile, cb) {
            // In this example, the user's Facebook profile is supplied as the user
            // record.  In a production-quality application, the Facebook profile should
            // be associated with a user record in the application's database, which
            // allows for account linking and authentication with other identity
            // providers.
            return cb(null, profile);
        }));

    // Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });

};