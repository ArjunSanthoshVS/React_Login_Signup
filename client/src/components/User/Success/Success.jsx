import { MDBBtn, MDBCard, MDBCardBody } from 'mdb-react-ui-kit'
import React from 'react'
function Success() {
  return (
    <div className='p-4 d-flex align-items-center justify-content-center vh-100'>
      <MDBCard className='p-5'>
        <MDBCardBody className='d-flex flex-column align-items-center'>
          <lord-icon
            src="https://cdn.lordicon.com/hrqqslfe.json"
            trigger="loop"
            delay="1000"
            colors="primary:#054d60,secondary:#d1fad7"
            scale="65"
            style={{ width: "230px", height: "230px" }}>
          </lord-icon>
          <h1 className='mt-4 text-center'><b>Successfully Donated!</b></h1>
          <p className='text-center'>Thank you for your generous donation.</p>
          <p className='text-center'>Your contribution will make a difference in the lives of those in need.</p>
          <MDBBtn style={{ background: "#054d60" }} onClick={() => window.history.go(-3)}>Back</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
}

export default Success
