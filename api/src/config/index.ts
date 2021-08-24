import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/.env` });

interface LooseObject {
    [key: string]: any
}

const env: any = process.env.NODE_ENV;
const db: any = process.env.MONGO_URI;
const port: number = Number(process.env.PORT);

const config: LooseObject = {
    production: {
        env,
        db,
        port,
    },
    development: {
        env,
        db,
        port,
    },
};

export default config[env];
