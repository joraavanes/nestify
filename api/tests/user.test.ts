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
    userModelOne.password = 'bingo@2021'
});

afterEach(async () => {
    
});

test('should test user creation', async () => {
    await UserService.createUser(userModelOne);

    var user = await UserService.getUserByEmail(userModelOne.email);
    expect(user.email).toBe(userModelOne.email);
});

test('should return token by logging in', async () => {
    await UserService.createUser(userModelOne);
    
    const token = await UserService.loginUser(userModelOne.email, 'bingo@2021');
    expect(typeof token).toBe('string');
});


