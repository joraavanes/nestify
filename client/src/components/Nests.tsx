import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_NESTS = gql`
    query {
        nests {
            
            title
            price
            furnished
            dryer
            latitude
            longitude
        }
    }
`;

interface Nest {
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

interface GetNestsData {
    nests: Nest[];
    loading: boolean;
}

const Nests: React.FC = () => {
    const { loading, error, data } = useQuery(GET_NESTS);

    useEffect(() => {
        console.log(data);
        console.log(error);

        return () => {
            
        }
    }, [loading]);

    return (
        <div>
            <h2>Nests</h2>
            {loading && <span>Loading ...</span>}
            <pre>
                {data && data.nests && JSON.stringify(data.nests, undefined, 4)}
                {data && data.nests && data.nests.map(nest => (
                    <>
                        <div>{nest.title}</div>
                        <div>{nest.price}</div>
                        <div>{nest.latitude}</div>
                        <div>{nest.longitude}</div>
                        <hr />
                    </>
                ))}
            </pre>
        </div>
    );
};

export default Nests;