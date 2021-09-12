import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { ADD_NEST } from '../../graphql/mutations';
import { GetNestData, Nest, NestMutationTVariables } from '../../types';
import NestForm from './NestForm';

const AddNest = () => {
    const history = useHistory();
    const [addNest,{data, loading, error}] = useMutation<GetNestData,NestMutationTVariables>(ADD_NEST);

    const handleAddNest = (nest: Nest) => {
        addNest({
            variables: {...nest}
        });
    };

    useEffect(() => {
        if (data) {
            history.push('/dashboard');
        }

    }, [data]);

    return (
        <div>
            <NestForm handleNestMutation={handleAddNest}/>
        </div>
    );
};

export default AddNest;
