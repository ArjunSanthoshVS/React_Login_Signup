import { Box, styled } from '@mui/material'
import React from 'react'
import Sidebar from '../Sidebar/Sidebar'

function Dashboard() {
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <h1>Admin Dashboard</h1>
                    <div className="col-6 d-flex">
                        <div className="col-9">

                        </div>
                        <div className="col-4">
                            <h1 >hi funde...</h1>
                        </div>
                    </div>
                </Box>
            </Box>
        </div>
    )
}

export default Dashboard
