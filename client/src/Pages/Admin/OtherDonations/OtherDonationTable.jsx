import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDispatch } from 'react-redux';
import { fullPaymentDetails } from '../../../Redux/Features/Admin/paymentSlice';
import { fetchUser } from '../../../Redux/Features/Admin/getUserDetails';
import { useNavigate } from 'react-router-dom';

function OtherDonationTable() {
    const [payments, setPayments] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const details = async () => {
            const response = await dispatch(fullPaymentDetails())
            setPayments(response.payload)
        }
        details()
    }, []);
    const viewUser = async (id) => {
        await dispatch(fetchUser(id));
        navigate('/view')
    }
    return (
        <>
            <div className="card w-100 mx-auto">
                <DataTable value={payments} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="userName" header="User Name" style={{ width: '20%' }}></Column>
                    <Column field="createdAt" header="Date and Time" style={{ width: '50%' }}></Column>
                    <Column field="amount" header="Amount" style={{ width: '20%' }}></Column>

                    <Column field="" header="View" style={{ width: '20%' }} body={(rowData) => <lord-icon
                        src="https://cdn.lordicon.com/mrjuyheh.json"
                        trigger="hover"
                        style={{ width: "50px", height: "50px" }}
                        onClick={() => viewUser(rowData.userId)}>
                    </lord-icon>} />
                </DataTable>
            </div>
        </>
    )
}

export default OtherDonationTable
