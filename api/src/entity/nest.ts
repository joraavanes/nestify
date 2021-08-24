import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { Schema, model } from 'mongoose';

export const NestType = new GraphQLObjectType({
    name: 'Nest',
    fields: () => ({
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
    }),
});

interface Nest {
    title: string,
    type: string,
    size: number,
    furnished: boolean,
    dishwasher: boolean,
    washingMachine: boolean,
    dryer: boolean,
    airConditioning: boolean,
    heating: boolean,
    rooms: number,
    parking: number,
    longitude: number,
    latitude: number,
    price: number,
    phtoos: string[],
}

const NestSchema = new Schema<Nest>({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    furnished: {
        type: Boolean,
        required: true,
        default: false,
    },
    dishwasher: {
        type: Boolean,
        required: true,
        default: false,
    },
    washingMachine: {
        type: Boolean,
        required: true,
        default: false,
    },
    dryer: {
        type: Boolean,
        required: true,
        default: false,
    },
    airConditioning: {
        type: Boolean,
        required: true,
        default: false,
    },
    heating: {
        type: Boolean,
        required: true,
        defualt: false,
    },
    rooms: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
        default: 1,
    },
    parking: {
        type: Number,
        required: true,
        max: 4,
        default: 0,
    },
    longitude: {
        type: Number,
        required: true,
        default: 0,
    },
    latitude: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 100,
        min: 100,
    },
    photos: [{
        type: String,
    }],
});

export const NestModel = model('Nest', NestSchema);
