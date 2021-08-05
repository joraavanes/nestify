import { GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql'
import { Schema, model } from 'mongoose'

export const NestType = new GraphQLObjectType({
    name: 'Nest',
    fields: () => ({
        title: {
            type: GraphQLString
        },
        rooms:{
            type: GraphQLInt,
        },
        parking:{
            type: GraphQLInt
        },
        longitude:{
            type: GraphQLFloat
        },
        latitude:{
            type: GraphQLFloat
        }
    })
});

interface Nest {
    title: string;
    rooms: number;
    parking: boolean;
    longitude: number;
    latitude: number;
}

const NestSchema = new Schema<Nest>({
    title: {
        type: String,
        required: true
    },
    rooms:{
        type: Number,
        min: 0,
        max: 10,
        default: 1
    },
    parking:{
        type: Number,
        max: 4,
        default: 0
    },
    longitude:{
        type: Number,
        default: 0
    },
    latitude:{
        type: Number,
        default: 0
    }
});

export const Nest = model('Nest', NestSchema);