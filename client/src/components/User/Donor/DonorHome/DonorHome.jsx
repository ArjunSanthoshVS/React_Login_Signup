import { Box, Toolbar } from '@mui/material'
import React from 'react'
import SmallFooter from '../../Footer/SmallFooter'
import DonorSideBar from '../DonorSideBar'
import { MDBRow, MDBCol, MDBContainer } from 'mdb-react-ui-kit';
import DonorHomeCards from '../../../../Pages/User/Donor/DonorHomeCards';
import DonorBloodGroupsPage from '../../../../Pages/User/Donor/DonorBloodGroupsPage';

function DonorHome() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <DonorSideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <DonorHomeCards />
                    <DonorBloodGroupsPage />

                    <MDBContainer className='pt-5 pb-5'>
                        <MDBRow>
                            <MDBCol sm='8'>
                                <img className='w-100' src="https://res.cloudinary.com/dchrawfgy/image/upload/v1681500637/HomeMiddleBanner_pu52f4.png" alt="" />
                            </MDBCol>
                            <MDBCol sm='4'>
                                <div className=" p-5 text-center my-auto">
                                    <h4><b>After donating <span className='text-danger'>blood</span>, the body works to replenish the <span className='text-danger'>blood</span> loss. This stimulates the production of new blood cells and in turn, helps in maintaining good <span className='text-success'>health</span>.</b></h4>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <SmallFooter />
                </Box>
            </Box>
        </>
    )
}

export default DonorHome
