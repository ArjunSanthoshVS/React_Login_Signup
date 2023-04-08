import { Box, Toolbar } from '@mui/material'
import React from 'react'
import OtherDonations from '../../OtherDonations/OtherDonations'
import ReceiverSideBar from '../ReceiverSideBar'

function ReceiverOtherDonation() {
  return (
    <>
          <Box sx={{ display: 'flex' }}>
              <ReceiverSideBar />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Toolbar />
                  <OtherDonations />
              </Box>
          </Box>
    </>
  )
}

export default ReceiverOtherDonation
