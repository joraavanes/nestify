import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { 
    BookingService,
    NestService,
    UserService
} from '../services';
import { 
    BookingType, 
    NestModel,
    NestType,
    LoginType,
    UserType 
} from '../entity/';

export const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addNest: {
            type: NestType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                type: { type: GraphQLNonNull(GraphQLString) },
                size: { type: GraphQLNonNull(GraphQLFloat) },
                furnished: { type: GraphQLNonNull(GraphQLBoolean) },
                dishwasher: { type: GraphQLNonNull(GraphQLBoolean) },
                washingMachine: { type: GraphQLNonNull(GraphQLBoolean) },
                dryer: { type: GraphQLNonNull(GraphQLBoolean) },
                airConditioning: { type: GraphQLNonNull(GraphQLBoolean) },
                heating: { type: GraphQLNonNull(GraphQLBoolean) },
                rooms: { type: GraphQLNonNull(GraphQLInt) },
                parking: { type: GraphQLNonNull(GraphQLInt) },
                longitude: { type: GraphQLNonNull(GraphQLFloat) },
                latitude: { type: GraphQLNonNull(GraphQLFloat) },
                price: { type: GraphQLNonNull(GraphQLInt) },
                photos: { type: GraphQLList(GraphQLString) },
                userId: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(source, { userId, ...args }:any) {
                return await NestService.addNest(userId, args);
            },
        },
        editNest: {
            type: NestType,
            args: {
                nestId: { type: GraphQLNonNull(GraphQLString) },
                title: { type: GraphQLString },
                type: { type: GraphQLString },
                size: { type: GraphQLFloat },
                furnished: { type: GraphQLBoolean },
                dishwasher: { type: GraphQLBoolean },
                washingMachine: { type: GraphQLBoolean },
                dryer: { type: GraphQLBoolean },
                airConditioning: { type: GraphQLBoolean },
                heating: { type: GraphQLBoolean },
                rooms: { type: GraphQLInt },
                parking: { type: GraphQLInt },
                longitude: { type: GraphQLFloat },
                latitude: { type: GraphQLFloat },
                price: { type: GraphQLInt },
                photos: { type: GraphQLString },
            },
            async resolve(source, args) {
                const result = await NestModel.findByIdAndUpdate(
                    args.nestId,
                    args,
                    { new: true, useFindAndModify: false },
                );
                return result;
            },
        },
        removeNest: {
            type: NestType,
            args: {
                nestId: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(source, { nestId }) {
                const result = await NestModel.findByIdAndRemove(
                    nestId,
                    { useFindAndModify: false, new: false },
                );
                return result;
            },
        },
        registerUser: {
            type: UserType,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString), },
                name: { type: GraphQLNonNull(GraphQLString) },
                surname: { type: GraphQLNonNull(GraphQLString) },
                userConfirmed: { type: GraphQLBoolean },
            },
            async resolve(source, {email, password, name, surname, userConfirmed}) {
                const user = await UserService.createUser({email, password, name, surname, userConfirmed});
                return user;
            },
        },
        login: {
            type: LoginType,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(source, { username, password }){
                const token = await UserService.loginUser(username, password);

                if(token){
                    return {
                        result: 'success',
                        description: 'Logged in successfully',
                        token
                    }
                }

                return { result: 'Login Failed', description: 'Username or password is incorrect.' };
            }
        },
        addBooking: {
            type: BookingType,
            args:{
                tenant: { type: GraphQLNonNull(GraphQLString) },
                nest: { type: GraphQLNonNull(GraphQLString) },
                checkIn: { type: GraphQLNonNull(GraphQLString)},
                checkOut: { type: GraphQLString },
            },
            async resolve(source, {tenant, nest, checkIn, checkOut}){
                return await BookingService.addBooking(tenant, nest, +checkIn, +checkOut);
            }
        },
        updateBooking: {
            type: BookingType,
            args: {
                _id: { type: GraphQLNonNull(GraphQLString)},
                tenant: { type: GraphQLString },
                nest: { type: GraphQLString },
                checkIn: { type: GraphQLString},
                checkOut: { type: GraphQLString },
            },
            async resolve(source, { _id, tenant, nest, checkIn, checkOut }){
                return await BookingService.updateBooking(
                    _id, { 
                        tenant, 
                        nest, 
                        checkIn: +checkIn,
                        checkOut: +checkOut 
                    });
            }
        },
        removeBooking: {
            type: BookingType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) }
            },
            async resolve(source, {id}){
                return await BookingService.deleteBooking(id);
            }
        },
    },
});
