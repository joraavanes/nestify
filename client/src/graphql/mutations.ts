import { gql } from '@apollo/client'

export const ADD_NEST = gql`
    mutation AddNestMutation($title: String!, $type: String!, $size: Float!, $furnished: Boolean!, $dishwasher: Boolean!, $washingMachine: Boolean!, $dryer: Boolean!, $airConditioning: Boolean!, $heating: Boolean!, $rooms: Int!, $parking: Int!, $longitude: Float!, $latitude: Float!, $price: Int!, $userId: String!) {
        addNest(title: $title, type: $type, size: $size, furnished: $furnished, dishwasher: $dishwasher, washingMachine: $washingMachine, dryer: $dryer, airConditioning: $airConditioning, heating: $heating, rooms: $rooms, parking: $parking, longitude: $longitude, latitude: $latitude, price: $price, userId: $userId) {
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

export const EDIT_NEST = gql`
    mutation EditNestMutation($nestId: String!, $title: String, $type: String, $size: Float, $furnished: Boolean, $dishwasher: Boolean, $washingMachine: Boolean, $dryer: Boolean, $airConditioning: Boolean, $heating: Boolean, $rooms: Int, $parking: Int, $longitude: Float, $latitude: Float, $price: Int) {
        editNest(nestId: $nestId, title: $title, type: $type, size: $size, furnished: $furnished, dishwasher: $dishwasher, washingMachine: $washingMachine, dryer: $dryer, airConditioning: $airConditioning, heating: $heating, rooms: $rooms, parking: $parking, longitude: $longitude, latitude: $latitude, price: $price) {
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
        }
    }
`;

export const REMOVE_NEST = gql`
    mutation RemoveNestMutation($nestId: String!){
        removeNest(nestId: $nestId) {
            title
            type
            price
        }
    }
`;

export const LOGIN_USER = gql`
    mutation loginUser($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            result
            description
            token
        }
    }
`;

export const REGISTER_USER = gql`
    mutation RegisterUser($email: String!, $password: String!, $name: String!, $surname: String!) {
        registerUser(email: $email, password: $password, name: $name, surname: $surname) {
            _id
            email
            password
            name
            surname
            lastLogin
            userConfirmed
        }
    }
`;