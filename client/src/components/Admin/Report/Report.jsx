import React, { useEffect, useState } from 'react'
import { Box, styled } from '@mui/material'
import Sidebar from '../Sidebar/Sidebar'
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux'
import { getAvailableUnits, getBloodDonations, getDonations } from '../../../Redux/Features/Admin/donationsSlice';
import { getTransfusion } from '../../../Redux/Features/Admin/requests';

function Report() {
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    }));

    const dispatch = useDispatch()
    const [availableUnits, setAvailableUnits] = useState([]);
    const [donations, setDonations] = useState([]);
    const [transfusion, setTransfusion] = useState([]);

    const totalDonations = donations.length
    const pendingDonations = donations.filter(request => request.status === 'Pending').length
    const approvedDonations = donations.filter(request => request.status === 'Approved').length
    const rejectedDonations = donations.filter(request => request.status === 'Rejected').length

    const totalRequests = transfusion.length
    const pendingRequests = transfusion.filter(request => request.status === 'Pending').length
    const approvedRequests = transfusion.filter(request => request.status === 'Approved').length
    const rejectRequests = transfusion.filter(request => request.status === 'Rejected').length
    useEffect(() => {
        const donations = async () => {
            const response = await dispatch(getDonations())
            setDonations(response.payload)
        }
        donations()
    }, [])
   
    useEffect(() => {
        const transfusion = async () => {
            const response = await dispatch(getTransfusion())
            setTransfusion(response.payload)
        }
        transfusion()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dispatch(getAvailableUnits())
                console.log(result.payload);
                setAvailableUnits(result.payload);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    console.log(availableUnits);

    const groupedData = availableUnits.reduce((acc, donation) => {
        if (!acc[donation.bloodGroup]) {
            acc[donation.bloodGroup] = [];
        }

        const existingDonation = acc[donation.bloodGroup].find(d => d.branch === donation.branch);

        if (existingDonation) {
            existingDonation.unit += donation.unit;
        } else {
            acc[donation.bloodGroup].push({
                district: donation.district,
                branch: donation.branch,
                bloodGroup: donation.bloodGroup,
                unit: donation.unit
            });
        }

        return acc;
    }, {});

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <div className="card" style={{ background: 'gainsboro' }}>
                        <div className="card-body">
                            <div className="row d-flex">
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body p-4">
                                            <h5 className="card-title text-center"><b>Total Donations</b></h5>
                                            <hr style={{ height: '4px', color: 'blue', margin: '10px', opacity: '0.5' }} />
                                            <h5 className="card-text text-center">
                                                {totalDonations}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body p-4">
                                            <h5 className="card-title text-center"><b>Pending Donations</b></h5>
                                            <hr style={{ height: '4px', color: 'black', margin: '10px', opacity: '0.5' }} />
                                            <h5 className="card-text text-center">
                                                {pendingDonations}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body p-4">
                                            <h5 className="card-title text-center"><b>Approved Donations</b></h5>
                                            <hr style={{ height: '4px', color: 'green', margin: '10px', opacity: '0.5' }} />
                                            <h5 className="card-text text-center">{approvedDonations}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body p-4">
                                            <h5 className="card-title text-center"><b>Rejected Donations</b></h5>
                                            <hr style={{ height: '4px', color: 'red', margin: '10px', opacity: '0.5' }} />
                                            <h5 className="card-text text-center">
                                                {rejectedDonations}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-3" style={{ background: 'gainsboro' }}>
                        <div className="card-body">
                            <div className="row d-flex">
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body p-4">
                                            <h5 className="card-title text-center"><b>Total Requests</b></h5>
                                            <hr style={{ height: '4px', color: 'blue', margin: '10px', opacity: '0.5' }} />
                                            <h5 className="card-text text-center">
                                                {totalRequests}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body p-4">
                                            <h5 className="card-title text-center"><b>Pending Requests</b></h5>
                                            <hr style={{ height: '4px', color: 'black', margin: '10px', opacity: '0.5' }} />
                                            <h5 className="card-text text-center">
                                                {pendingRequests}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body p-4">
                                            <h5 className="card-title text-center"><b>Approved Requests</b></h5>
                                            <hr style={{ height: '4px', color: 'green', margin: '10px', opacity: '0.5' }} />
                                            <h5 className="card-text text-center">{approvedRequests}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body p-4">
                                            <h5 className="card-title text-center"><b>Rejected Requests</b></h5>
                                            <hr style={{ height: '4px', color: 'red', margin: '10px', opacity: '0.5' }} />
                                            <h5 className="card-text text-center">
                                                {rejectRequests}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="card-body">
                        <MDBRow className='row-cols-1 row-cols-md-4 g-4'>
                            {Object.entries(groupedData).map(([bloodGroup, donations]) => (
                                <MDBCol>
                                    <MDBTable bordered borderColor="primary" >
                                        <React.Fragment key={bloodGroup}>
                                            <MDBTableHead>
                                                <tr>
                                                    <th className='text-center' colSpan={3}><b>{bloodGroup}</b></th>
                                                </tr>
                                                <tr>
                                                    <th>District</th>
                                                    <th>Branch</th>
                                                    <th>Units</th>
                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody>
                                                {donations.map((donation) => (
                                                    <tr key={donation._id}>
                                                        <td>{donation.district}</td>
                                                        <td>{donation.branch}</td>
                                                        <td>{donation.unit} units</td>
                                                    </tr>
                                                ))}
                                            </MDBTableBody>
                                        </React.Fragment>
                                    </MDBTable>
                                </MDBCol>
                            ))}
                        </MDBRow>
                    </div>
                </Box>
            </Box>
        </div>
    )
}

export default Report
