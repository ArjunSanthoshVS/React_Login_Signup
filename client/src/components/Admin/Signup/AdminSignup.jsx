import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function AdminSignup() {

    const [data, setData] = useState({
        fullName: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:5000/api/admin_signup"
            const { data: res } = await axios.post(url, data)
            navigate("/admin_login")
            console.log(res.message);
        } catch (error) {
            if (error.response && error.response.status >= 400
                && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

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
