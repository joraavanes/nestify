import { expressLoader } from './loaders/express';

const PORT: Number = Number(process.env.PORT) || 5000;

const startServer = async () => {
    const app = await expressLoader();

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

startServer();


