import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { adminSignUp } from '../../../Redux/Features/Admin/adminSlice'


function AdminSignup() {

    const [data, setData] = useState({
        fullName: "",
        email: "",
        password: ""
    })

    const { loading, error } = useSelector((state) => ({ ...state.admin }))

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data, 'lllll');
        dispatch(adminSignUp({ data, navigate }))
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
                            placeholder='Full Name'
                            name='fullName'
                            onChange={handleChange}
                            value={data.fullName}
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
                            Signup
                        </button>
                    </form>
                    <Link to={'/admin_login'}>
                        <button type='button' className='white_btn'>
                            SignIn
                        </button>
                    </Link>
                </div>
            </div >
        </div >
    )
}

export default AdminSignup
