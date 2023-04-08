import React from 'react'
import DonorSideBar from '../DonorSideBar'
import { Box, Toolbar } from '@mui/material'
import OtherDonations from '../../OtherDonations/OtherDonations'

function DonorOtherDonations() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <DonorSideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <OtherDonations />
                </Box>
            </Box>
        </>
    )
}

export default DonorOtherDonations
