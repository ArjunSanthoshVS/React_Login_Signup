import { Box, Toolbar } from '@mui/material'
import React from 'react'
import SmallFooter from '../../Footer/SmallFooter'
import DonorSideBar from '../DonorSideBar'

function DonorHome() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <DonorSideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <h1>Donor home Page</h1>
                    <h1>Donor home Page</h1>
                    <h1>Donor home Page</h1>
                    <h1>Donor home Page</h1>
                    <h1>Donor home Page</h1>
    
                </Box>
            </Box>
            {/* <SmallFooter /> */}
        </>
    )
}

export default DonorHome
