import { UserService } from '../src/services/UserService';
import { mongoLoader } from '../src/loaders/mongo'
import { UserModel } from '../src/entity/user';

const userModelOne = {
    name: 'jora',
    surname: 'Av',
    email: 'jora_a@outlook.com',
    password: 'bingo@2021',
    userConfirmed: false,
    lastLogin: 0,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTcxNzczZDcyNDc4MTU2NTAzODUzZGMiLCJlbWFpbCI6ImpvcmFfYUBvdXRsb29rLmNvbSIsImlhdCI6MTYzNDgyNjA0NX0.U_DAKS46zJlXehuQbDLCyUrAv8FCVVvwT-EozfeHP3o'
};

beforeEach(async () => {
    await mongoLoader();
    await UserModel.deleteMany();
    userModelOne.password = 'bingo@2021'
});

afterEach(async () => {
    await UserModel.deleteMany();
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

test('should return decoded data back by given token', () => {
    const decoded = UserService.verifyToken(userModelOne.token);

    expect(decoded.email).toBe('jora_a@outlook.com');
});

test('should verify the user with the valid token', async () => {
    let result: boolean = false;
    
    await UserService.createUser(userModelOne);
    const token = await UserService.loginUser(userModelOne.email, 'bingo@2021');
    
    if(token){
        result = await UserService.verifyUser(userModelOne.email, token);
    }

    expect(result).toBe(true);
});
