import React from 'react'
import GoogleLogin from 'react-google-login'

export default () => {

    const handleResponse = (response: any) => {
        console.log(response);
    };

    return (
        <div>
            <GoogleLogin
                clientId="634196830403-j8q0jipn7mqb2271vs29u8a3fb3sirfu.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={handleResponse}
                onFailure={handleResponse}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}