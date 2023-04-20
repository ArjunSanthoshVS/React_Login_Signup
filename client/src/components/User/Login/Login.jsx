import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../Redux/Features/User/userSlice'
import Spinner from 'react-bootstrap/Spinner';
import Google from '../Google'

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
        dispatch(login({ data, navigate }))
    };

    return (
        <div className='login_container bg-secondary p-5'>
            <div className="conatiner bg-white p-5">
                <form className='form_container' onSubmit={handleSubmit}>
                    <div className="logo d-flex">
                        <img style={{ width: "55px" }} src="https://res.cloudinary.com/dchrawfgy/image/upload/v1681886400/favicon_awqu1j.png" alt="" />
                        <div>
                            <h1 className='text ms-2 m-0 mt-1' style={{ color: "#df4e4e" }}>Login Account</h1>
                        </div>
                    </div>
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

                <Google />
                <Link to={'/signup'}>
                    <div className="d-flex justify-content-center">
                        <button type='button' className='white_btn'>
                            SignUp
                        </button>
                    </div>
                </Link>
                <Link to={'/otp'}>
                    <p className='text-center'>Forgot Password...?</p>
                </Link>
            </div>
        </div >
    )
}

export default Login
