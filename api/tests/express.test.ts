import request from 'supertest';
import { Application } from "express";
import { expressLoader } from '../src/loaders/express'

let app: Application;
const init = async () => app = await expressLoader();
init();

test('should test the api root', async () => {
    await request(app)
        .get('/')
        .expect(200);
});

test('should test the /info', async () => {
    await request(app)
            .get('/info')
            .expect(200);
});
