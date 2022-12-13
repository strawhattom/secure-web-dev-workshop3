const service = require('./users.service');
const User = require('./users.model');

jest.mock('./users.model');

describe('User registration', () => {
    test('Should  not register without username', async () => {
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
    const data = {
        _id: "6398496a3abda61ed31ad734",
        username: "user",
        password: "$2a$10$DcRs13wKxeYMj0mqDd3aOusl97cA9Fa9Uw9BCBNixade/W1CgNOgW",
        role: "user"
    }
    User.create.mockResolvedValue(data);
    test('Should authenticate', async () => {
        const username = "user";
        const password = "password";
        await service.register(username, password);
        const verify = await service.verify(username, "password");
        expect(verify).toBe(true);
    });
    test('Should not authenticate', async () => {
        const username = "user";
        const password = "password";
        await service.register(username, password);
        const verify = await service.verify(username, "wrong");
        expect(verify).toBe(false);
    });
})
  