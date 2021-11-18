import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client'
import { GET_NESTS } from '../../graphql/queries';
import { GetNestData, GetNestsData, NestRemoveTVariables } from '../../types';
import { REMOVE_NEST } from '../../graphql/mutations';

const Dashboard = () => {
    const location = useLocation()
    const {data, loading, error, refetch} = useQuery<GetNestsData>(GET_NESTS);

    const [RemoveNest , {data:removeData, loading:removeLoading, error: removeError}] = useMutation<GetNestData,NestRemoveTVariables>(REMOVE_NEST);
    
    useEffect(() => {
        refetch();
        
        return () => {};
    }, [location.pathname, removeData]);

    return (
        <div>
            <NavLink to="/dashboard/AddNest">Add Nest</NavLink>
            {error && <p>Failed getting the nests</p>}
            {data && data.nests.map(nest => (
                <div key={nest._id}>
                    <p>
                        {nest.title} - {nest.price} - 
                        <NavLink to={`/dashboard/EditNest/${nest._id}`}>Edit</NavLink>
                        <button onClick={e => RemoveNest({variables: {nestId: nest._id}})}>
                            Remove
                        </button>
                    </p>
                </div>
            ))}
        </div>
    )
};

export default Dashboard;
