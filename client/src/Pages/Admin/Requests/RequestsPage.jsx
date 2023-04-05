import React, { useEffect, useState } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { requests } from '../../../Redux/Features/Admin/getUsersSlice';
import { approve, reject } from '../../../Redux/Features/Admin/requests';

function RequestsPage() {
    const dispatch = useDispatch()
    const [requestDetails, setRequest] = useState([])
    useEffect(() => {
        const userRequests = async () => {
            const response = await dispatch(requests())
            setRequest(response.payload)
        }
        userRequests()
    }, [dispatch])

    const handleApprove = async (userId) => {
        try {
            const response = await dispatch(approve(userId));
            const updatedRequest = response.payload;
            setRequest((prevState) => {
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
            const response = await dispatch(reject(userId));
            const updatedRequest = response.payload;
            setRequest((prevState) => {
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
        <>
            <div className="card">
                <DataTable value={requestDetails} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="fullName" header="Name" style={{ width: '15%' }}></Column>
                    <Column field="age" header="Age" style={{ width: '10%' }}></Column>
                    <Column field="bloodGroup" header="Blood" style={{ width: '10%' }}></Column>
                    <Column field="unit" header="Unit" style={{ width: '8%' }}></Column>
                    <Column field="district" header="District" style={{ width: '10%' }}></Column>
                    <Column field="branch" header="Branch" style={{ width: '10%' }}></Column>
                    <Column field="gender" header="Gender" style={{ width: '10%' }}></Column>
                    <Column field="reason" header="Reason" style={{ width: '10%' }}></Column>
                    <Column field="status" header="Status" style={{ width: '10%' }} body={(rowData) => {
                        if (rowData.status === 'Approved') {
                            return <span style={{ color: 'green', fontWeight: 'bold' }}>Approved</span>;
                        } else if (rowData.status === 'Rejected') {
                            return <span style={{ color: 'red', fontWeight: 'bold' }}>Rejected</span>;
                        } else if (rowData.status === 'Cancelled') {
                            return <span style={{ color: 'grey', fontWeight: 'bold' }}>Cancelled</span>;
                        } else {
                            return <span style={{ color: 'grey', fontWeight: 'bold' }}>Pending</span>;
                        }
                    }}></Column>


                    <Column field="" header="Option" style={{ width: '10%' }} body={(rowData) => {
                        if (rowData.status === 'Approved' || rowData.status === 'Rejected' || rowData.status === 'Cancelled') {
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
        </>
    )
}

export default RequestsPage
