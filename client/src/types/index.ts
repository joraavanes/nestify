export interface Nest {
    _id: string,
    title: string,
    type: string,
    size: number,
    furnished: boolean,
    dishwasher: boolean,
    washingMachine: boolean,
    dryer: boolean,
    airConditioning: boolean,
    heating: boolean,
    rooms: number,
    parking: number,
    longitude: number,
    latitude: number,
    price: number,
    photos: string[],
}

export interface GetNestsData {
    nests: Nest[];
    loading: boolean;
    error: Error;
}