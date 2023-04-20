import React from 'react'
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';

function ReceiverHomePage({donors,units,receivers,requests,pending,approved,rejected}) {
  return (
    <>  
          <MDBContainer className='pb-5'>
              <MDBRow>
                  <MDBCol sm='4' className='mb-2'>
                      <MDBCard border='3' className='text-center ' style={{ color: "#e3e3e3", background: "#054D60", boxShadow: "black 0px 0px 3px 0px" }}>
                          <MDBCardBody className=''>
                              <h2><b>Total Donors Registered</b></h2>
                              <h2><b>{donors}</b></h2>
                          </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
                  <MDBCol sm='4' className='mb-2'>
                      <MDBCard border='3' className='text-center' style={{ color: "#e3e3e3", background: "#054D60", boxShadow: "black 0px 0px 3px 0px" }}>
                          <MDBCardBody className=''>
                              <h2><b>Total Blood Units Collected</b></h2>
                              <h2><b>{units}</b></h2>
                          </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
                  <MDBCol sm='4' className='mb-2'>
                      <MDBCard border='3' className='text-center' style={{ color: "#e3e3e3", background: "#054D60", boxShadow: "black 0px 0px 3px 0px" }}>
                          <MDBCardBody className=''>
                              <h2><b> Successfull Transfusers</b></h2>
                              <h2><b>{receivers}</b></h2>
                          </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
              </MDBRow>
          </MDBContainer>

          <MDBContainer className=' pb-5'>
              <MDBRow>
                  <MDBCol sm='3' className='mb-2'>
                      <MDBCard border='primary' className='text-center text-primary bg-light' style={{ boxShadow: "black 0px 0px 3px 0px" }}>
                          <MDBCardBody className=''>
                              <h4><b> <MDBIcon fas icon="bars" /> Requests</b></h4>
                              <h4><b>{requests}</b></h4>
                          </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
                  <MDBCol sm='3' className='mb-2'>
                      <MDBCard border='secondary' className='text-center text-secondary bg-light' style={{ boxShadow: "black 0px 0px 3px 0px" }}>
                          <MDBCardBody className=''>
                              <h4><b><MDBIcon fas icon="sync-alt" /> Pending</b></h4>
                              <h4><b>{pending}</b></h4>
                          </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
                  <MDBCol sm='3' className='mb-2'>
                      <MDBCard border='success' className='text-center text-success bg-light' style={{ boxShadow: "black 0px 0px 3px 0px" }}>
                          <MDBCardBody className=''>
                              <h4><b><MDBIcon fas icon="check" /> Approved</b></h4>
                              <h4><b>{approved}</b></h4>
                          </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
                  <MDBCol sm='3' className='mb-2'>
                      <MDBCard border='danger' className='text-center text-danger bg-light' style={{ boxShadow: "black 0px 0px 3px 0px" }}>
                          <MDBCardBody className=''>
                              <h4><b><MDBIcon fas icon="times-circle" /> Rejected</b></h4>
                              <h4><b>{rejected}</b></h4>
                          </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
              </MDBRow>
          </MDBContainer>
    </>
  )
}

export default ReceiverHomePage
