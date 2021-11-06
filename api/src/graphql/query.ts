import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { NestModel, NestType } from '../entity/nest';
import { UserType } from '../entity/user';
import { UserService } from '../services/UserService';

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
            resolve() {
                return NestModel.find();
            },
        },
        nest: {
            type: NestType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(source, { id }) {
                return NestModel.findById(id);
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
    },
});
