import bcrypt from 'bcryptjs';
import {
    User,
    UserModel,
} from '../entity/user';

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

    static async hashPassword(plainText: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(plainText, salt);
    }

    static async createUser(user: User): Promise<User> {
        const isUserExists = await this.getUserByEmail(user.email);

        if (isUserExists) {
            throw new Error('User already exists');
        }

        user.password = await this.hashPassword(user.password);
        return await UserModel.create(user);
    }

    static async updateUser(id: string, user: any): Promise<User|string> {
        try {
            return await UserModel.findByIdAndUpdate(id, { ...user }, { new: true });
        } catch (error) {
            return 'Failed to update the user';
        }
    }

    static async passwordReset(email: string, currentPassword: string, plainText: string): Promise<User|undefined>{
        const user = await this.getUserByEmail(email);
        const compareResult = await bcrypt.compare(currentPassword, user.password);

        if(compareResult) {
            const newHash = await this.hashPassword(plainText);
            const updatedUser = await UserModel.updateOne({email}, {password: newHash}, {new: true});
            return updatedUser;
        }
    }
}