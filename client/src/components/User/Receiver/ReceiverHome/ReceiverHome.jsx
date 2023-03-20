import { Box, Toolbar } from '@mui/material'
import React from 'react'
import ReceiverSideBar from '../ReceiverSideBar'

function ReceiverHome() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <ReceiverSideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <h1>Receiver home Page</h1>
                </Box>
            </Box>
        </>
    )
}

export default ReceiverHome
