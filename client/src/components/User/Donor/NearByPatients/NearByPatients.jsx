import { Box, Toolbar } from '@mui/material'
import React from 'react'
import DonorSideBar from '../DonorSideBar'

function NearByPatients() {
  return (
    <>
          <Box sx={{ display: 'flex' }}>
              <DonorSideBar />
              <Box className='vh-100' component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Toolbar />
                  <h1>NearbyPAtients</h1>
                </Box>
            </Box>
        </>
    )
}

export default NearByPatients
