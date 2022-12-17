const service = require('./locations.service');
const Location = require('./locations.model');

jest.mock('./locations.model');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Retrieving locations', () => {
    it('Should get empty locations if empty db', async () => {
        const _docs = {};
        const find = jest.spyOn(Location,'find');
        Location.find.mockResolvedValue(_docs);
        expect(await service.findAll()).toBe(_docs);
        expect(find).toHaveBeenCalled();
    });
    it('Should retrieve all locations in db', async () => {
        const _docs = {
            locations:[
                {
                    _id: "6398496a3abda61ed31ad734",
                    filmName: "Avatar 2",
                    // other mock info...
                },
                {
                    // more
                }
            ]
        }
        const find = jest.spyOn(Location,'find');
        Location.find.mockResolvedValue(_docs);
        expect(await service.findAll()).toBe(_docs);
        expect(find).toHaveBeenCalled();
    })
    it('Should retrieve one unique location', async () => {
        const _doc = {
            _id: "6398496a3abda61ed31ad734",
            filmName: "Avatar 2",
            // other mock info...
        }
        Location.findOne.mockResolvedValue(_doc);
        const findOne = jest.spyOn(Location,'findOne');
        const match = jest.spyOn(String.prototype, 'match');
        expect(await service.findOne(_doc)).toBe(_doc);
        expect(match).toHaveBeenCalled();
        expect(findOne).toHaveBeenCalled();
    });
    it('Should return null when specified id doesn\'t exist or has incorrect format', async () => {
        const _doc = {
            _id: "incorrect",
            filmName: "Avatar 2",
            // other mock info...
        }
        Location.findOne.mockResolvedValue(_doc);
        const findOne = jest.spyOn(Location,'findOne');
        const match = jest.spyOn(String.prototype, 'match');
        expect(await service.findOne(_doc)).toBeNull();
        expect(match).toHaveBeenCalled();
        expect(findOne).not.toHaveBeenCalled();
    });
});