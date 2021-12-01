import { UserService } from '.';
import { User } from '../entity';
import { NestModel, Nest } from '../entity/nest';

export class NestService {
    static async getNests(): Promise<Nest[]> {
        return await NestModel.find();
    }

    static async getNest(id: string): Promise<Nest> {
        return await NestModel.findById(id);
    }

    static async addNest(userId: string, nest: Nest): Promise<Nest> {
        try {
            let landlord: User | undefined;
            if (userId) {
                landlord = await UserService.getUserById(userId);
            }

            if (!landlord) {
                throw new Error('User not found');
            }

            const model = new NestModel({
                ...nest,
                landlord,
            });
            return await model.save();
        } catch (error) {
            // todo: log error
            return Promise.reject(error ?? 'Failed to Add the nest');
        }
    }
}
