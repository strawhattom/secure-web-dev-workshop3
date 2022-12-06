const router = require('express').Router()
const usersService = require('./users.service')
const passport = require('passport');
require('../auth/local.strategy');
require('../auth/jwt.strategy');

// Register route
router.post('/users/register', async (req, res) => {
    console.log(req.body);
    if (req.body?.username && req.body?.password) {
        const {username, password} = req.body;
        const user = await usersService.register(username, password);
        if (user) return res.status(200).send(user);
        else return res.status(400).send("An error occurred, bad request");
    } else return res.status(400).send("Please send the right format : {\"username\":<YOUR_USERNAME>,\"password\":\"<YOUR_PASSWORD>\"}");
});

// Login route
router.post('/users/login', 
    passport.authenticate('local', { session:false, failureRedirect:'/'}),
    async (req, res) => {
        if(req.user == 403) 
            return res.status(403).send({message:"Password not matched"});
        if(req.user == 404)
            return res.status(404).send({message:"User not found"});
        const token = await usersService.generateJWT(req.user?._id)
        return res.status(200).send({token});
    });

router.use('/users/me',passport.authenticate('jwt', { session:false, failureRedirect:'/'}));
// Get self
router.route('/users/me')
    .get(async (req, res) => {
        if (req.user == 404) return res.status(404).send("User not found");
        return res.status(200).send(await usersService.getUser(req.user));
    })
    .patch(async (req, res) => {
        if (req.user == 404) return res.status(404).send("User not found");
        return res.status(200).send(await usersService.update(req.user, req.body));
    })
    .delete(async (req, res) => {
        if (req.user == 404) return res.status(404).send("User not found");
        return res.status(200).send(await(usersService.deleteUser(req.user)));
    });

// Get all users
router.get('/users', async (req, res) => {
    return res.status(200).send({users:usersService.findAll()});
});


module.exports = router
