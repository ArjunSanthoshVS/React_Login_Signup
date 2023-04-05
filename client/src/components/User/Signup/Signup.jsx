import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'react-bootstrap/esm/Spinner'
import { signUp } from '../../../Redux/Features/User/userSlice'


function Signup() {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const { loading, error } = useSelector((state) => ({ ...state.user }))

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signUp({ data, navigate }))
    };

    return (
        <div className='signup_container'>
            <div className="signup_form_container">
                <div className="left">
                    <img src="" alt="" />
                </div>
                <div className="right">
                    <form className='form_container' onSubmit={handleSubmit}>
                        <h1 className='text' style={{ color: "#df4e4e" }}>Create Account</h1>
                        <input
                            type='text'
                            placeholder='First Name'
                            name='firstName'
                            onChange={handleChange}
                            value={data.firstName}
                            className='input'
                        />
                        <input
                            type='text'
                            placeholder='Last Name'
                            name='lastName'
                            onChange={handleChange}
                            value={data.lastName}
                            className='input'
                        />
                        <input
                            type='email'
                            placeholder='Email'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            className='input'
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            className='input'
                        />
                        {error && <div className="error_msg">{error}</div>}
                        <button type='submit' className='green_btn'>
                            {loading && (
                                <Spinner className='me-2' animation="border" size="sm" />
                            )}
                            Signup
                        </button>
                    </form>
                    <Link to={'/login'}>
                        <button type='button' className='white_btn'>
                            SignIn
                        </button>
                    </Link>
                </div>
            </div >
        </div >
    )
}

export default Signup
