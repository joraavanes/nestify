import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Nest: React.FC = () => {
    const location = useLocation();
    const params = useParams();

    console.log(location);
    console.log(params);

    return (
        <div>
            <h2>Nest</h2>
            <p>This is Nest Component</p>
        </div>
    );
};

export default Nest;