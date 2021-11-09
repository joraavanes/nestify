import { useMutation } from '@apollo/client';
import { FormEvent, useEffect, useState } from 'react';
import { REGISTER_USER } from '../../graphql/mutations';
import { RegisterData, RegisterVariables } from '../../types';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const [RegisterUser, {data, loading, error}] = useMutation<RegisterData, RegisterVariables>(REGISTER_USER);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.log(email, password, name, surname);

        RegisterUser({
            variables: {
                email,
                password,
                name,
                surname
            }
        });
        console.log(data);
    };

    useEffect(() => {
        console.log(data);

        return () => {
            
        };
    }, [data]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="surname">Surname:</label>
                    <input type="text" name="surname" id="surname" value={surname} onChange={e => setSurname(e.target.value)}/>
                </div>
                <div>
                    <input type="submit" value="Register" />
                </div>
            </form>
            {data && JSON.stringify(data, undefined, 3)}
        </div>
    );
};

export default Register;
