import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
import { GetNestData, NestQueryTVariables } from '../types';
import { GET_NEST } from '../graphql/queries';

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
        <div>
            <h2>Nest</h2>
            <p>This is Nest Component</p>
            <pre>
                {data && JSON.stringify(data, undefined, 3)}
            </pre>
        </div>
    );
};

export default Nest;