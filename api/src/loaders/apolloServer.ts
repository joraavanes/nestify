import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import colors from 'colors';
import schema from '../graphql/schema';

export const initializeApolloServer = async (app: Application): Promise<void> => {
    const apolloServer = new ApolloServer({
        schema,
        // introspection: false
    });

    try {
        await apolloServer.start();
        apolloServer.applyMiddleware({
            app,
            path: '/api',
        });
        console.log(colors.bgBlue(' Apollo Server is running '));
    } catch (error) {
        console.log(error.message);
    }
};
