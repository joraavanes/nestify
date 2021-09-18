import { mongoLoader } from '../../src/loaders/mongo';
import { UserService } from '../../src/services/UserService';

async function createNewUser() {
    await mongoLoader();

    const user = await UserService.createUser({
        email: 'mina@yahoo.com',
        password: 'Peter@jackson12',
        name: 'mina',
        surname: 'naderi',
        lastLogin: 0,
        userConfirmed: false,
    });

    console.log(user);
}

async function getUsers() {
    await mongoLoader();

    const users = await UserService.getUsers(false);
    console.log(users);
}

async function updateUser(){
    await mongoLoader();

    const res = await UserService.updateUser('614524f196ca7947e42fce6de3', { surname: 'Avanesians' });
    console.log(res);
}

getUsers();
updateUser();