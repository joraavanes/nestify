import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { NestModel, NestType } from '../entity/nest';

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
            },
            async resolve(parent, args) {
                const nest = await NestModel.create({
                    title: args.title,
                    type: args.type,
                    size: args.size,
                    furnished: args.furnished,
                    dishwasher: args.dishwasher,
                    washingMachine: args.washingMachine,
                    dryer: args.dryer,
                    airConditioning: args.airConditioning,
                    heating: args.heating,
                    rooms: args.rooms,
                    parking: args.parking,
                    longitude: args.longitude,
                    latitude: args.latitude,
                    price: args.price,
                    photos: args.photos,
                });
                return nest;
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
            resolve(source, args) {
                NestModel.findByIdAndUpdate(
                    args.nestId,
                    args,
                    { new: true, useFindAndModify: false },
                    (err, doc) => {
                        if (err) {
                            throw new Error('Failed updating the nest');
                        }
                        return doc;
                    },
                );
            },
        },
        removeNest: {
            type: NestType,
            args:{
                nestId: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(source, { nestId }) {
                NestModel.findByIdAndRemove(
                    nestId,
                    { useFindAndModify: false, new: false },
                    (err, doc) => {
                        if (err) {
                            throw new Error('Failed removing the nest');
                        }
                        return doc;
                    },
                );
            },
        },
    },
});
