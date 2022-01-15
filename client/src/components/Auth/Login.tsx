import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { LOGIN_USER } from '../../graphql/mutations';
import { LoginData, LoginVariables } from '../../types/';

const Login: React.FC = () => {
    const history = useHistory();    
    const [loginUser, {data: jwtData, loading, error}] = useMutation<LoginData,LoginVariables>(LOGIN_USER);
    
    const { getFieldProps, touched, errors, handleSubmit } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().email('Username is not valid. Please check it out').max(25).required('Please enter the username'),
            password: Yup.string().max(50).required('Please enter the password'),
        }),
        onSubmit: values => {
            loginUser({
                variables: {
                    username: values.username,
                    password: values.password
                }
            });
        },
    });

    const handleResponse = (response: any) => {
        console.log(response);
    };

    useEffect(() => {
        if(jwtData && jwtData.login?.result === "success") {
            // todo: store token in the state, jwtData.login.result
            const {token} = jwtData.login;
            localStorage.setItem('AUTH_TOKEN', token);

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
                        <input 
                            type="text" 
                            id="username"
                            {...getFieldProps('username')}
                        />
                        {errors.username && touched.username && <div>{errors.username}</div>}
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password"
                            id="password"
                            {...getFieldProps('password')}
                        />
                        {errors.password && touched.password && <div>{errors.password}</div>}
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