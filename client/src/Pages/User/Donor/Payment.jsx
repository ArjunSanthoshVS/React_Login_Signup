import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { paymentDetails } from '../../../Redux/Features/User/PaymentSlice';
function Payment() {
  const { user } = useSelector((state) => ({ ...state?.user?.user }))
  const [payments, setPayments] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    const details = async () => {
      const response = await dispatch(paymentDetails(user._id))
      setPayments(response.payload)
    }
    details()
  }, [])
  return (
    <>
      <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
        {payments ? (payments.map((payment) => {
          return (
            <MDBCol key={payment._id}>
              <MDBCard className='h-100'>
                <MDBCardBody className='d-flex col-md-12'>
                  <div className='d-flex col-md-5'>
                    <img className='w-75 my-auto' src="https://res.cloudinary.com/dchrawfgy/image/upload/v1681500617/blood_qyi4sp.jpg" alt="" />
                  </div>
                  <div className="col-md-7">
                    <h3>₹ {payment.amount}</h3>
                    <p className='mb-0'><b>Date : {payment.createdAt}</b></p>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          )
        })) : (
          <h3>No payments done...!</h3>
        )}
      </MDBRow>
    </>
  )
}

export default Payment
