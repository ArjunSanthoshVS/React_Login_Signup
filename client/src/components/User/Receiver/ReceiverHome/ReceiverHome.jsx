import { Box, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SmallFooter from '../../Footer/SmallFooter'
import ReceiverSideBar from '../ReceiverSideBar'
import { MDBRow, MDBCol, MDBContainer} from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { approvedRequests, pendingRequests, rejectedRequests, totalDonors, totalReceivers, totalRequests, totalUnits } from '../../../../Redux/Features/User/HomeSlice';
import ReceiverHomePage from '../../../../Pages/User/Receiver/ReceiverHomePage';

function ReceiverHome() {
    const dispatch = useDispatch()
    const [donors, setDonors] = useState(0)
    const [units, setUnits] = useState(0)
    const [receivers, setReceivers] = useState(0)
    const [requests, setRequests] = useState(0)
    const [pending, setPending] = useState(0)
    const [approved, setApproved] = useState(0)
    const [rejected, setRejected] = useState(0)

    useEffect(() => {
        const details = async () => {
            const donors = await dispatch(totalDonors())
            setDonors(donors.payload)
            const units = await dispatch(totalUnits())
            setUnits(units.payload)
            const receivers = await dispatch(totalReceivers())
            setReceivers(receivers.payload)

            const requests = await dispatch(totalRequests())
            setRequests(requests.payload)
            const pending = await dispatch(pendingRequests())
            setPending(pending.payload)
            const approve = await dispatch(approvedRequests())
            setApproved(approve.payload)
            const rejected = await dispatch(rejectedRequests())
            setRejected(rejected.payload)
        }
        details()
    }, [])

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <ReceiverSideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <ReceiverHomePage
                        donors={donors}
                        units={units}
                        receivers={receivers}
                        requests={requests}
                        pending={pending}
                        approved={approved}
                        rejected={rejected} />
                    <MDBContainer className='pt-5 pb-5'>
                        <MDBRow>
                            <MDBCol sm='8'>
                                <img className='w-100' src="/images/HomeMiddleBanner.png" alt="" />
                            </MDBCol>
                            <MDBCol sm='4'>
                                <div className=" p-5 text-center my-auto">
                                    <h4><b>After donating <span className='text-danger'>blood</span>, the body works to replenish the <span className='text-danger'>blood</span> loss. This stimulates the production of new blood cells and in turn, helps in maintaining good <span className='text-success'>health</span>.</b></h4>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <SmallFooter />
                </Box>
            </Box>
        </>
    )
}

export default ReceiverHome
