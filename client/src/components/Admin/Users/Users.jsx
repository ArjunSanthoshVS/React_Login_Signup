import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import SideBar from '../Sidebar/Sidebar'
import Details from '../../../Pages/Admin/Users/Details';

export default function CustomizedTables() {

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
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Details />
                </Box>
            </Box >
        </>
    );
}