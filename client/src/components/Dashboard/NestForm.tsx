import React, { FormEvent, useState } from 'react'
import { Nest } from '../../types';

interface NestFormProps {
    handleNestMutation: (a: Nest) => void;
    nest?: Nest;
};

const NestForm: React.FC<NestFormProps> = ({handleNestMutation, nest}) => {

    const [id, setId] = useState(nest ? nest._id : '');
    const [title, setTitle] = useState(nest ? nest.title : '');
    const [type, setType] = useState(nest ? nest.type : '');
    const [size, setSize] = useState<number>(nest ? nest.size : 0);
    const [furnished, setFurnished] = useState<boolean>(nest ? nest.furnished : false);
    const [dishwasher, setDishwasher] = useState<boolean>(nest ? nest.dishwasher : false);
    const [washingMachine, setWashingMachine] = useState<boolean>(nest ? nest.washingMachine : false);
    const [dryer, setDryer] = useState<boolean>(nest ? nest.dryer : false);
    const [airConditioning, setAirconditioning] = useState<boolean>(nest ? nest.airConditioning : false);
    const [heating, setHeating] = useState<boolean>(nest ? nest.heating : false);
    const [parking, setParking] = useState<number>(nest ? nest.parking : 0);
    const [rooms, setRooms] = useState<number>(nest ? nest.rooms : 0);
    const [longitude, setLongitude] = useState<number>(nest ? nest.longitude : 0);
    const [latitude, setLatitude] = useState<number>(nest ? nest.latitude : 0);
    const [price, setPrice] = useState<number>(nest ? nest.price : 0);
    const [userId, setUserId] = useState(nest ? nest.userId : '');
    
    const handleFormSubmit = (e:FormEvent) => {
        e.preventDefault();

        handleNestMutation({
            _id: id,
            title,
            type,
            size,
            furnished,
            dishwasher,
            washingMachine,
            dryer,
            airConditioning,
            heating,
            parking,
            rooms,
            longitude,
            latitude,
            price,
            userId,
        });
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input type="hidden" value={id} onChange={e => setId(e.target.value)}/>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="type">type</label>
                    <input type="text" name="type" id="type" value={type} onChange={e => setType(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="size">size</label>
                    <input type="number" name="size" id="size" value={size} onChange={e => setSize(+e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="furnished">furnished</label>
                    <input type="checkbox" name="furnished" id="furnished" checked={furnished} onChange={e => setFurnished(prevState => !prevState)} />
                </div>
                <div>
                    <label htmlFor="dishwasher">dishwasher</label>
                    <input type="checkbox" name="dishwasher" id="dishwasher" checked={dishwasher} onChange={e => setDishwasher(prevState => !prevState)}/>
                </div>
                <div>
                    <label htmlFor="washingMachine">washingMachine</label>
                    <input type="checkbox" name="washingMachine" id="washingMachine" checked={washingMachine} onChange={e => setWashingMachine(prevState => !prevState)}/>
                </div>
                <div>
                    <label htmlFor="dryer">dryer</label>
                    <input type="checkbox" name="dryer" id="dryer" checked={dryer} onChange={e => setDryer(prevState => !prevState)} />
                </div>
                <div>
                    <label htmlFor="airConditioning">airConditioning</label>
                    <input type="checkbox" name="airConditioning" id="airConditioning" checked={airConditioning} onChange={e => setAirconditioning(prevState => !prevState)} />
                </div>
                <div>
                    <label htmlFor="heating">heating</label>
                    <input type="checkbox" name="heating" id="heating" checked={heating} onChange={e => setHeating(prevState => !prevState)} />
                </div>
                <div>
                    <label htmlFor="parking">parking</label>
                    <input type="number" name="parking" id="parking" value={parking} onChange={e => setParking(+e.target.value)} />
                </div>
                <div>
                    <label htmlFor="rooms">rooms</label>
                    <input type="text" name="rooms" id="rooms" value={rooms} onChange={e => setRooms(+e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="longitude">longitude</label>
                    <input type="number" name="longitude" id="longitude" value={longitude} onChange={e => setLongitude(+e.target.value)} />
                </div>
                <div>
                    <label htmlFor="latitude">latitude</label>
                    <input type="number" name="latitude" id="latitude" value={latitude} onChange={e => setLatitude(+e.target.value)} />
                </div>
                <div>
                    <label htmlFor="price">price</label>
                    <input type="number" name="price" id="price" value={price} onChange={e => setPrice(+e.target.value)} />
                </div>
                <div>
                    <label htmlFor="userId">userId</label>
                    <input type="text" name="userId" id="userId" value={userId} onChange={e => setUserId(e.target.value)} />
                </div>
                <div>
                    <input type="submit" value="Add the nest"/>
                </div>
            </form>
        </div>
    )
}

export default NestForm
