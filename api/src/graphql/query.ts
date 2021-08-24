import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { NestModel, NestType } from '../entity/nest';

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
    },
});
