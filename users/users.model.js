const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGO_ROOT_URI);

const userSchema = new mongoose.Schema({
	username: {
        type: String,
        unique: true,        // username must be unique
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;