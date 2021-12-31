import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
import { GetNestData, NestQueryTVariables } from '../../types';
import { GET_NEST } from '../../graphql/queries';
import img from '../../assets/nest.jpg';

const Nest: React.FC = () => {
    const location = useLocation();
    const params: {id: string} = useParams();

    const { data, error, loading } = useQuery<GetNestData, NestQueryTVariables>(GET_NEST, {
        variables: {
            id: params.id
        }
    });

    console.log(location);
    console.log(params);

    useEffect(() => {
        console.log(data, error, loading);
        return () => {
            
        }
    }, [data, error, loading]);

    return (
        <div className="container">
            <div className="row">
                <div className="col col-md-8">
                    {loading && <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>}
                    
                    <h2 className="mt-3 mb-4 d-block">{data?.nest.title}</h2>
                    <img src={img} alt="" className="img-fluid" />

                    

                    <pre>
                        {data && JSON.stringify(data, undefined, 3)}
                    </pre>

                </div>
                <div className="col col-md-4 mt-5">
                    <div className="card rounded sticky-md-top border-primary mt-4" style={{maxWidth: '100%', top: '1.25em'}}>
                        <div className="card-body">
                            <h4 className="dispaly-3 text-center">&euro; {data?.nest.price} <span className="text-muted"> / monthly</span></h4>
                            <h3 className="text-center">Check Availablity</h3>

                            <h5 className="card-title">Card title</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="card-link">Card link</a>
                            <a href="#" className="card-link">Another link</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nest;