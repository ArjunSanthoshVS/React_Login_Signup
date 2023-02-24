import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import axios from 'axios';
import './AdminLogin.css'

function AdminLogin() {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState('')

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: res } = await axios.post("http://localhost:5000/api/admin_login", data)
            localStorage.setItem("adminToken", res.data)
            window.location = "/admin"
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }
    return (
        <MDBContainer >

            < MDBRow className='d-flex justify-content-center align-items-center h-10' >
                <MDBCol col='12'>

                    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                            <p className="text-white-50 mb-5">Please enter your login and password!</p>
                            <form onSubmit={handleSubmit}>
                                <MDBInput className='mb-4'
                                    labelClass='text-white'
                                    label='Email address'
                                    id='formControlLg'
                                    type='email'
                                    placeholder='Email'
                                    name='email'
                                    onChange={handleChange}
                                    value={data.email}
                                    required
                                    size="lg" />
                                <MDBInput className='mb-3'
                                    labelClass='text-white'
                                    label='Password'
                                    id='formControlLg'
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    onChange={handleChange}
                                    required
                                    value={data.password}
                                    size="lg" />
                                {error && <div className="error_msg">{error}</div>}

                                <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                                <div className="text-center">
                                    <MDBBtn outline className='px-5' color='white' size='lg'>
                                        Login
                                    </MDBBtn>
                                </div>
                            </form>
                            <div className='d-flex flex-row mt-3 mb-5'>
                                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                    <MDBIcon fab icon='facebook-f' size="lg" />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                    <MDBIcon fab icon='twitter' size="lg" />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                    <MDBIcon fab icon='google' size="lg" />
                                </MDBBtn>
                            </div>


                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow >

        </MDBContainer >
    )
}

export default AdminLogin
