import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

const rootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields:{
        message:{
            type: GraphQLString,
            resolve(parent, args, ctx, info){
                return `Hello world`;
            }
        }
    }
});

export default new GraphQLSchema({query: rootQuery});