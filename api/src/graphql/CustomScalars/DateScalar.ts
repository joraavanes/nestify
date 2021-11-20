import { GraphQLScalarType } from "graphql";

export const DateScalar = new GraphQLScalarType({
    name: 'Date',
    parseValue(value){
        return new Date(value)
    },
    serialize(value: number){
        return new Date(value)
    }
});