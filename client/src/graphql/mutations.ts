import { gql } from '@apollo/client'

export const ADD_NEST = gql`
    mutation AddNestMutation($title: String!, $type: String!, $size: Float!, $furnished: Boolean!, $dishwasher: Boolean!, $washingMachine: Boolean!, $dryer: Boolean!, $airConditioning: Boolean!, $heating: Boolean!, $rooms: Int!, $parking: Int!, $longitude: Float!, $latitude: Float!, $price: Int!) {
        addNest(title: $title, type: $type, size: $size, furnished: $furnished, dishwasher: $dishwasher, washingMachine: $washingMachine, dryer: $dryer, airConditioning: $airConditioning, heating: $heating, rooms: $rooms, parking: $parking, longitude: $longitude, latitude: $latitude, price: $price) {
            title
            type
            size
            furnished
            dishwasher
            washingMachine
            dryer
            airConditioning
            heating
            rooms
            parking
            longitude
            latitude
            price
            photos
        }
    }
`;