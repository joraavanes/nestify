import colors from 'colors';
import { connect } from 'mongoose';
import config from '../config';

export const mongoLoader = async (): Promise<void> => {
    try {
        const connection = await connect(config.db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
          });
        config.env !== 'test' && console.log(colors.bgGreen(colors.black(' MongoDb connected ')));
    } catch (error:any) {
        throw new Error(error);
    }
};
