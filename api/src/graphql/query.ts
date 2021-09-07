import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
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
        nest: {
            type: NestType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(source, { id }) {
                return NestModel.findById(id);
            },
        },
    },
});
