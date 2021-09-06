import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom'
import { GetNestsData } from '../types';
import { GET_NESTS } from '../graphql/queries';

const Nests: React.FC = () => {
    const { loading, error, data } = useQuery<GetNestsData>(GET_NESTS);

    useEffect(() => {
        console.log(data);
        console.log(error?.message);

        return () => {
            
        }
    }, [loading, error]);

    return (
        <div>
            <h2>Nests</h2>
            {loading && <span>Loading ...</span>}
                {/* {data && data.nests && JSON.stringify(data.nests, undefined, 4)} */}
                {data && data.nests && data.nests.map(nest => (
                    <div key={nest._id}>
                        <div>{nest._id}</div>
                        <div>{nest.title}</div>
                        <div>{nest.price}</div>
                        <div>{nest.latitude}</div>
                        <div>{nest.longitude}</div>
                        <Link to={{
                            pathname: `/nest/${nest._id}`
                        }}>
                            Checkout
                        </Link>
                        <hr />
                    </div>
                ))}
        </div>
    );
};

export default Nests;