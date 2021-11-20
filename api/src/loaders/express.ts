import path from 'path';
import express, {
    Application,
    Request,
    Response,
    NextFunction,
} from 'express';

export const expressLoader = async (): Promise<Application> => {
    const app: Application = express();
    
    app.use(express.static(path.join(__dirname, '../../', 'public')));
        
    app.get('*', (req: Request, res: Response, next: NextFunction) => {
        const clientApp = path.join(__dirname, '../../public', 'index.html');
        res.sendFile(clientApp);
    });

    return app;
};
