import { Box, styled } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar'

function View() {
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    const user = useSelector(state => state.userDetails);

  return (
      <>
          <Box sx={{ display: 'flex' }}>
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <DrawerHeader />
                  <p>Name: {user.firstName}</p>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.mobile}</p>
              </Box>
          </Box >
      </>
  )
}

export default View
