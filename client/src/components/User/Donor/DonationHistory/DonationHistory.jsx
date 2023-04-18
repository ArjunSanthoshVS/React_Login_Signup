import { Box, Toolbar } from '@mui/material'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon, MDBFooter, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { donationHistory } from '../../../../Redux/Features/User/DonateSlice';
import DonorSideBar from '../DonorSideBar'
import { Dialog } from 'primereact/dialog';
import DonorCerificate from '../DonorCertificate/DonorCerificate';


function DonationHistory() {
    const user = useSelector((state) => state?.user?.user?.user)
    const dispatch = useDispatch()
    const name = user.firstName + " " + user.lastName
    const [loading, setLoading] = useState(true);
    const [donations, setDonations] = useState([]);
    const [showCertificate, setShowCertificate] = useState(false);
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
                                                <MDBIcon style={{ fontSize: "100px", color: "#c82b2b" }} fas icon="tint" />
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
                                        {donation.status === "Approved" && (
                                            <MDBBtn size='sm' rounded className='bg-danger m-3 w-75 mx-auto'
                                                onClick={() => setShowCertificate(true)}>View Certificate</MDBBtn>
                                        )}
                                    </MDBCard>
                                    {showCertificate && (
                                        <MDBModal show={showCertificate} setShow={setShowCertificate} tabIndex='-1' className='pt-5'>
                                            <MDBModalDialog size='lg'>
                                                <MDBModalContent>
                                                    <DonorCerificate
                                                        name={name}
                                                        unit={donation.unit}
                                                        bloodGroup={donation.bloodGroup}
                                                        date={donation.donatedDate}
                                                    />
                                                </MDBModalContent>
                                            </MDBModalDialog>
                                        </MDBModal>
                                    )}
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
