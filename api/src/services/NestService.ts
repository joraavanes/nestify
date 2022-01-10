import { UserService } from '.';
import { User } from '../entity';
import { NestModel, Nest, UpdateNest } from '../entity/nest';

export class NestService {
    static async getNests(): Promise<Nest[]> {
        return await NestModel.find();
    }

    static async getNest(id: string): Promise<Nest> {
        return await NestModel.findById(id)
                                .populate('landlord');
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

    static async updateNest(id: string, payload: UpdateNest): Promise<Nest> {
        try {
            let updatedData: any = { ...payload };
            if (payload.landlord) updatedData.landlord = await UserService.getUserById(id);

            return await NestModel.findByIdAndUpdate(
                id,
                updatedData,
                {
                    new: true,
                },
            );
        } catch (error) {
            // todo: log error
            return Promise.reject(error ?? 'Failed updating the nest');
        }
    }

    static async deleteNest(id: string) {
        try {
            // // Find all bookings with matching nest
            // const bookings = await BookingModel.find().populate({
            //     path: 'nest',
            //     math: {
            //         nest: new ObjectId(id)
            //     }
            // }).exec();
            // console.log(bookings);
            const doc = await NestModel.findById(id);
            return await doc.remove();
            
        } catch (error) {
            // todo: log the error
            return Promise.reject(error ?? 'Failed updating the nest');
        }
    }
}
