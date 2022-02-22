import colors from 'colors';
import config from './config';
import { expressLoader } from './loaders/express';
import { mongoLoader } from './loaders/mongo';
import { initializeApolloServer } from './loaders/apolloServer';

export const startServer = async (): Promise<void> => {
    const app = await expressLoader();
    app.listen(
        config.port,
        () => console.log(colors.bgGreen(colors.black(` Server is running on port ${config.port} `))),
    );

    try {
        await mongoLoader();
    } catch (error: any) {
        console.log(colors.bgRed(error.message));
    }

    await initializeApolloServer(app);
};

startServer();
