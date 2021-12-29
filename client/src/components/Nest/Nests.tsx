import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom'
import { GetNestsData } from '../../types';
import { GET_NESTS } from '../../graphql/queries';
import { NestBox, Title, Info, NestImage } from './styles/';
import nestPick from '../../assets/nest.jpg';

const Nests: React.FC = () => {
    const { loading, error, data } = useQuery<GetNestsData>(GET_NESTS);

    useEffect(() => {

        return () => {};
    }, [loading, error]);

    return (
        <div className="container-fluid">
            <div className="row">
                <h3 className="pt-3 pb-3">Current Listings</h3>
                {loading && <span>Loading ...</span>}
                {data && data.nests && data.nests.map(nest => (
                    <div key={nest._id} className="col-12 col-sm-6 col-md-2">
                        <NestBox>
                            <Title className="h5" title={nest.title}>{nest.title}</Title>
                            <NestImage src={nestPick} alt="Nest photo" className="img-fluid" />
                            <Info>
                                {/* <div>{nest._id}</div> */}
                                <div>
                                    {nest.furnished && <span className="badge rounded-pill bg-secondary m-1">Furnished</span>}
                                    {nest.washingMachine && <span className="badge rounded-pill bg-secondary m-1">Washing Machine</span>}
                                    {nest.heating && <span className="badge rounded-pill bg-secondary m-1">Heating</span>}
                                </div>
                                {/* <div>{nest.latitude}</div>
                                <div>{nest.longitude}</div> */}
                                <div>{nest.price} <i className="fas fa-euro-sign"></i> / monthly</div>
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