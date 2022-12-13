const express = require('express')
const locationController = require('./locations/locations.controller')
const userController = require('./users/users.controller');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express()
const port = 3000

// Middleware

app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use((err, req, res, next) => {
	console.error(err.stack);
	return res.status(500).send('Something broke!');
})

// Routes

app.use(locationController)
app.use(userController);

app.get('/', (req, res) => {
	return res.status(200).send({
		message:"Hello, don't forget to provide a bearer token to access to locations",
		startpoints: ["/users","/locations"]
	});
})

const main = async() => {
	await mongoose.connect(process.env.MONGO_ROOT_URI);
	console.log("Connected to mongoDB");
	app.listen(port, () => {
		console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
	})
}

main();