const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../users/users.model');
const usersService = require('../users/users.service');

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username }, async function (err, user) {
            if (err) { return done(err); }
            if (!user) { 
                console.log("User not found... Sending status 404");
                return done(null, 404); 
            }

            if (!await usersService.verify(username, password)) { 
                console.log("Password not matching... Sending status 403");
                return done(null, 403); 
            }
            return done(null, user);
        });
    }
));

module.exports = passport