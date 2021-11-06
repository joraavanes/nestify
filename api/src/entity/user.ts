import { 
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';
import { model, Schema } from 'mongoose';

export const LoginType = new GraphQLObjectType({
    name: 'Login',
    fields: () => ({
        result: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        token: { type: GraphQLString },
    }),
});

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString)},
        email: { type: GraphQLNonNull(GraphQLString)},
        password: { type: GraphQLNonNull(GraphQLString)},
        userConfirmed: { type: GraphQLNonNull(GraphQLBoolean)},
        lastLogin: { type: GraphQLInt},
        name: { type: GraphQLNonNull(GraphQLString)},
        surname: { type: GraphQLNonNull(GraphQLString)},
        tokens: { type: GraphQLList(new GraphQLObjectType({
            name: 'token',
            fields: () => ({
                access: { type: GraphQLNonNull(GraphQLString)},
                token: { type: GraphQLNonNull(GraphQLString)},
            }),
        }))},
    }),
});

interface Token{
    access: string;
    token: string;
}

export interface User {
    _id?: string;
    email: string;
    password: string;
    userConfirmed: boolean;
    lastLogin?: number;
    name: string;
    surname: string;
    tokens?: Token[];
}

const UserSchema = new Schema<User>({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        validate: {
            validator(value: string) {
                return /[a-z]+(\.|_)?([a-z0-9]+(\.|_)?)+?[a-z0-9]+@[a-z0-9]+_?[a-z0-9]+\.[a-z]+/.test(value);
            },
            message(props: any) {
                return `${props.value} doesn't seem to be an email!`;
            },
        },
        trim: true,
        unique: true,
        minlength: 10,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Atleast 6 charachters for password is needed'],
    },
    userConfirmed: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    tokens: [{
        access: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
    }],
});

export const UserModel = model('User', UserSchema);
