import React, { useState } from 'react';
import './Profile.css'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';
import HomeNav from '../HomeNav/HomeNav'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { profilePicture, updateUser } from '../../../Redux/Features/User/userSlice';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import ProfilePage from '../../../Pages/User/Profile/ProfilePage';

export default function Profile() {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => ({ ...state?.user?.user }))
    const navigate = useNavigate()

    const [currentImageUrl, setCurrentImageUrl] = useState(null);

    const uploadImage = async (files) => {
        if (!files || files.length === 0) {
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
                                <MDBCardImage src={user.image} alt="avatar" className="rounded-circle" style={{ width: '150px' }} fluid />
                                <h3 className="mt-4 mb-0">{user?.firstName} {user?.lastName}</h3>
                                <h3 className="mb-4">{user?.bloodGroup}</h3>
                                <div className="d-flex justify-content-center mb-2">
                                    <Button onClick={() => { const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*'; input.onchange = (e) => { uploadImage(e.target.files); }; input.click(); }} variant="contained" component="label">   Image    </Button>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol lg="8" className='mt-5'>
                        <ProfilePage />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section >
    );
}