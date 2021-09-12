import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_NEST } from '../../graphql/mutations';
import { GetNestData, Nest, NestMutationTVariables } from '../../types';
import NestForm from './NestForm';

const AddNest = () => {
    const [addNest,{data, loading, error}] = useMutation<GetNestData,NestMutationTVariables>(ADD_NEST);

    const handleAddNest = (nest: Nest) => {
        addNest({
            variables: {...nest}
        });
    };

    useEffect(() => {
        console.log(loading, error, data);

        return () => {
        }
    }, [data,error,loading])

    return (
        <div>
            <NestForm handleNestMutation={handleAddNest}/>
        </div>
    );
};

export default AddNest;
