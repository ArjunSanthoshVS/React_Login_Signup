import { Box, Toolbar } from '@mui/material'
import React from 'react'
import ReceiverSideBar from '../ReceiverSideBar'
import {MDBCard,MDBCardBody} from 'mdb-react-ui-kit';
import RequestPage from '../../../../Pages/User/Receiver/RequestPage';

function RequestBlood() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <ReceiverSideBar />
                <Box className='vh-100' component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <MDBCard className='w-75 mx-auto' style={{ backgroundColor: "#e3e3e3", color: "#054d60" }}>
                        <MDBCardBody>
                            <h1 className='text-center p-4 pb-0 fw-bolder' style={{ fontFamily: 'math' }}>Request to Blood</h1>
                            <p className='text-center'>Please Give proper informations...!</p>
                          <RequestPage/>
                        </MDBCardBody>
                    </MDBCard>
                </Box>
            </Box>
        </>
    )
}

export default RequestBlood
