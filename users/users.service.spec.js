const service = require('./users.service');
const User = require('./users.model');

jest.mock('./users.model');

describe('User registration', () => {
    test('Should not register without username', async () => {
        expect(await service.register(undefined,"password")).toBe(null);
    });
    test('Should not register without password', async () => {
        expect(await service.register("user",undefined)).toBe(null);
    });
    test('Should register the user', async () => {
        const data = {
            _id: "6398496a3abda61ed31ad734",
            username: "user",
            password: "$2a$10$DcRs13wKxeYMj0mqDd3aOusl97cA9Fa9Uw9BCBNixade/W1CgNOgW",
            role: "user"
        }
        User.create.mockResolvedValue(data);
        expect(await service.register("user","password")).toBe(data);
    });
});

describe('User authentication', () => {
    // Mock return value
    const data = {
        _id: "6398496a3abda61ed31ad734",
        username: "user",
        password: "$2b$10$JHsxEB3arf2mCIjL7j2Ltu3zdJ3k7Wqm4eX/MyLvApzoKxAWeX6ue", // password from mongodb
        role: "user"
    }
    User.create.mockResolvedValue(data);
    User.findOne.mockResolvedValue(data);

    test('Should authenticate with corrects credentials', async () => {
        const username = "user";
        const password = "password";
        const verify = await service.verify(username, password);
        expect(verify).toBe(true);
    });
    test('Should not authenticate with unknown user', async () => {
        const username = "userrr";
        const password = "password";
        const verify = await service.verify(username, password);
        expect(verify).toBe(null);
    });
    test('Should not authenticate with wrong password', async () => {
        const username = "user";
        const password = "wrong";
        const verify = await service.verify(username, password);
        expect(verify).toBe(false);
    });
    test('Should not authenticate with undefined parameters', async () => {
        const username = "user";
        const password = "wrong";
        const verify = await service.verify(username, password);
        expect(verify).toBe(false);
    });
})

describe('User research', () => {

})