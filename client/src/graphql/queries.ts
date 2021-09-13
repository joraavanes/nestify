import { gql } from "@apollo/client";

export const GET_NESTS = gql`
    query {
        nests {
            _id
            title
            price
            furnished
            dryer
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
            dryer
            parking
            rooms
            latitude
            longitude
        }
    }
`;