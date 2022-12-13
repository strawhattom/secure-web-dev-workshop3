const User = require('./users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;

async function register(username, password) {
    try {
        if (username === undefined || password === undefined) throw new Error("undefined parameters");
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
            username,
            password:hashedPassword
        });
        return user;
    } catch (err) {
		console.error(err);
		return null;
    }
}

async function findAll() {
    try {
        return User.find({}).select('username');
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function getUser(id) {
    try {
        return await User.findOne({id}).select("username role");
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function checkUser(username) {
    try {
        return await User.findOne({username});
    } catch (err) {
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
        console.error(err);
        return null;
    }
}

async function deleteUser(id) {
    try {
        return await User.findOneAndDelete({_id:id});
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function verify(username, password) {
    try {
        
        if (username === undefined || password === undefined) throw new Error("undefined parameter");
        const user = await User.findOne({username});
        if (!user || user.username != username) throw new Error("Unknown username");
        const match = await bcrypt.compare(password, user.password);
        return match;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function generateJWT(id) {
    return jwt.sign({sub:id}, process.env.JWT_SECRET);
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