import colors from 'colors';
import { connect } from 'mongoose';
import config from '../config';

export const mongoLoader = async (): Promise<void> => {
    try {
        const connection = await connect(config.db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log(colors.bgGreen(' MongoDb connected '));
    } catch (error) {
        throw new Error(error);
    }
};
