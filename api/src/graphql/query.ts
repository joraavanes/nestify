import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { BookingType } from '../entity/booking';
import { NestModel, NestType } from '../entity/nest';
import { UserType } from '../entity/user';
import { UserService,BookingService } from '../services/';
import { NestService } from '../services/NestService';

export const query = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        message: {
            type: GraphQLString,
            resolve() {
                return 'Hello world';
            },
        },
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
            resolve(){ 
                return UserService.getUsers(true);
            }
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                email: { type: GraphQLString },
            },
            resolve(source, { id, email }) {
                return id ? 
                    UserService.getUserById(id):
                    UserService.getUserByEmail(email);
            }
        },
        bookings: {
            type: new GraphQLList(BookingType),
            resolve(){
                return BookingService.getBookings();
            }
        }
    },
});
