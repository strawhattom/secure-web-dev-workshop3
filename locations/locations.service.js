// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function findAll () {
	return Location.find();
}
async function findOne({_id}) {
	try {
		if (_id.match(/^[0-9a-fA-F]{24}$/))
        	return Location.findOne({_id}, null);
		else
			throw new Error("id specified is incorrect");
    } catch (err) {
		return null;
    }
}

async function createOne(location) {
	try {
		if (location === undefined) throw new Error("undefined location");
		if (!location.filmType ||
			!location.filmProducerName ||
			!location.endDate ||
			!location.filmName ||
			!location.district ||
			!location?.geolocation?.coordinates ||
			!location?.geolocation?.type ||
			!location.sourceLocationId ||
			!location.filmDirectorName ||
			!location.address ||
			!location.startDate ||
			!location.year) {
				throw new Error("Parameters are incorrect, please use : \n" +
					"{\t\nfilmType: String,\n" +
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
					"\tyear: Number\n}"
				);
		}
		
		const { filmType, filmProducerName, endDate, filmName, district, geolocation, sourceLocationId, filmDirectorname, address, startDate, year } = location;
		return await Location.create({ filmType,
			filmProducerName,
			endDate,
			filmName,
			district,
			geolocation,
			sourceLocationId,
			filmDirectorname,
			address,
			startDate,
			year
		});
		
    } catch (err) {
		return null;
    }
}

async function deleteOne(id){
	try {
		const {_id} = id;
		await Location.findOneAndDelete({_id}).orFail();
		console.log(`Deleted ${_id}`);
		return true;
	} catch (e) {
		return false;
	}
}

async function updateOne(id, property){
	try {
		const {_id} = id;
		await Location.findOneAndUpdate({_id}, property).orFail();
		console.log(`Updated ${_id}`);
		return true;
	} catch (e) {
		return false;
	}
}

module.exports = {
	findAll,
	findOne,
	createOne,
	deleteOne,
	updateOne
}