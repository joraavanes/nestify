import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { GET_NEST } from '../../graphql/queries';
import { GetNestData, Nest, NestQueryTVariables } from '../../types';
import NestForm from './NestForm';

const EditNest = () => {
    const {id}: {id: string} = useParams();

    const {data, loading, error} = useQuery<GetNestData, NestQueryTVariables>(GET_NEST,{
        variables: {
            id
        }
    });

    useEffect(() => {
        console.log(data, loading, error);
        
        return () => {
        };
    }, [data, loading, error]);

    const handleEditNest = (nest: Nest) => {

    };

    return (
        <div>
            {data &&
                <NestForm handleNestMutation={handleEditNest} nest={data.nest}/>
            }
        </div>
    );
};

export default EditNest;