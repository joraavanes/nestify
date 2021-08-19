import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { NestModel, NestType } from '../entity/nest';

export const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addNest: {
            type: NestType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                parking: {type: new GraphQLNonNull(GraphQLInt)},
                rooms: {type: new GraphQLNonNull(GraphQLInt)},
                longitude: {type: new GraphQLNonNull(GraphQLFloat)},
                latitude: {type: new GraphQLNonNull(GraphQLFloat)},
            },
            async resolve(parent, args){
                const nest = await NestModel.create({
                    title: args.title,
                    parking: args.parking, 
                    longitude: args.longitude,
                    latitude: args.latitude
                });
                console.log(nest);
                return nest;
            }
        }
    }
})