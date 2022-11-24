// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')


const checkUser = (req,res,next) => {
	if (!req.headers.authorization) {
		return res.status(403).send({ error: 'Not logged' });
	}
	next();
};

router.use('/locations', checkUser);

// Routes
router.get('/', (req, res) => {
	return res.status(200).send("Hello World, go on /locations to get all locations");
})

router.route('/locations')
	.get(async (req, res) => {
		return res.status(200).send({locations: await locationsService.findAll()});
	})
	.post(async (req, res) => {
		if (req?.body) {

			const body = req.body;
			
			if (
				body.filmType &&
				body.filmProducerName &&
				body.endDate &&
				body.filmName &&
				body.district &&
				body?.geolocation &&
				body.geolocation?.coordinates &&
				body.geolocation?.type &&
				body.sourceLocationId &&
				body.filmDirectorName &&
				body.address &&
				body.startDate &&
				body.year
			) {
				const create = await locationsService.createOne(body);
				if (create) return res.status(200).send("Location created");
				else return res.status(400).send("An error occurred when creating a location");
			} else {
				return res.status(400).send("Parameters are incorrect, please use : \n" + "{\t\nfilmType: String,\n" +
				"\tfilmProducerName: String, \n" +
				"\tendDate: Date, \n" +
				"\tfilmName: String, \n" +
				"\tdistrict: Number, \n" +
				"\tgeolocation: {\n" +
					"\t\tcoordinates: [Number], \n" +
					"\t\ttype: { type: String }, \n" +
				"\t}, \n" +
				"\tsourceLocationId: String, \n" +
				"\tfilmDirectorName: String, \n" +
				"\taddress: String, \n" +
				"\tstartDate: Date, \n" + 
				"\tyear: Number\n}");
			}
		} else
			return res.status(400).send("Parameters not found");
});

router.route('/locations/:id')
	.get(async (req, res) => {
		if (req?.params?.id) return res.status(400).send("Bad request, please provide an ID");
		const _id = req.params.id;
		const response = await locationsService.findOne({_id});
		if (response) 
			return res.status(200).send(response);
		else 
			return res.status(404).send("Location not found");
	})
	.patch(async (req, res) => {
		if (req?.params?.id && req?.body) return res.status(400).send("Bad request, please check the id and the body");
		const _id = req.params.id;
		const response = await locationsService.updateOne({_id}, req.body);
		if (response)
			return res.status(200).send(`Updated ${_id}`);
		else
			return res.status(400).send("Location not found");
	})
	.delete(async (req, res) => {
		if (req?.params?.id) return res.status(400).send("Bad request, please provide an ID");
		const _id = req.params.id;
		const response = await locationsService.deleteOne({_id});
		if (response) 
			return res.status(200).send(`Deleted ${_id}`);
		else 
			return res.status(404).send("Location not found");
	})
module.exports = router