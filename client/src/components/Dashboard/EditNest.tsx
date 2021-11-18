import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { EDIT_NEST } from '../../graphql/mutations';
import { GET_NEST } from '../../graphql/queries';
import { GetNestData, Nest, NestMutationTVariables, NestQueryTVariables } from '../../types';
import NestForm from './NestForm';

const EditNest = () => {
    const history = useHistory();
    const {id}: {id: string} = useParams();

    const {data, loading, error} = useQuery<GetNestData, NestQueryTVariables>(GET_NEST,{
        variables: {
            id
        }
    });

    const [EditNest, {data: mutationData, loading: mutationLoading, error: mutationError}] = useMutation<GetNestData, NestMutationTVariables>(EDIT_NEST);

    const handleEditNest = (nest: Nest) => {
        // console.log(nest);
        EditNest({
            variables: { 
                nestId: nest._id,
                ...nest
            }
        });
    };

    useEffect(() => {
        // console.log(data, loading, error);
        
        return () => {
        };
    }, [data, loading, error]);

    useEffect(() => {
        // console.log(mutationData, mutationLoading, mutationError);

        return () => {
        };
    }, [mutationData, mutationLoading, mutationError]);

    useEffect(() => {
        if(mutationData){
            history.push('/dashboard');
        }

        return () => {};
    }, [mutationData]);

    return (
        <div>
            {data &&
                <NestForm handleNestMutation={handleEditNest} nest={data.nest}/>
            }
        </div>
    );
};

export default EditNest;