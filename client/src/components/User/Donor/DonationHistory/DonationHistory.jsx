import { Box, Toolbar } from '@mui/material'
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBIcon
} from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { donationHistory } from '../../../../Redux/Features/User/DonateSlice';
import DonorSideBar from '../DonorSideBar'


function DonationHistory() {
    const user = useSelector((state) => state?.user?.user?.user)
    console.log(user._id, 'asdfghjk');
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true);
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchDonations = async () => {
            const response = await dispatch(donationHistory(user._id));
            if (response.payload) {
                setDonations(response.payload);
            }
            setLoading(false);
        };
        fetchDonations();
    }, [dispatch, user._id]);

    console.log(donations, 'qwerfbhjhbjm');

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <DonorSideBar />
                <Box className='vh-100' component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <MDBRow >
                        {loading ? (
                            <div>Loading...</div>
                        ) : donations.length > 0 ? (
                            donations.map((donation, index) => (
                                <MDBCol sm='4' key={index}>
                                    <MDBCard className='mb-3' style={{ backgroundColor: "#e3e3e3", color: "#054d60" }}>
                                        <MDBCardBody className='d-flex justify-content-center align-items-center'>
                                            <div className='me-3'>
                                                <MDBIcon style={{ fontSize: "100px", color: "#c82b2b"}} fas icon="tint" />
                                                {/* <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_xkf2gw3b.json" background="transparent" speed="1.5" style={{ width: "10px;", height: "10px;" }} loop autoplay></lottie-player> */}
                                            </div>
                                            <div className='ms-3'>
                                                <MDBCardTitle><b>{donation.donatedDate}</b></MDBCardTitle>
                                                <b><hr /></b>
                                                <MDBCardText>
                                                    <b>  District : {donation.district}</b><br />
                                                    <b>  Branch : {donation.branch}</b><br />
                                                    <b> Blood Group : {donation.bloodGroup}</b><br />
                                                    <b> Unit : {donation.unit}</b><br />
                                                    <b> Disease : {donation.disease}</b><br />
                                                    <b>  Age : {donation.age}</b><br />
                                                    <b>  Status : {donation.status}</b><br />
                                                </MDBCardText>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            ))
                        ) : (
                            <h3>No donations Made</h3>
                        )}
                    </MDBRow>
                </Box>
            </Box>
        </>
    )
}

export default DonationHistory
