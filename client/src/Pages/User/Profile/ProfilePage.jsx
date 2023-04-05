import React, { useState } from 'react'
import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBCardText, MDBInput, MDBRadio } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormControl } from 'react-bootstrap';
import { profile, setIsEditing, updateUser } from '../../../Redux/Features/User/userSlice';
import validate from '../../../components/User/Profile/ProfileValidation';
import { districtsOptions, genders, groupsOptions } from './options';
function ProfilePage() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => ({ ...state?.user?.user }))
    const isEditing = useSelector((state) => state.user?.isEditing);
    const navigate = useNavigate()
    const [formErrors, setFormErrors] = useState({});

    const handleChange = ({ currentTarget: input }) => {
        const data = { ...user, [input.name]: input.value };
        dispatch(updateUser(data));
    };

    const handleEditClick = () => {
        setFormErrors(" ")
        dispatch(setIsEditing(true))
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validateData = await validate(user)
        console.log(validateData);
        if (Object.keys(validateData).length !== 0) {
            console.log('jndkjn');
            dispatch(setIsEditing(true));
            setFormErrors({ validateData })
            console.log(formErrors);
        } else {
            console.log('jhgfdfghj');
            dispatch(setIsEditing(false));
            dispatch(profile({ user, navigate }));
        }
    }
    const genderOptions = genders
    const districts = districtsOptions
    const groups = groupsOptions
    return (
        <>
            <MDBCard className="">
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>First Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            {isEditing ? (
                                <>
                                    <input className='form-control' type="text" name='firstName' onChange={handleChange} value={user?.firstName} />
                                    <p className='mb-0 text-danger ms-auto' style={{ fontSize: "12px" }}>{formErrors.validateData && formErrors.validateData.firstName}</p>
                                </>
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
                                <>
                                    <input className='form-control' type="text" name='lastName' onChange={handleChange} value={user?.lastName} />
                                    <p className='mb-0 text-danger ms-auto' style={{ fontSize: "12px" }}>{formErrors.validateData && formErrors.validateData.lastName}</p>
                                </>) : (
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
                                <>
                                    <MDBInput type="email" name='email' onChange={handleChange} value={user?.email} />
                                    <p className='mb-0 text-danger ms-auto' style={{ fontSize: "12px" }}>{formErrors.validateData && formErrors.validateData.email}</p>
                                </>

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
                                <>
                                    <MDBInput type="number" name='mobile' onChange={handleChange} value={user?.mobile} />
                                    <p className='mb-0 text-danger ms-auto' style={{ fontSize: "12px" }}>{formErrors.validateData && formErrors.validateData.mobile}</p>
                                </>
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
                                <>
                                    <FormControl as="select" name="bloodGroup" value={user?.bloodGroup} onChange={handleChange}  >
                                        {groups.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.text}
                                            </option>
                                        ))}

                                    </FormControl>
                                    <p className='mb-0 text-danger ms-auto' style={{ fontSize: "12px" }}>{formErrors.validateData && formErrors.validateData.bloodGroup}</p>
                                </>

                            ) : (
                                <MDBCardText className="text-muted">{user?.bloodGroup}</MDBCardText>
                            )}
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        <MDBCol sm="3">
                            <MDBCardText>Weight</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                            {isEditing ? (
                                <>
                                    <MDBInput type="number" name='weight' onChange={handleChange} value={user?.weight} />
                                    <p className='mb-0 text-danger ms-auto' style={{ fontSize: "12px" }}>{formErrors.validateData && formErrors.validateData.weight}</p>
                                </>) : (
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
                                <>
                                    <MDBInput type="number" name='age' onChange={handleChange} value={user?.age} />
                                    <p className='mb-0 text-danger ms-auto' style={{ fontSize: "12px" }}>{formErrors.validateData && formErrors.validateData.age}</p>
                                </>) : (
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
                                <>
                                    {genderOptions.map(option => (
                                        <MDBRadio key={option.value} label={option.label} name={option.name} value={option.value} onChange={handleChange} checked={user?.gender === option.value} inline />
                                    ))}
                                    <p className='mb-0 text-danger ms-auto' style={{ fontSize: "12px" }}>{formErrors.validateData && formErrors.validateData.gender}</p>
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
                                <>
                                    <FormControl as="select" name="district" value={user?.district} onChange={handleChange}>
                                        {districts.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.text}
                                            </option>
                                        ))}

                                    </FormControl>
                                    <p className='mb-0 text-danger ms-auto' style={{ fontSize: "12px" }}>{formErrors.validateData && formErrors.validateData.district}</p>
                                </>
                            ) : (
                                <MDBCardText className="text-muted">{user?.district}</MDBCardText>
                            )}
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol sm="9">

                        </MDBCol>
                        <MDBCol sm="3" className='mt-2'>
                            {isEditing ? (
                                <MDBBtn onClick={handleSubmit}>Save</MDBBtn>
                            ) : (
                                <MDBBtn onClick={handleEditClick}>Edit</MDBBtn>
                            )}
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </>
    )
}

export default ProfilePage
