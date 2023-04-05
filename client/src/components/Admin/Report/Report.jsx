import React from 'react'
import { Box, styled } from '@mui/material'
import Sidebar from '../Sidebar/Sidebar'
import DonationReportPage from '../../../Pages/Admin/Report/DonationReportPage';
import RequestsReportPage from '../../../Pages/Admin/Report/RequestsReportPage';
import BloodReportPage from '../../../Pages/Admin/Report/BloodReportPage';

function Report() {
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    }));

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <DonationReportPage />
                    <RequestsReportPage />
                    <BloodReportPage />
                </Box>
            </Box>
        </div>
    )
}

export default Report
