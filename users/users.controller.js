const router = require('express').Router()
const usersService = require('./users.service')

// Register route
router.post('/users/register', async (req, res) => {
    console.log(req.body);
    if (req?.body?.username && req?.body?.password) {
        const {username, password} = req.body;
        const register = await usersService.createUser({
            username,
            password
        });
        console.log(register);
        if (register) return res.status(200).send("User created successfully !");
        else return res.status(400).send("An error occurred, bad request");
    } else return res.status(400).send("Please send the right format : {\"username\":<YOUR_USERNAME>,\"password\":\"<YOUR_PASSWORD>\"}");
});

// Login route
router.post('/users/login', async (req, res) => {

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