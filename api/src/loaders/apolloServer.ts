import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import schema from '../graphql/schema';

export const initializeApolloServer = async (app: Application): Promise<void> => {
    const apolloServer = new ApolloServer({
        schema
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        path: '/graphql' 
    });
};