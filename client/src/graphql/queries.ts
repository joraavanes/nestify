import { gql } from "@apollo/client";

export const GET_NESTS = gql`
    query {
        nests {
            _id
            title
            price
            furnished
            washingMachine
            heating
            latitude
            longitude
        }
    }
`;

export const GET_NEST = gql`
    query getNest($id: ID!){
        nest(id: $id) {
            _id
            title
            type
            size
            price
            furnished
            dishwasher
            washingMachine
            dryer
            airConditioning
            heating
            parking
            rooms
            latitude
            longitude
        }
    }
`;

export const GET_USERS = gql`
    query Users {
        users {
            _id
            email
            name
            surname
            lastLogin
            userConfirmed
        }
    }
`;