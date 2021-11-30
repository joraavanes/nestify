import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: `${__dirname}/.env` });

interface LooseObject {
    [key: string]: any
}

const env: any = process.env.NODE_ENV;
const db: any = process.env.MONGO_URI;
const port: number = Number(process.env.PORT);
const jwtKey: string = '$ecret@Key*Jwt2022';

const config: LooseObject = {
    production: {
        env,
        db,
        port,
        jwtKey,
        staticDir: path.join(__dirname, 'public/')
    },
    development: {
        env,
        db,
        port,
        jwtKey,
        staticDir: path.join(__dirname, '../../public')
    },
    test: {
        env,
        db: 'mongodb://localhost:27017/nestify-test',
        port,
        jwtKey,
    }
};

export default config[env];
