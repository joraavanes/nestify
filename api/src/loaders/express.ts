import path from 'path';
import express, {
    Application,
    Request,
    Response,
    NextFunction,
} from 'express';
import config from '../config'

export const expressLoader = async (): Promise<Application> => {
    const app: Application = express();
    
    app.use(express.static(config.staticDir));
        
    app.get('*', (req: Request, res: Response, next: NextFunction) => {
        const clientApp = path.join(config.staticDir , 'index.html');
        res.sendFile(clientApp);
    });

    return app;
};
