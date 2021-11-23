import { model } from 'mongoose';
import { mongoLoader } from '../src/loaders/mongo';
import { Nest, NestModel } from '../src/entity/nest';

const nestModelOne: Nest = {
    title: 'Apartment floor',
    price: 430,
    type: 'apartment',
    size: 40,
    parking: 1,
    rooms: 2,
    airConditioning: true,
    dishwasher: false,
    dryer: false,
    furnished: true,
    heating: true,
    washingMachine: false,
    latitude: 23.11,
    longitude: 13.54,
    photos: [],
};

beforeEach(async () => {
    await mongoLoader();
});

afterEach(async () => {
    await model<Nest>('Nest').deleteMany();
});

test('should add a new nest', async () => {
    const doc = new NestModel(nestModelOne);
    const res: Nest = await doc.save();
    
    expect(res.title).toBe(nestModelOne.title);
});

