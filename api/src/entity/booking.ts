import { Schema, model } from 'mongoose';
import { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
} from 'graphql';
import { NestType, Nest } from './nest';
import { User, UserType } from './user';
import { DateScalar } from '../graphql/CustomScalars/DateScalar';

export const BookingType = new GraphQLObjectType({
    name: 'Booking',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLID) },
        nest: { type: GraphQLNonNull(NestType) },
        tenant: { type: GraphQLNonNull(UserType) },
        checkIn: { type: GraphQLNonNull(DateScalar) },
        checkOut: { type: DateScalar },
    })
});

export interface UpdateBooking{
    nest?: string | Nest;
    tenant?: string | User;
    checkIn?: number;
    checkOut?: number;
};

export interface Booking{
    nest: Nest;
    tenant: User;
    checkIn: Date;
    checkOut?: Date;
};

const bookingSchema = new Schema<Booking>({
    nest: {
        type: Schema.Types.ObjectId,
        ref: 'Nest',
        required: true
    },
    tenant: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkIn: {
        type: Date,
        // accepts only if it is one day ahead
        min: function(){
            var d = new Date();
            d.setDate(d.getDate() + 1);
            return d;
        },
        required: true
    },
    checkOut: {
        type: Date,
    }
});

export const BookingModel = model('Booking', bookingSchema);
