import colors from 'colors';
import { Application } from 'express';
import { expressLoader } from './loaders/express';
import config from './config';

export const startServer = async (): Promise<Application> => {
    const app = await expressLoader();

    app.listen(
        config.port,
        () => console.log(colors.bgGreen(colors.black(` Server is running on port ${config.port} `))),
    );
    return app;
};

startServer();
