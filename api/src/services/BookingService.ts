import { ObjectId } from 'mongodb';
import { UserService } from '.';
import { Booking, BookingModel } from '../entity/booking';
import { NestModel } from '../entity/nest';

export class BookingService{
    static async getBookings(): Promise<Booking[]> {
        return await BookingModel.find().populate('nest').populate('tenant');
    }

    static async getBookingById(id: string): Promise<Booking> {
        return BookingModel.find({_id: new ObjectId(id)});
    }

    static async addBooking(tenantId: string, nestId: string, checkIn: number, checkout?: number): Promise<Booking>{
        try {
            const tenant = await UserService.getUserById(tenantId);
            const nest = await NestModel.findOne({_id: new ObjectId(nestId)});

            if(!tenant || !nest){
                throw new Error('Failed to add booking');
            }

            const model = new BookingModel({
                tenant: tenant._id,
                nest: nest._id,
                checkIn: new Date(checkIn),
            });

            return await model.save();

        } catch (error) {
            // todo: log error
            return Promise.reject('Failed to add Booking');
        }
    }

    static async deleteBooking(id: string){
        return await BookingModel.findOneAndDelete({
            _id: new ObjectId(id)
        });
    }
}