import colors from 'colors';
import { expressLoader } from './loaders/express';
import config from './config';

const startServer = async () => {
    const app = await expressLoader();

    app.listen(config.port, () => console.log(colors.bgGreen(` Server is running on port ${config.port} `)));
};

startServer();
