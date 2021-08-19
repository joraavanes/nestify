import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { NestType, NestModel } from "../entity/nest";
import { mutation } from './mutation'

const nests = [
    {title: 'house1', rooms:2, parking: 1, latitude: 103.11, longitude: 15},
    {title: 'house2', rooms:4, parking: 2, latitude: 343.11, longitude: 17},
    {title: 'house3', rooms:1, parking: 0, latitude: 103.11, longitude: 13},
];

const rootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields:{
        message:{
            type: GraphQLString,
            resolve(parent, args, ctx, info){
                return `Hello world`;
            }
        },
        nests:{
            type: new GraphQLList(NestType),
            resolve(){
                return NestModel.find();
            }
        }
    }
});

export default new GraphQLSchema({
    query: rootQuery,
    mutation
});