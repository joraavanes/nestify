import { 
    GraphQLID, 
    GraphQLList, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLNonNull 
} from 'graphql';
import { 
    BookingType,
    NestType,
    UserType } from '../entity/';
import { 
    UserService, 
    BookingService, 
    NestService 
} from '../services/';

export const query = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        nests: {
            type: new GraphQLList(NestType),
            async resolve() {
                return await NestService.getNests();
            },
        },
        nest: {
            type: NestType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            async resolve(source, { id }) {
                return await NestService.getNest(id);
            },
        },
        users: {
            type: new GraphQLList(UserType),
            async resolve(){ 
                return await UserService.getUsers(true);
            }
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                email: { type: GraphQLString },
            },
            async resolve(source, { id, email }) {
                return id ? 
                    await UserService.getUserById(id):
                    await UserService.getUserByEmail(email);
            }
        },
        bookings: {
            type: new GraphQLList(BookingType),
            async resolve(){
                return await BookingService.getBookings();
            }
        },
        booking: {
            type: BookingType,
            args:{
                id: { type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(source, { id }){
                return await BookingService.getBookingById(id);
            },
        },
        bookingsOfANest: {
            type: new GraphQLList(BookingType),
            args: {
                id: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(source, { id }){
                return await BookingService.getBookingsOfANest(id);
            }
        }
    },
});
