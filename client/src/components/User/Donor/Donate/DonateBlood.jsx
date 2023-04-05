import React  from 'react'
import DonorSideBar from '../DonorSideBar';
import { Box,Toolbar } from '@mui/material';
import DonatePage from '../../../../Pages/User/Donor/DonatePage';

function DonateBlood() {

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <DonorSideBar />
                <Box className='vh-100' component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <DonatePage/>
                    {/* <SmallFooter/> */}
                </Box>
            </Box>
        </>
    )
}

export default DonateBlood
