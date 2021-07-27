import express, { Application, NextFunction, Request, Response} from 'express'
import { initializeApolloServer } from './graphql/apolloServer';

const PORT: Number = Number(process.env.PORT) || 5000;

const initializeServer = async (): Promise<void> => {
    const app: Application = express();
    
    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.send('Hello ts express. Welcome to typescript express');
    });

    await initializeApolloServer(app);

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

initializeServer();


