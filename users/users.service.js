const User = require('./users.model');
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function createUser(user) {
    try {
        if (user === undefined) throw new Error("undefined location");
        const {username, password} = user;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        await User.create({
            username,
            password:hashedPassword
        });
        console.log(`[+] Added user : ${username}:${password}`);
        return true;
    } catch (err) {
        console.log("[!] No user created");
		console.error(err);
		return false;
    }
}

async function findAll() {
    try {
        return User.find({}).select('username');
    } catch (err) {
        console.log("[!] Error");
        console.error(err);
        return false;
    }
}

async function getUser(user) {
    try {
        const {username} = user;
        return User.findById({username});
    } catch (err) {
        console.log("[!] Error");
        console.error(err);
        return false;
    }
}

async function logUser(User) {
    
}

module.exports = {
    createUser,
    findAll,
    getUser
}