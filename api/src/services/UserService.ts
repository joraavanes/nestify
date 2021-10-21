import bcrypt from 'bcryptjs';
import jsonWebToken from 'jsonwebtoken';
import config from '../config/index'
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

    static async loginUser(email: string, password: string): Promise<string|null>{
        const user = await this.getUserByEmail(email);
        
        if(!user){
            return null;
        }
        
        const hashResult = await bcrypt.compare(password, user.password);
        
        if(hashResult){
            const token = jsonWebToken.sign({_id: user._id,email: user.email}, config.jwtKey).toString();
            await UserModel.findByIdAndUpdate(user._id, { tokens: [{ access: 'auth', token }] });
            return token;
        }

        return null;
    }

    static verifyToken(token: string): jsonWebToken.JwtPayload{
        let decoded;

        try {
            decoded = jsonWebToken.verify(token, config.jwtKey, { complete: false });
            if(typeof decoded === 'string') throw new Error();
            
            return decoded;
        } catch (error) {
            return {};
        }
    }

    static async passwordReset(email: string, currentPassword: string, plainText: string): Promise<User|undefined>{
        const user = await this.getUserByEmail(email);
        const compareResult = await bcrypt.compare(currentPassword, user.password);

        if(compareResult) {
            const newHash = await this.hashPassword(plainText);
            const updatedUser = await UserModel.updateOne({email}, {password: newHash}, {new: true });
            return updatedUser;
        }
    }

    static async confirmUser(email: string){
        const res = await UserModel.updateOne({email}, {userConfirmed: true}, {new: true });
    }
}