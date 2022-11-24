const User = require('./users.model');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

async function createUser(user) {
    try {
        if (user === undefined) throw new Error("undefined location");
        const {username, password} = user;
        const hashedPassword = bcrypt.hashSync(password, salt);
        await User.create({
            username,
            hashedPassword
        }).orFail();
        console.log(`[+] Added user : ${username}, ${password}`);
        return true;
    } catch (err) {
        console.log("[!] No user created");
		console.error(err);
		return false;
    }
}

module.exports = {
    createUser
}