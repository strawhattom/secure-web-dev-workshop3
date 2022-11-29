const passport = require('passport');
const User = require('../users/users.model');
const usersService = require('../users/users.service');
const { Strategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();

