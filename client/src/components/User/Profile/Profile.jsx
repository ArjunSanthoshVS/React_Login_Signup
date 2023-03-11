import React from 'react';
import './Profile.css'
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBCardText,
    MDBInput,
} from 'mdb-react-ui-kit';
import HomeNav from '../HomeNav/HomeNav'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { profile, setIsEditing, updateUser } from '../../../Redux/Features/User/userSlice';
import { useNavigate } from 'react-router-dom';

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

    const {user} = useSelector((state) => ({ ...state?.user?.user }))
    console.log(user, 'mnmn');
    const isEditing = useSelector((state) => state.user?.isEditing);


    // const handleChange = ({ currentTarget: input }) => {
    //     setprofileData({ ...profileData, [input.name]: input.value })
    // };

    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        console.log(input, 'kkkk');
        console.log(user,'klklklk');
        const data = { ...user, [input.name]: input.value };
        console.log(data);
        dispatch(updateUser(data));
    };  


    const handleEditClick = () => {
        dispatch(setIsEditing(true))
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        // try {
        //     const token = JSON.parse(localStorage.getItem("userToken"));
        //     const result = await axios.post("http://localhost:5000/profile/donor?id=" + token.data.others._id, profileData)
        //     let data = result.config.data
        //     console.log(result.config.data, 'lllllllll');
        //     navigate('/')
        // } catch (error) {
        //     console.log('Errorrr aayiii');
        // }
        // console.log(profileData, 'ppopopopop');
        // dispatch(profile({ profileData, navigate }))
        dispatch(profile({ user, navigate }));
        dispatch(setIsEditing(false));
    }
    return (
        <section>
            <MDBContainer className="p-5">
                <HomeNav />
                <h1 className='donorHeading mt-5 fw-b'>Red Wings Profile</h1>
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
                                <p className="text-muted mb-1">{user?.firstName} {user?.lastName}</p>
                                <p className="text-muted mb-4">{user?.bloodGroup}</p>
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
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Full Name</MDBCardText>
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
                                        <MDBCardText>Full Name</MDBCardText>
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
                                            <MDBInput type="number" name='mobile' onChange={handleChange} value={user?.mobile} />
                                        ) : (
                                            <MDBCardText className="text-muted">{user?.mobile}</MDBCardText>
                                        )}                                      </MDBCol>
                                </MDBRow>
                                <hr />
                                {/* <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Blood Group</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {isEditing ? (
                                            <MDBInput type="text" name='bloodGroup' onChange={handleChange} label={user?.bloodGroup} placeholder={user?.bloodGroup} />
                                        ) : (
                                            <MDBCardText className="text-muted">{user?.bloodGroup}</MDBCardText>
                                        )}                                      </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>D.O.B</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {isEditing ? (
                                            <MDBInput type="text" name='birthDate' onChange={handleChange} label={user?.birthDate} placeholder={user?.birthDate} />
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
                                            <MDBInput type="text" name='weight' onChange={handleChange} label={user?.weight} placeholder={user?.weight} />
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
                                            <MDBInput type="text" name='age' onChange={handleChange} label={user?.age} placeholder={user?.age} />
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
                                            <MDBInput type="text" name='gender' onChange={handleChange} label={user?.gender} placeholder={user?.gender} />
                                        ) : (
                                            <MDBCardText className="text-muted">{user?.gender}</MDBCardText>
                                        )}                                      </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Locality</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {isEditing ? (
                                            <MDBInput type="text" name='locality' onChange={handleChange} label={user?.locality} placeholder={user?.locality} />
                                        ) : (
                                            <MDBCardText className="text-muted">{user?.locality}</MDBCardText>
                                        )}                                      </MDBCol>
                                </MDBRow> */}
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
        </section>
    );
}