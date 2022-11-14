const express = require('express')
const locationController = require('./locations/locations.controller')
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(locationController)



app.listen(port, () => {
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})