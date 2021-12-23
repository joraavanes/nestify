import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom'
import { GetNestsData } from '../../types';
import { GET_NESTS } from '../../graphql/queries';
import { NestBox, Title, Info } from './styles/';

const Nests: React.FC = () => {
    const { loading, error, data } = useQuery<GetNestsData>(GET_NESTS);

    useEffect(() => {
        console.log(data);
        console.log(error?.message);

        return () => {
            
        }
    }, [loading, error]);

    return (
        <div className="container-fluid">
            <div className="row">
                <h3 className="pt-3 pb-3">Current Listings</h3>
                {loading && <span>Loading ...</span>}
                {data && data.nests && data.nests.map(nest => (
                    <div key={nest._id} className="col-12 col-sm-6 col-md-3">
                        <NestBox>
                            <Title className="h5" title={nest.title}>{nest.title}</Title>
                            <Info>
                                <div>{nest._id}</div>
                                <div>{nest.price}</div>
                                <div>{nest.latitude}</div>
                                <div>{nest.longitude}</div>
                                <Link to={{
                                    pathname: `/nest/${nest._id}`
                                }} className="btn btn-primary btn-sm mt-2 mb-2 float-end">
                                    Check it out
                                </Link>
                            </Info>
                        </NestBox>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Nests;