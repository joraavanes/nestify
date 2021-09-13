import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { EDIT_NEST } from '../../graphql/mutations';
import { GET_NEST } from '../../graphql/queries';
import { GetNestData, Nest, NestMutationTVariables, NestQueryTVariables } from '../../types';
import NestForm from './NestForm';

const EditNest = () => {
    const {id}: {id: string} = useParams();

    const {data, loading, error} = useQuery<GetNestData, NestQueryTVariables>(GET_NEST,{
        variables: {
            id
        }
    });

    const [EditNest, {data: mutationData, loading: mutationLoading, error: mutationError}] = useMutation<GetNestData, NestMutationTVariables>(EDIT_NEST);

    const handleEditNest = (nest: Nest) => {
        console.log(nest);
        EditNest({
            variables: { 
                nestId: nest._id,
                ...nest
            }
        });
    };

    useEffect(() => {
        console.log(data, loading, error);
        
        return () => {
        };
    }, [data, loading, error]);

    useEffect(() => {
        console.log(mutationData, mutationLoading, mutationError);

        return () => {
        };
    }, [mutationData, mutationLoading, mutationError]);

    return (
        <div>
            {data &&
                <NestForm handleNestMutation={handleEditNest} nest={data.nest}/>
            }
        </div>
    );
};

export default EditNest;