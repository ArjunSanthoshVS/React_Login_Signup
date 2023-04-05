import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { totalDonors, totalReceivers, totalUnits } from '../../../Redux/Features/User/HomeSlice'
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBContainer} from 'mdb-react-ui-kit';

function DonorHomeCards() {
  const dispatch = useDispatch()
  const [donors, setDonors] = useState(0)
  const [units, setUnits] = useState(0)
  const [receivers, setReceivers] = useState(0)
  useEffect(() => {
    const details = async () => {
      const donors = await dispatch(totalDonors())
      setDonors(donors.payload)
      const units = await dispatch(totalUnits())
      setUnits(units.payload)
      const receivers = await dispatch(totalReceivers())
      setReceivers(receivers.payload)
    }
    details()
  }, [])

  return (
    <>
      <MDBContainer className='pb-5'>
        <MDBRow>
          <MDBCol sm='4'>
            <MDBCard border='3' className='text-center ' style={{ color: "#e3e3e3", background: "#054D60", boxShadow: "black 0px 0px 12px -3px" }}>
              <MDBCardBody className=''>
                <h2><b>Total Donors Registered</b></h2>
                <h2><b>{donors}</b></h2>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm='4'>
            <MDBCard border='3' className='text-center' style={{ color: "#e3e3e3", background: "#054D60", boxShadow: "black 0px 0px 12px -3px" }}>
              <MDBCardBody className=''>
                <h2><b>Blood Units Collected</b></h2>
                <h2><b>{units}</b></h2>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm='4'>
            <MDBCard border='3' className='text-center' style={{ color: "#e3e3e3", background: "#054D60", boxShadow: "black 0px 0px 12px -3px" }}>
              <MDBCardBody className=''>
                <h2><b> Successfull Transfusers</b></h2>
                <h2><b>{receivers}</b></h2>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}

export default DonorHomeCards
