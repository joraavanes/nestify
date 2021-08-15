import express, {Application, Request, Response, NextFunction} from 'express'
import { initializeApolloServer } from "./apolloServer";

export const expressLoader = async (): Promise<Application> => {
    const app: Application = express();
    
    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.send('Hello ts express. Welcome to typescript express');
    });

    await initializeApolloServer(app);

    return app;
};