import { UserService } from '../src/services/UserService';
import { mongoLoader } from '../src/loaders/mongo'
import { UserModel } from '../src/entity/user';

const userModelOne = {
    name: 'jora',
    surname: 'Av',
    email: 'jora_a@outlook.com',
    password: 'bingo@2021',
    userConfirmed: false,
    lastLogin: 0
};

beforeEach(async () => {
    await mongoLoader();
    await UserModel.deleteMany();
});

afterEach(async () => {});

test('should test user creation', async () => {
    await UserService.createUser(userModelOne);

    var user = await UserService.getUserByEmail(userModelOne.email);
    expect(user.email).toBe(userModelOne.email);
});

