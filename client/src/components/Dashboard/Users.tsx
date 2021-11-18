import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { GET_USERS } from '../../graphql/queries';
import { GetUsersData } from '../../types';

const Users = () => {
    const { data, error, loading } = useQuery<GetUsersData>(GET_USERS);

    useEffect(() => {
        
        return () => {};
    }, [data]);

    return <div>
        <NavLink to="/Dashboard">Dashboard</NavLink>
        {loading && <span>Loading ....</span>}

        {data && data.users.map(user => <p key={user._id}>{user.email} - {user.name} - {user.surname}</p>)}
    </div>
};

export default Users;