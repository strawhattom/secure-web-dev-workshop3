const User = require('./users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;

async function register(username, password) {
    try {
        if (username === undefined) throw new Error("undefined location");
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
            username,
            password:hashedPassword
        });
        console.log(`[+] Added user : ${username}:${password}`);
        return user;
    } catch (err) {
        console.log("[!] No user created");
		console.error(err);
		return null;
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

async function getUser(id) {
    try {
        return await User.findOne({id});
    } catch (err) {
        console.log("[!] Error");
        console.error(err);
        return null;
    }
}

async function checkUser(username) {
    try {
        return await User.findOne({username});
    } catch (err) {
        console.log("[!] Error");
        console.error(err);
        return null;
    }
}

async function update(id, property) {
    try {
        if (property.role) delete property.role;
        await User.findOneAndUpdate({id}, property);
        return await getUser(id);
    } catch (err) {
        console.log("[!] Error");
        console.error(err);
        return null;
    }
}

async function deleteUser(id) {
    try {
        return await User.findOneAndDelete({_id:id});
    } catch (err) {
        console.log("[!] Error");
        console.error(err);
        return null;
    }
}

async function verify(username, password) {
    try {
        const user = await User.findOne({username});
        const match = await bcrypt.compare(password, user.password);
        return match;
    } catch (err) {
        console.log("[!] Error");
        console.error(err);
        return null;
    }
}



async function generateJWT(username) {
    return jwt.sign({sub:username}, process.env.JWT_SECRET);
}

module.exports = {
    register,
    findAll,
    getUser,
    checkUser,
    verify,
    generateJWT,
    update,
    deleteUser
}