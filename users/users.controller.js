const router = require('express').Router()
const usersService = require('./users.service')
const passport = require('../auth/local.strategy');

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
        return res.status(200).send(req.user);
    });

// Get self
router.route('/users/me')
    .get(async (req, res) => {
        
    })
    .put(async (req, res) => {

    })
    .delete(async (req, res) => {
        
    });

// Get all users
router.get('/users', async (req, res) => {
    return res.status(200).send({users:usersService.findAll()});
});


module.exports = router
