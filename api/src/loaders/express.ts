import colors from 'colors';
import express, {
    Application,
    Request,
    Response,
    NextFunction,
} from 'express';

export const expressLoader = async (): Promise<Application> => {
    const app: Application = express();

    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send('Hello ts express. Welcome to typescript express');
    });

    app.get('/info', (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send('info');
    });

    return app;
};
