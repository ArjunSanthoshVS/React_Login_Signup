import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { otherBloodGroup, sameBloodGroup } from '../../../Redux/Features/User/HomeSlice'
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBContainer, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function DonorBloodGroupsPage() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => ({ ...state?.user?.user }))
    const bloodGroup = user.bloodGroup

    const [sameBlood, setSameBlood] = useState([])
    const [otherBlood, setOtherBlood] = useState([])

    useEffect(() => {
        const details = async () => {
            const sameBlood = await dispatch(sameBloodGroup(bloodGroup))
            setSameBlood(sameBlood.payload)
            const otherBlood = await dispatch(otherBloodGroup(bloodGroup))
            setOtherBlood(otherBlood.payload)
        }
        details()
    }, [])

    return (
        <>
            <MDBContainer className='mb-3'>
                <MDBRow>
                    <MDBCol sm='6'>
                        <MDBCard className='p-3 mb-3'>
                            <MDBCardBody style={{ height: "350px", overflowY: "scroll" }}>
                                <h4 className='text-center'>Patients who needs {bloodGroup} Blood</h4>
                                <MDBTable hover>
                                    <MDBTableHead>
                                        <tr>
                                            <th scope='col'>Name</th>
                                            <th scope='col'>District</th>
                                            <th scope='col'>Branch</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {sameBlood ? (
                                            sameBlood.map(({ _id, fullName, district, branch }) => (
                                                <tr key={_id}>
                                                    <td>{fullName}</td>
                                                    <td>{district}</td>
                                                    <td>{branch}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <h4>No users found...!</h4>
                                        )
                                        }
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='6'>
                        <MDBCard className='p-3 mb-3'>
                            <MDBCardBody style={{ height: "350px", overflowY: "scroll" }}>
                                <h4 className='text-center'>Patients who need Other blood Groups</h4>
                                <MDBTable hover >
                                    <MDBTableHead>
                                        <tr>
                                            <th scope='col'>Name</th>
                                            <th scope='col'>Blood Group</th>
                                            <th scope='col'>District</th>
                                            <th scope='col'>Branch</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {otherBlood ? (
                                            otherBlood.map(({ _id, fullName, bloodGroup, district, branch }) => (
                                                <tr key={_id}>
                                                    <td>{fullName}</td>
                                                    <td>{bloodGroup}</td>
                                                    <td>{district}</td>
                                                    <td>{branch}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <h4>No users found...!</h4>
                                        )
                                        }
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}

export default DonorBloodGroupsPage
