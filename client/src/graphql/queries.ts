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