import { ObjectId } from 'mongodb';
import { UserService } from '.';
import { Booking, BookingModel, CreateBooking, UpdateBooking } from '../entity/booking';
import { NestModel } from '../entity/nest';

export class BookingService {
    static async getBookings(): Promise<Booking[]> {
        return await BookingModel
                        .find()
                        .populate('nest')
                        .populate('tenant');
    }

    static async getBookingById(id: string): Promise<Booking> {
        return await BookingModel
                        .findOne({ _id: new ObjectId(id) })
                        .populate('tenant')
                        .populate('nest');
    }

    static async getBookingsOfANest(id: string): Promise<Booking[]> {
        return await BookingModel.find({
                        nest: new Object(id),
                    }).populate('nest')
                    .populate('tenant')
                    .exec();
    }

    static async addBooking(token: string, nestId: string, checkIn: number, checkout?: number): Promise<CreateBooking> {
        try {
            const tenant = await UserService.getUserByToken(token);
            const nest = await NestModel.findOne({ _id: new ObjectId(nestId) });

            if (!tenant || !nest) {
                throw new Error('Failed to add booking');
            }

            const model = new BookingModel({
                tenant: tenant._id,
                nest: nest._id,
                checkIn: new Date(checkIn),
            });

            const doc = await model.save();

            return {
                _id: doc._id,
                tenant,
                nest,
                checkIn: new Date(checkIn)
            };
        } catch (error) {
            // todo: log error
            return Promise.reject('Failed to add Booking');
        }
    }

    static async updateBooking(id: string, payload: UpdateBooking): Promise<Booking> {
        try {
            let updatedData:any = {};
            if (payload.nest) updatedData.nest = await NestModel.findOne({ _id: new ObjectId(payload.nest.toString()) });
            if (payload.tenant) updatedData.tenant = await UserService.getUserById(payload.tenant.toString());
            if (payload.checkIn) updatedData.checkIn = new Date(payload.checkIn);
            if (payload.checkOut) updatedData.checkOut = new Date(payload.checkOut);

            return await BookingModel.findByIdAndUpdate(
                id,
                updatedData,
                {
                    new: true,
                },
            );
        } catch (error) {
            // todo: log error
            return Promise.reject('Failed updating the booking');
        }
    }

    static async deleteBooking(id: string) {
        try {
            return await BookingModel.findOneAndDelete({
                _id: new ObjectId(id),
            });
        } catch (error) {
            // todo: log error
            return Promise.reject('Failed deleting booking');
        }
    }
}
