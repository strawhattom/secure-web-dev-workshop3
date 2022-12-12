const router = require('express').Router()
const usersService = require('./users.service')
const passport = require('passport');
require('../auth/local.strategy');
require('../auth/jwt.strategy');
const roleMiddleware = require('../middleware/auth.middleware');

// Register route
router.post('/users/register', async (req, res) => {
    console.log(req.body);
    if (req.body?.username && req.body?.password) {
        const {username, password} = req.body;
        const user = await usersService.register(username, password);
        if (user) return res.status(200).send(user);
        else return res.status(400).send("An error occurred, bad request");
    } else return res.status(400).send("Please send the right format : {\"username\":$USERNAME,\"password\":\"$PASSWORD\"}");
});

// Login route

router.post('/users/login', 
    passport.authenticate('local', {
        session: false,
    }),
    async (req, res) => {
        const userId = req.user?._id;
        const token = await usersService.generateJWT(userId);
        return res.status(200).send({token});
    });

// JWT middleware
router.use('/users/me',passport.authenticate('jwt', {
    session:false, failureRedirect:'/users/login'
}));

// Get self
router.route('/users/me')
    .get(async (req, res) => {
        return res.status(200).send(await usersService.getUser(req.user));
    })
    .patch(async (req, res) => {
        return res.status(200).send(await usersService.update(req.user, req.body));
    })
    .delete(async (req, res) => {
        return res.status(200).send(await(usersService.deleteUser(req.user)));
    });

// Get all users
router.get('/users', 
    passport.authenticate('jwt', {
        session: false,
    }),
    roleMiddleware(["admin"]),
    async (req, res) => {
        return res.status(200).send({users:await usersService.findAll()});
});


module.exports = router
