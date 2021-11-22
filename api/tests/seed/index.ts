import { mongoLoader } from '../../src/loaders/mongo';
import { UserService } from '../../src/services/UserService';
import { NestModel } from '../../src/entity/nest';
import { UserModel, User } from '../../src/entity/user';
import { connect } from 'mongoose';

async function createNewUser() {
    await mongoLoader();

    // const user = await UserService.createUser({
    //     email: 'matheaw@gmail.com',
    //     password: 'shrimp@season332',
    //     name: 'Matheaw',
    //     surname: 'Anderson',
    //     lastLogin: 0,
    //     userConfirmed: false,
    // });
    // const user = await UserService.createUser({
    //     email: 'sue@mail.com',
    //     password: 'chiko$#199',
    //     name: 'Sue',
    //     surname: 'Black',
    //     lastLogin: 0,
    //     userConfirmed: false,
    // });

    const user = new UserModel({
        email: 'peter@mail.com',
        password: 'chiko$#199',
        name: 'Peter',
        surname: 'Martinson',
        lastLogin: 0,
        userConfirmed: false,
    });
    const result = await user.save();

    console.log(user);
    console.log(user._id);
}

async function getUsers() {
    await mongoLoader();

    const users = await UserService.getUsers(false);
    console.log(users);
}

async function updateUser(){
    await mongoLoader();

    const res = await UserService.updateUser('6146e057a2f82e4560674b44', { name: 'Mina' });
    console.log(res);
}

async function resetPassword(){
    await mongoLoader();

    const res = await UserService.passwordReset('matheaw@gmail.com', 'JDKSD<9098^%%', 'jigar@2021');
    console.log(res);
}

// createNewUser();
// getUsers();
// updateUser();
// resetPassword();

const user = new UserModel({
    name: 'jora',
    surname: 'Av',
    email: 'jora_a@outlook.com',
    password: 'bingo@2021',
    userConfirmed: false,
    lastLogin: 0,
});


async function storeUser(){
    await connect('mongodb://localhost:27017/nestify-test', { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    await UserModel.deleteMany();
    
    const doc = await user.save();
    console.log(doc);
}
storeUser();

// user.save()
//     .then((res:any) => console.log(res))
//     .catch((err: any) => console.log(err));