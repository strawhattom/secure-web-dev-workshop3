const service = require('./users.service');
const User = require('./users.model');
const bcrypt = require('bcrypt');




// Mock fns
jest.mock('./users.model');
const hash = jest.spyOn(bcrypt, 'hash');
const compare = jest.spyOn(bcrypt, 'compare');

beforeEach(() => {
    hash.mockClear();
    compare.mockClear();
    User.findOne.mockClear();
})

const _userTemplate = {
    _id: "6398496a3abda61ed31ad734",                                          // generated mongo ObjectID
    username: "user",
    password: "$2b$10$JHsxEB3arf2mCIjL7j2Ltu3zdJ3k7Wqm4eX/MyLvApzoKxAWeX6ue", // bcrypt hash with salt rounds of 10 of 'password'
    role: "user"                                                              // default role user
};

describe('User registration', () => {
    it('Should not register without neither username nor password', async () => {
        expect(await service.register(undefined,"password")).toBeNull();
        expect(hash).toHaveBeenCalledTimes(0);
        expect(await service.register("user",undefined)).toBeNull();
        expect(hash).toHaveBeenCalledTimes(0);
    });
    it('Should register the user', async () => {
        const _doc = _userTemplate;
        User.create.mockResolvedValue(_doc);
        expect(await service.register("user","password")).toStrictEqual(_doc);
        expect(hash).toHaveBeenCalledTimes(1);
    });
});

describe('User authentication', () => {
    // Mock
    const _doc = _userTemplate;

    it('Should authenticate with corrects credentials', async () => {
        User.findOne.mockResolvedValue(_doc);
        const username = "user";
        const password = "password";
        expect(await service.verify(username, password)).toBeTruthy();
        expect(compare).toHaveBeenCalledTimes(1);                           // one call of bcrypt.compare
    });
    
    it('Should not authenticate with unknown user', async () => {
        User.findOne.mockResolvedValue(null);
        const username = "userrr";
        const password = "password";
        expect(await service.verify(username, password)).toBeNull();
        expect(compare).toHaveBeenCalledTimes(0);                           // no call of bcrypt.compare
    });

    it('Should not authenticate with wrong password', async () => {
        User.findOne.mockResolvedValue(_doc);
        const username = "user";
        const password = "wrong";
        expect(await service.verify(username, password)).toBeFalsy();
        expect(compare).toHaveBeenCalledTimes(1);                           // one call of bcrypt.compare
    });
    it('Should not authenticate with undefined parameters', async () => {
        expect(await service.verify(undefined, undefined)).toBeNull();
        expect(compare).toHaveBeenCalledTimes(0);                           // no call of bcrypt.compare
    });
})

describe('User research', () => {
    it('Should return empty list when no user registered', async () => {
        User.find.mockResolvedValue({});
        expect(await service.findAll()).toStrictEqual({});
    });
    it('Should return an user', async () => {
        const _doc = _userTemplate;
        User.find.mockResolvedValue(_doc);
        expect(await service.findOne("6398496a3abda61ed31ad734")).toStrictEqual(_doc);
    });
})

describe('User special functions', () => {
    describe('Update', () => {

        it('Should hash the new password', async () => {
            const _doc = _userTemplate;
            User.findOneAndUpdate.mockResolvedValue(_doc);          // this return the old user (without update)
            const _propertyToChange = {
                password:'passwords',
                role:'admin'
            };
            // Mock updated user
            const _updatedDoc = _doc;
            _updatedDoc.username = "$2b$10$Ds4xwYfJ.JRlFzR0udNzlOhNCYzAIMAaZZk1501/mLAt3v30iV0wW";
            User.findOne.mockResolvedValue(_updatedDoc);
            expect(await service.update(_doc._id, _propertyToChange)).toStrictEqual(_updatedDoc);
            expect(hash).toHaveBeenCalledTimes(1);                  // one call of bcrypt.hash
        });
        it('Should update user\'s informations but not the role', async () => {
            const _doc = _userTemplate;
            User.findOneAndUpdate.mockResolvedValue(_doc);          // this return the old user (without update)
            const _propertyToChange = {
                username:'new_name',
                role:'admin'
            };
            // Mock updated user
            const _updatedDoc = _doc;
            _updatedDoc.username = _propertyToChange.username;
            User.findOne.mockResolvedValue(_updatedDoc);
            expect(await service.update(_doc._id, _propertyToChange)).toStrictEqual(_updatedDoc);
            expect(hash).toHaveBeenCalledTimes(0);                  // no call of bcrypt.hash
        });
        it('Should update only known fields such as : username and password', async () => {
            const _doc = _userTemplate;
            User.findOneAndUpdate.mockResolvedValue(_doc);          // this return the old user (without update)
            const _propertyToChange = {
                user:'new_name',
                unknown:'field',
                role:'admin'
            };
            User.findOne.mockResolvedValue(_doc);
            expect(await service.update(_doc._id, _propertyToChange)).toStrictEqual(_doc);
            expect(hash).toHaveBeenCalledTimes(0);                  // no call of bcrypt.hash
        });
    })
})