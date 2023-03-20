import { Box, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDispatch } from 'react-redux';
import { donorDetails } from '../../../Redux/Features/Admin/getUsersSlice';
import { Button } from 'primereact/button';
import { approveDonation, rejectDonation } from '../../../Redux/Features/Admin/donationsSlice';

function Donations() {
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));


    const dispatch = useDispatch()

    const [details, setDetails] = useState([])
    // const [requestDetails, setRequest] = useState([])

    // {details.map(donation => <li key={donation._id}>{ donation.fullName}</li>)}

    useEffect(() => {
        const donationRequests = async () => {
            const response = await dispatch(donorDetails())
            const payload = response.payload
            setDetails(payload)
        }
        donationRequests()
    }, [dispatch])

    const handleApprove = async (userId) => {
        try {
            const response = await dispatch(approveDonation(userId));
            const updatedRequest = response.payload;
            setDetails((prevState) => {
                const updatedRequests = prevState.map((request) => {
                    if (request._id === userId) {
                        return updatedRequest;
                    } else {
                        return request;
                    }
                });
                return updatedRequests;
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleReject = async (userId) => {
        try {
            const response = await dispatch(rejectDonation(userId));
            const updatedRequest = response.payload;
            setDetails((prevState) => {
                const updatedRequests = prevState.map((request) => {
                    if (request._id === userId) {
                        return updatedRequest;
                    } else {
                        return request;
                    }
                });
                return updatedRequests;
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <div className="card">
                        <DataTable value={details} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="fullName" header="Name" style={{ width: '10%' }}></Column>
                            <Column field="age" header="Age" style={{ width: '10%' }}></Column>
                            <Column field="bloodGroup" header="Blood" style={{ width: '10%' }}></Column>
                            <Column field="unit" header="Unit" style={{ width: '10%' }}></Column>
                            <Column field="district" header="District" style={{ width: '10%' }}></Column>
                            <Column field="branch" header="Branch" style={{ width: '10%' }}></Column>
                            <Column field="gender" header="Gender" style={{ width: '10%' }}></Column>
                            <Column field="disease" header="Disease" style={{ width: '10%' }}></Column>
                            <Column field="status" header="Status" style={{ width: '10%' }} body={(rowData) => {
                                if (rowData.status === 'Approved') {
                                    return <span style={{ color: 'green', fontWeight: 'bold' }}>Approved</span>;
                                } else if (rowData.status === 'Rejected') {
                                    return <span style={{ color: 'red', fontWeight: 'bold' }}>Rejected</span>;
                                } else {
                                    return <span style={{ color: 'grey', fontWeight: 'bold' }}>Pending</span>;
                                }
                            }}></Column>
                            <Column field="" header="Option" style={{ width: '10%' }} body={(rowData) => {
                                if (rowData.status === 'Approved' || rowData.status === 'Rejected') {
                                    return <span style={{ color: 'green', fontWeight: 'bold' }}></span>;
                                } else {
                                    return (
                                        <>
                                            <Button className='me-1' icon="pi pi-check" size="small" rounded text raised aria-label="Filter" style={{ color: 'green', fontWeight: 'bolder', cursor: 'pointer' }} onClick={() => handleApprove(rowData._id)} />
                                            <Button className='ms-1' icon="pi pi-times" size="small" rounded text raised severity="danger" aria-label="Cancel" style={{ color: 'red', fontWeight: 'bolder', cursor: 'pointer' }} onClick={() => handleReject(rowData._id)} />
                                        </>
                                    );
                                }
                            }} ></Column>
                        </DataTable>
                    </div>
                </Box>
            </Box>
        </div>
    )
}

export default Donations
