import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getDonations } from '../../../Redux/Features/Admin/donationsSlice';
import { getTransfusion } from '../../../Redux/Features/Admin/requests';
import { fullPaymentDetails } from '../../../Redux/Features/Admin/paymentSlice';
import { fetchUsers } from '../../../Redux/Features/Admin/getUsersSlice';

function DashboardCards() {
    const [donations, setDonations] = useState([]);
    const [requests, setRequests] = useState([])
    const [amount, setAmount] = useState([])
    const [users, setUsers] = useState([])

    const dispatch = useDispatch()
    const totalDonations = donations.length
    const totalRequests = requests.length
    const totalAmount = amount.reduce((accumulator, current) => accumulator + current.amount, 0);
    const totalUsers = users.length
    useEffect(() => {
        const details = async () => {
            const donation = await dispatch(getDonations())
            setDonations(donation.payload)

            const request = await dispatch(getTransfusion())
            setRequests(request.payload)

            const amount = await dispatch(fullPaymentDetails())
            setAmount(amount.payload)

            const users = await dispatch(fetchUsers())
            setUsers(users.payload)
        }
        details()
    }, [])
    return (
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
                        <h5 className="card-title text-center"><b>Total Requests</b></h5>
                        <hr style={{ height: '4px', color: 'black', margin: '10px', opacity: '0.5' }} />
                        <h5 className="card-text text-center">
                            {totalRequests}
                        </h5>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card">
                    <div className="card-body p-4">
                        <h5 className="card-title text-center"><b>Total Amount</b></h5>
                        <hr style={{ height: '4px', color: 'green', margin: '10px', opacity: '0.5' }} />
                        <h5 className="card-text text-center">
                            ₹{totalAmount}
                        </h5>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card">
                    <div className="card-body p-4">
                        <h5 className="card-title text-center"><b>Total Users</b></h5>
                        <hr style={{ height: '4px', color: 'red', margin: '10px', opacity: '0.5' }} />
                        <h5 className="card-text text-center">
                            {totalUsers}
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardCards
