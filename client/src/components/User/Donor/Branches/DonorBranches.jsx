import { Box, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DonorSideBar from '../DonorSideBar'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDispatch } from 'react-redux';
import { branchDetails } from '../../../../Redux/Features/Admin/branchSlice';

function DonorBranches() {
  const dispatch = useDispatch()
  const [branches, setBranches] = useState([]);
  useEffect(() => {
    const branches = async () => {
      const response = await dispatch(branchDetails())
      setBranches(response.payload)
    }
    branches()
  }, [])
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <DonorSideBar />
        <Box className='vh-100' component="main" sx={{ flexGrow: 1, p: 3, overflowX: 'auto' }}>
          <Toolbar />
          <div className="card">
            <DataTable value={branches} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
              <Column field="district" header="District" style={{ width: '25%' }}></Column>
              <Column field="branch" header="Branch" style={{ width: '25%' }}></Column>
              <Column field="address" header="Address" style={{ width: '25%' }}></Column>
              <Column field="phone" header="Phone" style={{ width: '25%' }}></Column>
            </DataTable>
          </div>
        </Box>
      </Box>
    </>
  )
}

export default DonorBranches
