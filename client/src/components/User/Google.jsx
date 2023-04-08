import React from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { decodeJwt } from 'jose'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { setUser } from '../../Redux/Features/User/userSlice'
function Google() {
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            console.log(credentialResponse);
            const { credential } = credentialResponse;
            const payload = credential ? decodeJwt(credential) : undefined;
            if (payload) {
                console.log(payload);
                const response = await axios.get('http://localhost:5000/user/googleLogin', {
                    headers: {
                        Authorization: `Bearer ${credential}`
                    }
                });
                const user = response.data;
                console.log( user , 'lllljnj');
                localStorage.setItem('userToken', JSON.stringify(user));
                setUser(user) // Store the token in local storage
                window.location = '/'; // Redirect the user to the home page
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };
    return (
        <>
            <Toaster toastOptions={{ duration: 4000 }} />
            <div className="App">
                <div className="card">
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={console.error}
                        useOneTap
                    />
                </div>
            </div>
        </>
    )
}

export default Google
