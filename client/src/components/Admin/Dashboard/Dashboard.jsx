import { Box, styled } from '@mui/material'
import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import DashboardCards from '../../../Pages/Admin/Dashboard/DashboardCards';
import DashboardChart from '../../../Pages/Admin/Dashboard/DashboardChart';
import PieChart from '../../../Pages/Admin/Dashboard/PieChart';

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
                    <>
                        <DashboardCards />
                        <DashboardChart />
                        <PieChart />
                    </>
                </Box>
            </Box>
        </div>
    )
}

export default Dashboard
