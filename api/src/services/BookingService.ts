import { ObjectId } from 'mongodb';
import { Booking, BookingModel } from '../entity/booking';

export class BookingService{
    static async getBookings(): Promise<Booking[]> {
        return BookingModel.find();
    }

    static async getBookingById(id: string): Promise<Booking> {
        return BookingModel.find({_id: new ObjectId(id)});
    }
}