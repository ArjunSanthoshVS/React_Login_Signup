import { Box, styled } from '@mui/material'
import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import ViewPage from '../../../Pages/Admin/Users/ViewPage';

function View() {
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    }));

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <ViewPage />
                </Box>
            </Box >
        </>
    )
}

export default View
