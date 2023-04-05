import React from 'react';
import { Box, Toolbar } from '@mui/material'
import DonorSideBar from '../DonorSideBar'
import PatientsPage from '../../../../Pages/User/Donor/PatientsPage';

function NearByPatients() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <DonorSideBar />
        <Box className='vh-100' component="main" sx={{ flexGrow: 1, p: 3, overflowX: 'auto' }}>
          <Toolbar />
          <PatientsPage />
        </Box>
      </Box>
    </>
  )
}

export default NearByPatients
