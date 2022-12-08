const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../users/users.model');
const usersService = require('../users/users.service');

passport.use(new Strategy(
    function (username, password, done) {
        User.findOne({ username }, async function (err, user) {
            if (err)    return done(err)
            if (!user)  {
                console.log("[-] User not found sending 404 status code");
                return done(null, {
                    status: 404,
                    message:"User not found"
                });
            }
            if (!await usersService.verify(username, password)){
                console.log("[-] Wrong password... sending 403 status code");
                return done(null, {
                    status: 403,
                    message: "Wrong password"
                });
            }
            return done(null, user);
        });
    }
));

module.exports = passport