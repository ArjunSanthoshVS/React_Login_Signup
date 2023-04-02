import React, { useState } from 'react';
import './Profile.css'
import {
    MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBBtn, MDBCardText, MDBInput, MDBRadio
} from 'mdb-react-ui-kit';
import { FormControl, Select } from 'react-bootstrap';
import HomeNav from '../HomeNav/HomeNav'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { profile, profilePicture, setIsEditing, updateImage, updateUser } from '../../../Redux/Features/User/userSlice';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function Profile() {
    // const [profileData, setprofileData] = useState({
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     mobile: "",
    //     bloodGroup: "",
    //     birthDate: "",
    //     weight: "",
    //     age: "",
    //     gender: "",
    //     locality: ""
    // })


    const dispatch = useDispatch()

    const { user } = useSelector((state) => ({ ...state?.user?.user }))
    console.log(user.image, 'mnmn');
    const isEditing = useSelector((state) => state.user?.isEditing);


    // const handleChange = ({ currentTarget: input }) => {
    //     setprofileData({ ...profileData, [input.name]: input.value })
    // };

    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        console.log(input, 'kkkk');
        console.log(user, 'klklklk');
        const data = { ...user, [input.name]: input.value };
        console.log(data);
        dispatch(updateUser(data));
    };


    const handleEditClick = () => {
        dispatch(setIsEditing(true))
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(profile({ user, navigate }));
        dispatch(setIsEditing(false));
    }

    const genderOptions = [
        { label: 'Male', value: 'Male', name: 'gender' },
        { label: 'Female', value: 'Female', name: 'gender' },
        { label: 'Others', value: 'Others', name: 'gender' }
    ];

    const groups = [
        {
            value: 'A+ve',
            text: 'A+ve'
        },
        {
            value: 'A-ve',
            text: 'A-ve'
        },
        {
            value: 'B+ve',
            text: 'B+ve'
        },
        {
            value: 'B-ve',
            text: 'B-ve'
        },
        {
            value: 'AB+ve',
            text: 'AB+ve'
        },
        {
            value: 'AB-ve',
            text: 'AB-ve'
        },
        {
            value: 'O+ve',
            text: 'O+ve'
        },
        {
            value: 'O-ve',
            text: 'O-ve'
        }
    ];

    const [currentImageUrl, setCurrentImageUrl] = useState(null);
    // const [imageSelected, setImageSelected] = useState("")

    // const uploadImage = (files) => {
    //     const formData = new FormData()
    //     formData.append("file", imageSelected)
    //     formData.append("upload_preset", "jjwrigkf")
    //     Axios.post("https://api.cloudinary.com/v1_1/dchrawfgy/image/upload", formData).then((response) => {
    //         const newImageUrl = response.data.url;
    //         if (newImageUrl !== currentImageUrl) {
    //             setCurrentImageUrl(newImageUrl);
    //             const updatedata = { ...user, [user.image]: newImageUrl }
    //             dispatch(updateUser(updatedata))
    //             const profileData = { userId: user._id, url: newImageUrl, navigate }
    //             dispatch(profilePicture({ profileData, navigate }));
    //         }
    //     })
    // }

    const uploadImage = async (files) => {
        if (!files || files.length === 0) {
            console.log("No file selected.");
            return;
        }
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "kx4ba1m1");
        try {
            const response = await Axios.post(
                "https://api.cloudinary.com/v1_1/dchrawfgy/image/upload",
                formData
            );
            const newImageUrl = response.data.url;
            console.log(newImageUrl, 'urllll');
            if (newImageUrl !== currentImageUrl) {
                setCurrentImageUrl(newImageUrl);
                const updatedata = { ...user, image: newImageUrl };
                const profileData = { userId: user._id, url: newImageUrl, navigate };
                dispatch(updateUser(updatedata));
                dispatch(profilePicture({ profileData, navigate }));
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section>
            <MDBContainer className="">
                <HomeNav />
                <MDBRow className='mt-5'>
                    <MDBCol lg="4" className='d-flex align-items-center justify-content-center'>
                        <MDBCard className="w-75">
                            <h3 className='donorHeading mt-4 text-center'>Red Wings Profile</h3>
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src={user.image}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                                <h3 className="mt-4 mb-0">{user?.firstName} {user?.lastName}</h3>
                                <h3 className="mb-4">{user?.bloodGroup}</h3>
                                <div className="d-flex justify-content-center mb-2">
                                    <Button onClick={() => {
                                        const input = document.createElement('input');
                                        input.type = 'file';
                                        input.accept = 'image/*';
                                        input.onchange = (e) => {
                                            uploadImage(e.target.files);
                                        };
                                        input.click();
                                    }} variant="contained" component="label">
                                        Image
                                    </Button>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol lg="8" className='mt-5'>
                        <MDBCard className="">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>First Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {isEditing ? (
                                            <input className='form-control' type="text" name='firstName' onChange={handleChange} value={user?.firstName} />
                                        ) : (
                                            <MDBCardText className="text-muted">{user?.firstName}</MDBCardText>
                                        )}
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Last Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {isEditing ? (
                                            <input className='form-control' type="text" name='lastName' onChange={handleChange} value={user?.lastName} />
                                        ) : (
                                            <MDBCardText className="text-muted">{user?.lastName}</MDBCardText>
                                        )}
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {isEditing ? (
                                            <MDBInput type="email" name='email' onChange={handleChange} value={user?.email} />
                                        ) : (
                                            <MDBCardText className="text-muted">{user?.email}</MDBCardText>
                                        )}
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Phone</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {isEditing ? (
                                            <MDBInput type="number" name='mobile' min="1000000000" max="9999999999" onChange={handleChange} value={user?.mobile} />
                                        ) : (
                                            <MDBCardText className="text-muted">{user?.mobile}</MDBCardText>
                                        )}                                      </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Blood Group</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {isEditing ? (
                                            <FormControl
                                                as="select"
                                                name="bloodGroup" 
                                                value={user?.bloodGroup}
                                                onChange={handleChange}
                                            >
                                                {groups.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.text}
                                                    </option>
                                                ))}

                                            </FormControl>
                                        ) : (
                                            <MDBCardText className="text-muted">{user?.bloodGroup}</MDBCardText>
                                        )}
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>D.O.B</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {isEditing ? (
                                            <MDBInput type="date" name='birthDate' onChange={handleChange} value={user?.birthDate} />
                                        ) : (
                                            <MDBCardText className="text-muted">{user?.birthDate}</MDBCardText>
                                        )}                                      </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Weight</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {isEditing ? (
                                            <MDBInput type="number" name='weight' onChange={handleChange} value={user?.weight} />
                                        ) : (
                                            <MDBCardText className="text-muted">{user?.weight}</MDBCardText>
                                        )}                                      </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Age</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {isEditing ? (
                                            <MDBInput type="number" name='age' onChange={handleChange} value={user?.age} />
                                        ) : (
                                            <MDBCardText className="text-muted">{user?.age}</MDBCardText>
                                        )}                                      </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Gender</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {isEditing ? (
                                            // <>
                                            //     <MDBInput label="Male" type="radio" name='gender' onChange={handleChange} value={user?.gender} />
                                            //     <MDBInput label="Male" type="radio" name='gender' onChange={handleChange} value={user?.gender} />
                                            //     <MDBInput label="Male" type="radio" name='gender' onChange={handleChange} value={user?.gender} />
                                            // </>
                                            <>
                                                {genderOptions.map(option => (
                                                    <MDBRadio
                                                        key={option.value}
                                                        label={option.label}
                                                        name={option.name}
                                                        value={option.value}
                                                        onChange={handleChange}
                                                        checked={user?.gender === option.value}
                                                        inline
                                                    />
                                                ))}
                                            </>
                                        ) : (
                                            <MDBCardText className="text-muted">{user?.gender}</MDBCardText>
                                        )}                                      </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>District</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {isEditing ? (
                                            <MDBInput type="text" name='district' onChange={handleChange} value={user?.district} />
                                        ) : (
                                            <MDBCardText className="text-muted">{user?.district}</MDBCardText>
                                        )}                                      </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol sm="9">

                                    </MDBCol>
                                    <MDBCol sm="3">
                                        {isEditing ? (
                                            <MDBBtn onClick={handleSubmit}>Save</MDBBtn>
                                        ) : (
                                            <MDBBtn onClick={handleEditClick}>Edit</MDBBtn>
                                        )}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>


                    {/* <MDBCol lg="8">
                        <form onSubmit={handleSubmit}>
                            <MDBRow className='mb-3'>
                                <MDBCol>
                                    <label id='labelAll'>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={user?.firstName}
                                        onChange={handleChange}
                                        placeholder='First Name'
                                        className='form-control' required />
                                </MDBCol>
                                <MDBCol>
                                    <label id='labelAll'>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={user?.result?.lastName}
                                        onChange={handleChange}
                                        placeholder='Last Name'
                                        className='form-control' required />
                                </MDBCol>
                            </MDBRow>

                            <MDBRow className='mb-3'>
                                <MDBCol>
                                    <label id='labelAll'>Blood Group</label>
                                    <select className='form-control' name='bloodGroup' value={user?.result?.bloodGroup} onChange={handleChange} required>
                                        <option value="Choose">Choose</option>
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
                                        value={user?.result?.birthdate}
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
                                        value={user?.result?.weight}
                                        onChange={handleChange}
                                        placeholder='Weight'
                                        className='form-control' required />
                                </MDBCol>
                                <MDBCol>
                                    <label id='labelAll'>Age</label>
                                    <input type="number"
                                        name="age"
                                        value={user?.result?.age}
                                        onChange={handleChange}
                                        placeholder='Age'
                                        className='form-control' required />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className='mb-3'>
                                <MDBCol>
                                    <label id='labelAll'>Did you donate blood for past 3 monts</label>
                                    <select className='form-control' name='question' onChange={handleChange}>
                                        <option value="Choose">Choose</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </MDBCol>
                                
                            </MDBRow>
                            <MDBRow className='mb-3'>
                                
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
                            
                                <MDBCol>
                                    <label id='labelAll'>Locality</label>
                                    <input type="text"
                                        name="locality"
                                        value={user?.result?.locality}
                                        onChange={handleChange}
                                        placeholder='Locality'
                                        className='form-control' required />
                                </MDBCol>
                            </MDBRow>


                            <MDBBtn className='mb-4 mt-3' type='submit' block>
                                Save
                            </MDBBtn>
                        </form>
                    </MDBCol> */}
                </MDBRow>
            </MDBContainer>
        </section >
    );
}