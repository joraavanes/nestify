import colors from 'colors';
import { connect } from 'mongoose';

const uri: string = process.env.MONGO_URI || 'mongodb://localhost:27017/nestify';

export const mongoLoader = async (): Promise<void> => {
    try {
        const connection = await connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        console.log(colors.bgGreen(' MongoDb connected '));

    } catch (error) {
        throw new Error(error);        
    }
};