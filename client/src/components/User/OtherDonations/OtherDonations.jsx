import React, { useState } from 'react'
import Payment from '../../../Pages/User/Donor/Payment'
import { MDBInput } from 'mdb-react-ui-kit'
import PaymentButton from '../../../Pages/User/Donor/PaymentButton'

function OtherDonations() {

  const [amount, setAmount] = useState("")
  const handleChange = ({ currentTarget: input }) => {
    setAmount(input.value);
  };

  return (
    <>
      <Payment />
      <div className="mt-5">
        <img src='https://res.cloudinary.com/dchrawfgy/image/upload/v1681500637/Donate_some_Kindness_to_physically_disabled_Persons_njifyy.png' className='img-fluid ' alt='...' />
      </div>
      <form className='d-flex justify-content-center mb-5 mt-3' onSubmit={(e) => e.preventDefault()}>
        <MDBInput name='amount' value={amount} onChange={handleChange} label='Enter your Amount' id='form1' type='number' required />
        <PaymentButton amount={amount} />
      </form>
    </>
  )
}

export default OtherDonations
