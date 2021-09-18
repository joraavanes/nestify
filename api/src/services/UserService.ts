import {
    User,
    UserModel,
} from '../entity/user';
import { mongoLoader } from '../loaders/mongo';

export class UserService {
    static async getUsers(sortByName: boolean): Promise<User[]> {
        const users = await UserModel.find().sort({ 
            name: sortByName ? 1 : -1
         });
        return users;
    }

    static async getUserById(id: string): Promise<User> {
        return await UserModel.findById(id);
    }

    static async getUserByEmail(email: string): Promise<User> {
        return await UserModel.findOne({ email });
    }

    static async createUser(user: User): Promise<User> {
        const isUserExists = await this.getUserByEmail(user.email);
        console.log(isUserExists);

        if (isUserExists) {
            throw new Error('User already exists');
        }

        return await UserModel.create(user);
    }

    static async updateUser(id: string, user: any): Promise<User|string> {
        try {
            return await UserModel.findByIdAndUpdate(id, { ...user }, { new: true });
        } catch (error) {
            return 'Failed to update the user';
        }
    }
}