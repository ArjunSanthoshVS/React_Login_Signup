import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import axios from 'axios'


function Login() {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: res } = await axios.post("http://localhost:5000/api/login", data);
            localStorage.setItem("token", res.data);
            window.location = "/";
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
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
                            Login
                        </button>
                    </form>
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
