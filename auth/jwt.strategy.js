const passport = require('passport');
const User = require('../users/users.model');
const { Strategy, ExtractJwt } = require('passport-jwt');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(new Strategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (user === null || err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user._id);
        } else {
            return done(null, 404); // unauthorized
        }
    });
}));

module.exports = passport;