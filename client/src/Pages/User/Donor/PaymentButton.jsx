import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit'
import React from 'react'
import { useSelector } from 'react-redux';

function PaymentButton({ amount }) {
    const { user } = useSelector((state) => ({ ...state?.user?.user }))
    const fullName = user.firstName + " " + user.lastName
    const handlePayment = () => {
        const current = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        const date = current.toLocaleDateString('en-US', options);
        console.log(date);
        axios.post('http://localhost:5000/stripe/donate_money', {
            amount,
            userId: user._id,
            userName: fullName,
            createdAt: date
        }).then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url
            }
        }).catch((err) => {
            console.log(err.message);
        })
    }
    return (
        <>
            <MDBBtn onClick={() => handlePayment()}>Donate Now</MDBBtn>
        </>
    )
}

export default PaymentButton
