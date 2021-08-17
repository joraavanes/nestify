import colors from 'colors';
import express, {Application, Request, Response, NextFunction} from 'express';
import { initializeApolloServer } from "./apolloServer";
import { mongoLoader } from './mongo';

export const expressLoader = async (): Promise<Application> => {
    const app: Application = express();
    
    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.send('Hello ts express. Welcome to typescript express');
    });

    try {
        await mongoLoader();
    } catch (error) {
        console.log(colors.bgRed(error.message));
    }

    await initializeApolloServer(app);

    return app;
};