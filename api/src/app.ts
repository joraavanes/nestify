import express, { Application, NextFunction, Request, Response} from 'express'
import { ApolloServer } from 'apollo-server-express'

const PORT: Number = Number(process.env.PORT) || 5000;

const initializeServer = ():void => {
    const apolloServer = new ApolloServer({});
    const app: Application = express();
    
    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.send('Hello ts express. Welcome to typescript express');
    });

    apolloServer.applyMiddleware({
        app,
        path: '/graphql'
    });

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

initializeServer();


