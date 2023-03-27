import { Box, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { availableUnits } from '../../../Redux/Features/Admin/bloodSlice';

function Blood() {
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const dispatch = useDispatch()

    const [bloodCounts, setBloodCounts] = useState({
        "O+ve": 0,
        "A+ve": 0,
        "O-ve": 0,
        "B-ve": 0,
    });

    useEffect(() => {
        const units = async () => {
            const available = await dispatch(availableUnits())
            console.log(available.payload);
            setBloodCounts(available.payload)
        }
        units()
    }, [dispatch])

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />

                    <div className="col-12 d-flex">
                        <div className='col-4'>
                            <MDBCard className="m-2" style={{ maxWidth: '540px',backgroundColor:"#cbcbcb" }}>
                                <MDBRow className='g-0'>
                                    <MDBCol md='3'>
                                        <lottie-player  src="https://assets7.lottiefiles.com/packages/lf20_d6dmxlhi.json" background="transparent" speed="1" style={{ width: "130px", height: "200px" }} loop autoplay></lottie-player>
                                    </MDBCol>
                                    <MDBCol md='9' className='my-auto'>
                                        <MDBCardBody className='text-center'>
                                            <MDBCardTitle>Total Units Available</MDBCardTitle>
                                            <h1><b>{bloodCounts["A+ve"] ? bloodCounts["A+ve"] : 0}</b></h1>
                                            <MDBCardText>
                                                <small className='text-muted'>Last updated 3 mins ago</small>
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </div>
                        <div className='col-4'>
                            <MDBCard className="m-2" style={{ maxWidth: '540px',backgroundColor:"#cbcbcb" }}>
                                <MDBRow className='g-0'>
                                    <MDBCol md='3'>
                                        <lottie-player  src="https://assets7.lottiefiles.com/packages/lf20_mw3to7io.json" background="transparent" speed="1" style={{ width: "130px", height: "200px" }} loop autoplay></lottie-player>
                                    </MDBCol>
                                    <MDBCol md='9' className='my-auto'>
                                        <MDBCardBody className='text-center'>
                                            <MDBCardTitle>Total Units Available</MDBCardTitle>
                                            <h1><b>{bloodCounts["A-ve"] ? bloodCounts["A-ve"]:0}</b></h1>
                                            <MDBCardText>
                                                <small className='text-muted'>Last updated 3 mins ago</small>
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </div>
                        <div className='col-4'>
                            <MDBCard className="m-2" style={{ maxWidth: '540px',backgroundColor:"#cbcbcb" }}>
                                <MDBRow className='g-0'>
                                    <MDBCol md='3'>
                                        <lottie-player  src="https://assets7.lottiefiles.com/packages/lf20_6sbcdpys.json" background="transparent" speed="1" style={{ width: "130px", height: "200px" }} loop autoplay></lottie-player>
                                    </MDBCol>
                                    <MDBCol md='9' className='my-auto'>
                                        <MDBCardBody className='text-center'>
                                            <MDBCardTitle>Total Units Available</MDBCardTitle>
                                            <h1><b>{bloodCounts["B+ve"] ? bloodCounts["B+ve"] : 0}</b></h1>
                                            <MDBCardText>
                                                <small className='text-muted'>Last updated 3 mins ago</small>
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </div>
                    </div>
                    <div className="col-12 d-flex">
                        <div className='col-4'>
                            <MDBCard className="m-2" style={{ maxWidth: '540px',backgroundColor:"#cbcbcb" }}>
                                <MDBRow className='g-0'>
                                    <MDBCol md='3'>
                                        <lottie-player  src="https://assets7.lottiefiles.com/packages/lf20_wwohioc6.json" background="transparent" speed="1" style={{ width: "130px", height: "200px" }} loop autoplay></lottie-player>
                                    </MDBCol>
                                    <MDBCol md='9' className='my-auto'>
                                        <MDBCardBody className='text-center'>
                                            <MDBCardTitle>Total Units Available</MDBCardTitle>
                                            <h1><b>{bloodCounts["B-ve"] ? bloodCounts["B-ve"] : 0}</b></h1>
                                            <MDBCardText>
                                                <small className='text-muted'>Last updated 3 mins ago</small>
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </div>
                        <div className='col-4'>
                            <MDBCard className="m-2" style={{ maxWidth: '540px',backgroundColor:"#cbcbcb" }}>
                                <MDBRow className='g-0'>
                                    <MDBCol md='3'>
                                        <lottie-player  src="https://assets7.lottiefiles.com/packages/lf20_qjvnamie.json" background="transparent" speed="1" style={{ width: "130px", height: "200px" }} loop autoplay></lottie-player>
                                    </MDBCol>
                                    <MDBCol md='9' className='my-auto'>
                                        <MDBCardBody className='text-center'>
                                            <MDBCardTitle>Total Units Available</MDBCardTitle>
                                            <h1><b>{bloodCounts["AB+ve"] ? bloodCounts["AB+ve"] : 0}</b></h1>
                                            <MDBCardText>
                                                <small className='text-muted'>Last updated 3 mins ago</small>
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </div>
                        <div className='col-4'>
                            <MDBCard className="m-2" style={{ maxWidth: '540px',backgroundColor:"#cbcbcb" }}>
                                <MDBRow className='g-0'>
                                    <MDBCol md='3'>
                                        <lottie-player  src="https://assets7.lottiefiles.com/packages/lf20_0ul52rxa.json" background="transparent" speed="1" style={{ width: "130px", height: "200px" }} loop autoplay></lottie-player>
                                    </MDBCol>
                                    <MDBCol md='9' className='my-auto'>
                                        <MDBCardBody className='text-center'>
                                            <MDBCardTitle>Total Units Available</MDBCardTitle>
                                            <h1><b>{bloodCounts["AB-ve"] ? bloodCounts["AB-ve"] : 0}</b></h1>
                                            <MDBCardText>
                                                <small className='text-muted'>Last updated 3 mins ago</small>
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </div>
                    </div>
                    <div className="col-12 d-flex">
                        <div className='col-4'>
                            <MDBCard className="m-2" style={{ maxWidth: '540px',backgroundColor:"#cbcbcb" }}>
                                <MDBRow className='g-0'>
                                    <MDBCol md='3'>
                                        <lottie-player  src="https://assets7.lottiefiles.com/packages/lf20_ndukurao.json" background="transparent" speed="1" style={{ width: "130px", height: "200px" }} loop autoplay></lottie-player>
                                    </MDBCol>
                                    <MDBCol md='9' className='my-auto'>
                                        <MDBCardBody className='text-center'>
                                            <MDBCardTitle>Total Units Available</MDBCardTitle>
                                            <h1><b>{bloodCounts["O+ve"] ? bloodCounts["O+ve"] : 0}</b></h1>
                                            <MDBCardText>
                                                <small className='text-muted'>Last updated 3 mins ago</small>
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </div>
                        <div className='col-4'>
                            <MDBCard className="m-2" style={{ maxWidth: '540px',backgroundColor:"#cbcbcb" }}>
                                <MDBRow className='g-0'>
                                    <MDBCol md='3'>
                                        <lottie-player  src="https://assets7.lottiefiles.com/packages/lf20_gze7ffbh.json" background="transparent" speed="1" style={{ width: "130px", height: "200px" }} loop autoplay></lottie-player>
                                    </MDBCol>
                                    <MDBCol md='9' className='my-auto'>
                                        <MDBCardBody className='text-center'>
                                            <MDBCardTitle>Total Units Available</MDBCardTitle>
                                            <h1><b>{bloodCounts["O-ve"] ? bloodCounts["O-ve"] : 0}</b></h1>
                                            <MDBCardText>
                                                <small className='text-muted'>Last updated 3 mins ago</small>
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </div>
                    </div>
                </Box>
            </Box>
        </div>
    )
}

export default Blood
