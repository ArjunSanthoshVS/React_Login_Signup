import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../Redux/Features/userSlice'
import Spinner from 'react-bootstrap/Spinner';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"

function Login() {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const { loading, error } = useSelector((state) => ({ ...state.user }))

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data, 'lllll');
        dispatch(login({ data, navigate }))
    };

    return (
        <div className='login_container'>
            <div className="login_form_container">
                <div className="left">
                </div>
                <div className="right">

                    <form className='form_container' onSubmit={handleSubmit}>
                        <h1 className='text' style={{ color: "#df4e4e" }}>Login to your Account</h1>
                        <input
                            type='email'
                            placeholder='Email'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                            className='input'
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            required
                            value={data.password}
                            className='input'
                        />
                        {error && <div className="error_msg">{error}</div>}
                        <button type='submit' className='green_btn'>
                            {loading && (
                                <Spinner className='me-2' animation="border" size="sm" />
                            )}
                            Login
                        </button>
                    </form>
                    <GoogleOAuthProvider clientId='...'>
                        <GoogleLogin onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                            onError={() => {
                                console.log('Login Failed');
                            }} />
                    </GoogleOAuthProvider>
                    <Link to={'/signup'}>
                        <button type='button' className='white_btn'>
                            SignUp
                        </button>
                    </Link>
                </div>
            </div >
        </div >
    )
}

export default Login
