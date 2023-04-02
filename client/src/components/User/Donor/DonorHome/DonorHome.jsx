import { Box, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SmallFooter from '../../Footer/SmallFooter'
import DonorSideBar from '../DonorSideBar'
import {
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBContainer
} from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { totalDonors, totalReceivers, totalUnits } from '../../../../Redux/Features/User/HomeSlice';

function DonorHome() {
    const dispatch = useDispatch()

    const [donors, setDonors] = useState(0)
    const [units, setUnits] = useState(0)
    const [receivers, setReceivers] = useState(0)

    useEffect(() => {
        const details = async () => {
            const donors = await dispatch(totalDonors())
            setDonors(donors.payload)
            const units = await dispatch(totalUnits())
            setUnits(units.payload)
            const receivers = await dispatch(totalReceivers())
            setReceivers(receivers.payload)
        }
        details()
    }, [])
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <DonorSideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <MDBContainer className='pb-5'>
                        <MDBRow>
                            <MDBCol sm='4'>
                                <MDBCard border='3' className='text-center' style={{color:"#054D60" ,boxShadow: "black 0px 0px 12px -3px" }}>
                                    <MDBCardBody className=''>
                                        <h2><b>Total Donors</b></h2>
                                        <h2><b>{donors}</b></h2>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm='4'>
                                <MDBCard border='3' className='text-center' style={{color:"#054D60" ,boxShadow: "black 0px 0px 12px -3px" }}>
                                    <MDBCardBody className=''>
                                        <h2><b>Blood Units Collected</b></h2>
                                        <h2><b>{units}</b></h2>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm='4'>
                                <MDBCard className='text-center' style={{color:"#054D60" ,boxShadow: "black 0px 0px 12px -3px" }}>
                                    <MDBCardBody className=''>
                                        <h2><b>Total Receivers</b></h2>
                                        <h2><b>{receivers}</b></h2>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>

                    <MDBContainer>
                        <MDBRow>
                            <MDBCol sm='6'>
                                <MDBCard className='p-3'>
                                    <MDBCardBody>
                                        <h4 className='text-center'>Patients who needs O+ve Blood</h4>
                                        
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm='6'>
                                <MDBCard className='p-3'>
                                    <MDBCardBody>
                                        <h4 className='text-center'>Patients who need Other blood Groups</h4>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </Box>
            </Box>
            {/* <SmallFooter /> */}
        </>
    )
}

export default DonorHome
