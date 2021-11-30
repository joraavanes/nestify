import { NestModel, Nest } from '../entity/nest';

export class NestService {
    static async getNests(): Promise<Nest[]> {
        return await NestModel.find();
    }

    static async getNest(id: string): Promise<Nest> {
        return await NestModel.findById(id);
    }

    static async addNest(nest: Nest){
        const model = new NestModel({...nest});
        return await model.save();
    }
}