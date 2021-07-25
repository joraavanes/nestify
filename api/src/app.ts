import express, { Application, NextFunction, Request, Response} from 'express'

const app: Application = express();

const PORT: Number = Number(process.env.PORT) || 5000;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello ts express. Welcome to typescript express');
});

app.listen(PORT, () => console.log('Server is running on http://localhost:5000'));