import { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLID
} from 'graphql';
import { NestType } from './nest';
import { UserType } from './user';

export const BookingType = new GraphQLObjectType({
    name: 'Booking',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLID) },
        nest: { type: GraphQLNonNull(NestType) },
        tenant: { type: GraphQLNonNull(UserType) },
        checkIn: { type: GraphQLNonNull(GraphQLInt) },
        checkOut: { type: GraphQLInt },
    })
});