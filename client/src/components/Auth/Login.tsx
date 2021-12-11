import { useMutation, useQuery } from '@apollo/client';
import React, { FormEvent, useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { LOGIN_USER } from '../../graphql/mutations';
import { LoginData, LoginVariables } from '../../types/';

const Login: React.FC = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginUser, {data: jwtData, loading, error}] = useMutation<LoginData,LoginVariables>(LOGIN_USER);

    const handleResponse = (response: any) => {
        console.log(response);
    };
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        loginUser({
            variables: {
                username,
                password
            }
        });
    };

    useEffect(() => {
        if(jwtData && jwtData.login?.result === "success") {
            // todo: store token in the state, jwtData.login.result
            history.push('/dashboard');
        }

        return () => {};
    }, [jwtData]);

    return (
        <div>
            <GoogleLogin
                clientId="634196830403-j8q0jipn7mqb2271vs29u8a3fb3sirfu.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={handleResponse}
                onFailure={handleResponse}
                cookiePolicy={'single_host_origin'}
            />
            <hr />
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">UserName:</label>
                        <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <input type="submit" value="Login" />
                    </div>
                </form>
            </div>
            <div>
                {jwtData && JSON.stringify(jwtData, undefined, 3)}
            </div>
        </div>
    );
};

export default Login;