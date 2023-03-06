import React, { useEffect, useState } from 'react';
import './Profile.css'
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
} from 'mdb-react-ui-kit';
import HomeNav from '../HomeNav/HomeNav'
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        bloodGroup: "",
        birthDate: "",
        weight: "",
        age: "",
        question: "",
        gender: "",
        locality: ""
    })

    const handleChange = ({ currentTarget: input }) => {
        setUserData({ ...userData, [input.name]: input.value });
    };

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("userToken")
                console.log(token, 'kkkkk');
                const response = await axios.get("http://localhost:5000/profile/donor?id=" + token.data.others._id)
                const data = response.data
                console.log(data,'jjjjjjjjjj');
            } catch (error) {
                console.log('error adichuuuu');
            }
        }
        fetchData()
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = JSON.parse(localStorage.getItem("userToken"));
            const result = await axios.post("http://localhost:5000/profile/donor?id=" + token.data.others._id, userData)
            let data = result.config.data
            console.log(result.config.data, 'lllllllll');
            navigate('/')
        } catch (error) {
            console.log('Errorrr aayiii');
        }
    }
    return (
        <section>
            <MDBContainer className="p-5">
                <HomeNav />
                <h1 className='donorHeading mt-5 fw-b'>Donor Profile</h1>
                <MDBRow className=''>
                    <MDBCol lg="4" className='d-flex align-items-center justify-content-center'>
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                                <p className="text-muted mb-1">Full Stack Developer</p>
                                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <Button variant="contained" component="label">
                                        Image
                                        <input hidden accept="image/*" multiple type="file" />
                                    </Button>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol lg="8">
                        <form onSubmit={handleSubmit}>
                            <MDBRow className='mb-3'>
                                <MDBCol>
                                    <label id='labelAll'>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        onChange={handleChange}
                                        placeholder='First Name'
                                        className='form-control' required />
                                </MDBCol>
                                <MDBCol>
                                    <label id='labelAll'>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        onChange={handleChange}
                                        placeholder='Last Name'
                                        className='form-control' required />
                                </MDBCol>
                            </MDBRow>

                            <MDBRow className='mb-3'>
                                <MDBCol>
                                    <label id='labelAll'>Blood Group</label>
                                    <select className='form-control'  name='bloodGroup' onChange={handleChange} required>
                                        <option value="A+ve">A+ve</option>
                                        <option value="A-ve">A-ve</option>
                                        <option value="B+ve">B+ve</option>
                                        <option value="B-ve">B-ve</option>
                                        <option value="AB+ve">AB+ve</option>
                                        <option value="AB-ve">AB-ve</option>
                                        <option value="O+ve">O+ve</option>
                                        <option value="O-ve">O-ve</option>
                                    </select>
                                </MDBCol>
                                <MDBCol>
                                    <label id='labelAll'>D.O.B</label>
                                    <input
                                        type="date"
                                        name="birthDate"
                                        onChange={handleChange}
                                        placeholder='DOB'
                                        className='form-control' required />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className='mb-3'>
                                <MDBCol>
                                    <label id='labelAll'>Weight</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        onChange={handleChange}
                                        placeholder='Weight'
                                        className='form-control' required />
                                </MDBCol>
                                <MDBCol>
                                    <label id='labelAll'>Age</label>
                                    <input type="number"
                                        name="age"
                                        onChange={handleChange}
                                        placeholder='Age'
                                        className='form-control' required />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className='mb-3'>
                                <MDBCol>
                                    <label id='labelAll'>Did you donate blood for past 3 monts</label>
                                    <select className='form-control' name='question' onChange={handleChange}>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </MDBCol>
                                {/* <MDBCol>
                                    <label id='labelAll'>Blood test Result</label>
                                    <input type="file"
                                        name="testResult"
                                        onChange={handleChange}
                                        value={user.Result}
                                        className='form-control' required />
                                </MDBCol> */}
                            </MDBRow>
                            <MDBRow className='mb-3'>
                                {/* <MDBCol>
                                    <MDBInput id='form6Example1' label='Gender' />
                                </MDBCol> */}
                                <MDBCol>
                                    <label id='labelAll' className='mb-2'>Gender</label> <br />

                                    <input type="radio" value="male" id="male" className='me-1'
                                        onChange={handleChange} name="gender" />
                                    <label>Male</label>

                                    <input type="radio" value="female" id="female" className='ms-3 me-1'
                                        onChange={handleChange} name="gender" />
                                    <label>Female</label>

                                    <input type="radio" value="others" id="others" className='ms-3 me-1'
                                        onChange={handleChange} name="gender" />
                                    <label>Others</label>
                                </MDBCol>
                                {/* <label className='ms-2'>Gender</label>
                                <div className='d-flex'>
                                    <Radio
                                        checked={selectedValue === 'a'}
                                        onChange={handleChange}
                                        value="a"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'A' }}
                                    />
                                    <Radio
                                        checked={selectedValue === 'b'}
                                        onChange={handleChange}
                                        value="b"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'B' }}
                                    />
                                </div> */}
                                <MDBCol>
                                    <label id='labelAll'>Locality</label>
                                    <input type="text"
                                        name="locality"
                                        onChange={handleChange}
                                        placeholder='Locality'
                                        className='form-control' required />
                                </MDBCol>
                            </MDBRow>

                            {/* <MDBInput className='mt-3' wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Additional information about you' /> */}

                            <MDBBtn className='mb-4 mt-3' type='submit' block>
                                Save
                            </MDBBtn>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}