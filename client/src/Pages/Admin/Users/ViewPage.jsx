import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userDonations, userRequests } from '../../../Redux/Features/Admin/getUsersSlice';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBTable, MDBTableHead, MDBTableBody} from 'mdb-react-ui-kit';
import { Accordion, AccordionTab } from 'primereact/accordion';

function ViewPage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userDetails);
    const [donations, setDonations] = useState([])
    const [requests, setRequests] = useState([])

    useEffect(() => {
        const donationRequests = async () => {
            const response = await dispatch(userDonations(user._id))
            const payload = response.payload
            setDonations(payload)
        }
        donationRequests()
    }, [dispatch, user._id])

    useEffect(() => {
        const transfusionRequests = async () => {
            const response = await dispatch(userRequests(user._id))
            const payload = response.payload
            setRequests(payload)
        }
        transfusionRequests()
    }, [dispatch, user._id])

  return (
    <>
          <div className="d-flex img-fluid">
              <img style={{ width: "300px" }} src={user.image} className='img-thumbnail' alt='No Profilepic' />
              <MDBCard alignment='center' className='col-9 fw-bold ms-4' style={{ fontFamily: "monospace" }}>
                  <MDBCardHeader className='text-center text-primary fw-bold'>User Details</MDBCardHeader>
                  <MDBCardBody className='d-flex w-100 p-5'>
                      <div className='col-6'>
                          <h5 className='fw-bold'>Name:  {user.firstName} {user.lastName}</h5>
                          <h5 className='fw-bold'>Email: {user.email}</h5>
                          <h5 className='fw-bold'>Age: {user.age}</h5>
                          <h5 className='fw-bold'>Blood Group: {user.bloodGroup}</h5>
                      </div>
                      <div className='col-6'>
                          <h5 className='fw-bold'>District: {user.district}</h5>
                          <h5 className='fw-bold'>Gender: {user.gender}</h5>
                          <h5 className='fw-bold'>Mobile: {user.mobile}</h5>
                          <h5 className='fw-bold'>Weight: {user.weight}</h5>
                      </div>
                  </MDBCardBody>
              </MDBCard>
          </div>
          <div className="card mt-3" style={{ width: "98%" }}>
              <Accordion>
                  <AccordionTab header="Donation History" style={{ fontFamily: "monospace" }}>
                      <MDBTable bordered borderColor="primary" >
                          <MDBTableHead>
                              <tr>
                                  <th scope='col'>Date</th>
                                  <th scope='col'>Unit</th>
                                  <th scope='col'>District</th>
                                  <th scope='col'>Branch</th>
                                  <th scope='col'>Status</th>
                              </tr>
                          </MDBTableHead>
                          <MDBTableBody>
                              {donations?.map((donation) => (
                                  <tr key={donation._id}>
                                      <td>{donation.donatedDate}</td>
                                      <td>{donation.unit}</td>
                                      <td>{donation.district}</td>
                                      <td>{donation.branch}</td>
                                      <td>{donation.status}</td>
                                  </tr>
                              ))}
                          </MDBTableBody>
                      </MDBTable>
                  </AccordionTab>
                  <AccordionTab header="Transfusion History" style={{ fontFamily: "monospace" }}>
                      <MDBTable bordered borderColor="primary" >
                          <MDBTableHead>
                              <tr>
                                  <th scope='col'>Date</th>
                                  <th scope='col'>Unit</th>
                                  <th scope='col'>District</th>
                                  <th scope='col'>Branch</th>
                                  <th scope='col'>Reason</th>
                                  <th scope='col'>Status</th>
                              </tr>
                          </MDBTableHead>
                          <MDBTableBody>
                              {requests?.map((request) => (
                                  <tr key={request._id}>
                                      <td>{request.receivedDate}</td>
                                      <td>{request.unit}</td>
                                      <td>{request.district}</td>
                                      <td>{request.branch}</td>
                                      <td>{request.reason}</td>
                                      <td>{request.status}</td>
                                  </tr>
                              ))}
                          </MDBTableBody>
                      </MDBTable>
                  </AccordionTab>
              </Accordion>
          </div>
    </>
  )
}

export default ViewPage
