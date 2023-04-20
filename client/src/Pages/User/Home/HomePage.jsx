import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import { totalDonors, totalReceivers, totalUnits } from '../../../Redux/Features/User/HomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const { user } = useSelector((state) => ({ ...state?.user?.user }))
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleDonor = () => {
        if (user?.mobile && user?.bloodGroup && user?.weight && user?.age && user?.gender && user?.district) {
            Swal.fire({
                title: `Hi ${user?.firstName}`,
                text: 'Continue as a Donor?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#054D60',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, I want to Donate',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/donor')
                }
            });
          } else {
            Swal.fire({
                title: `Complete Your Profile`,
                text: 'First you want to complete your profile..!',
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#054D60',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yeh Sure..!',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/profile')
                }
            });
        }
    }

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
       <MDBContainer className='pt-3 pb-5'>
                <MDBRow>
                    <MDBCol sm='4' className='mb-2'>
                        <MDBCard border='danger' className='text-center border-2' style={{ boxShadow: "black 0px 0px 12px -3px" }}>
                            <MDBCardBody className='text-danger'>
                                <h2><b>Total Donors</b></h2>
                                <h4><b>{donors}</b></h4>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                  <MDBCol sm='4' className='mb-2'>
                        <MDBCard border='danger' className='text-center border-2' style={{ boxShadow: "black 0px 0px 12px -3px" }}>
                            <MDBCardBody className='text-danger'>
                                <h2><b>Blood Units Collected</b></h2>
                                <h4><b>{units}</b></h4>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                  <MDBCol sm='4' className='mb-2'>
                        <MDBCard border='danger' className='text-center border-2' style={{ boxShadow: "black 0px 0px 12px -3px" }}>
                            <MDBCardBody className='text-danger'>
                                <h2><b>Total Receivers</b></h2>
                                <h4><b>{receivers}</b></h4>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <MDBContainer className='pt-3 pb-5'>
                <MDBRow>
                    <MDBCol sm='8'>
                      <img className='w-100' src="https://res.cloudinary.com/dchrawfgy/image/upload/v1681500637/HomeMiddleBanner_pu52f4.png" alt="" />
                    </MDBCol>
                    <MDBCol sm='4'>
                        <div className=" p-5 text-center my-auto">
                            <h4><b>After donating <span className='text-danger'>blood</span>, the body works to replenish the <span className='text-danger'>blood</span> loss. This stimulates the production of new blood cells and in turn, helps in maintaining good <span className='text-success'>health</span>.</b></h4>
                            <MDBBtn onClick={() => handleDonor()} style={{ background: "#054D60" }}>Donate now</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <MDBCard className='m-5 mt-3 p-4' background='secondary'>
                <MDBCardBody>
                    <h2 className='text-center mb-4'><b>Types of <span className='text-danger'>Donations</span></b></h2>
                    <h4 className='text-center' style={{ lineHeight: '50px', fontWeight: "600" }}>
                        The human body contains five liters of blood, which is made of several useful components i.e. Whole blood, Platelet, and Plasma.
                        Each type of component has several medical uses and can be used for different medical treatments. your blood donation determines the best donation for you to make. <br />
                        For plasma and platelet donation you must have donated whole blood in past two years.
                    </h4>
                </MDBCardBody>
            </MDBCard>
    </>
  )
}

export default HomePage
