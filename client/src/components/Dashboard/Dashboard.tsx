import React from 'react'
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { GET_NESTS } from '../../graphql/queries';
import { GetNestsData } from '../../types';

const Dashboard = () => {
    const {data, loading, error} = useQuery<GetNestsData>(GET_NESTS);

    return (
        <div>
            <NavLink to="/dashboard/AddNest">Add Nest</NavLink>
            {error && <p>Failed getting the nests</p>}
            {data && data.nests.map(nest => (
                <div key={nest._id}>
                    <p>{nest.title} - {nest.price} - <NavLink to={`/dashboard/EditNest/${nest._id}`}>Edit</NavLink></p>
                </div>
            ))}
        </div>
    )
};

export default Dashboard;
