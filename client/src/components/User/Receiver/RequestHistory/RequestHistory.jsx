import React from 'react'
import { Box, Toolbar } from '@mui/material'
import ReceiverSideBar from '../ReceiverSideBar';
import RequestHistoryPage from '../../../../Pages/User/Receiver/RequestHistoryPage';
function RequestHistory() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <ReceiverSideBar />
                <Box className='vh-100' component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <RequestHistoryPage />
                </Box>
            </Box>
        </>
    )
}


export default RequestHistory
