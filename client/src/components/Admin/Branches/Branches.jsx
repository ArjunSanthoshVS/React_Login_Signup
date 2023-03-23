import { Box, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { branchDetails, editBranch, newBranch, removeBranch } from '../../../Redux/Features/Admin/branchSlice';
import Swal from 'sweetalert2';

function Branches() {
  const [newBranchdata, setNewBranchdata] = useState({
    district: "",
    branch: "",
    address: "",
    phone: ""
  })

  const dispatch = useDispatch()
  const [errMsg, setErrMsg] = useState("")
  const [editErrMsg, setEditErrMsg] = useState("")
  const [branchInfo, setBranchInfo] = useState([])
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [district, setDistrict] = useState("");
  const [branch, setBranch] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const branchinfo = async () => {
    const response = await dispatch(branchDetails())
    const payload = response.payload
    setBranchInfo(payload)
  }

  const handleChange = ({ currentTarget: input }) => {
    setNewBranchdata({ ...newBranchdata, [input.name]: input.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(newBranch({ newBranchdata }));
      if (response?.error?.message === "A branch with the same address already exists.") {
        setAddVisible(true)
        throw new Error('A branch with the same address already exists.');
      } else {
        setAddVisible(false)
        branchinfo()
      }
    } catch (error) {
      setEditErrMsg(error);
    }
  }
  useEffect(() => {
    branchinfo()
  }, [dispatch])

  const modalClose = () => {
    setAddVisible(false)
    setErrMsg(" ")
  }
  const editModalClose = () => {
    setEditVisible(false)
    setEditErrMsg(" ")
  }

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const handleEdit = async (branch) => {
    try {
      setSelectedBranch(branch);
      setDistrict(branch.district);
      setBranch(branch.branch);
      setAddress(branch.address);
      setPhone(branch.phone);
      setEditVisible(true);
    } catch (error) {
      console.log(error, 'hbhbhbhfcfcf');
    }
  }

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure..?",
      text :"You want to remove this branch...!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e7e7e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes', // change confirm button text
    }).then((result) => { // use then to perform an action on confirmation
      if (result.isConfirmed) {
       handleDelete(id) // navigate to next page
      }
    });
  }

  const handleDelete = async (branchId) => {
    try {
      await dispatch(removeBranch(branchId))
      setBranchInfo(prevState => prevState.filter(branch => branch._id !== branchId))
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(editBranch({ selectedBranch, district, branch, address, phone }))
      if (response?.error?.message === "A branch with the same address already exists.") {
        throw new Error('A branch with the same address already exists.');
      }
      const updatedBranch = { ...selectedBranch, district, branch, address, phone }
      setBranchInfo((prevState) => {
        const updatedBranches = prevState.map((branch) => (branch._id === selectedBranch._id ? updatedBranch : branch))
        return updatedBranches
      })
      setEditVisible(false)
    } catch (error) {
      console.log(error, 'ertrs');
      setEditErrMsg(error);
    }
  }

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <div className="col-12 d-flex">
            <div className="col-10">

            </div>

            <div className="col-2 mb-3 card flex justify-content-center">
              <Button label="Add new Branch" icon="pi pi-external-link" onClick={() => setAddVisible(true)} />
              <Dialog className='text-center' header="Add new Branch" visible={addVisible} style={{ width: '50vw' }} onHide={() => setAddVisible(false)}>
                {errMsg && <p style={{ color: 'red', fontFamily: "monospace" }}>{errMsg?.message}</p>}
                <form onSubmit={handleSubmit}>
                  <MDBInput type='text' name='district' onChange={handleChange} value={newBranchdata.district} className='mt-1' wrapperClass='mb-4' label='District' required />
                  <MDBInput type='text' name='branch' onChange={handleChange} value={newBranchdata.branch} wrapperClass='mb-4' label='Branch' required />
                  <MDBInput type='text' name='address' onChange={handleChange} value={newBranchdata.address} wrapperClass='mb-4' label='Address' required />
                  <MDBInput type='number' name='phone' onChange={handleChange} value={newBranchdata.phone} wrapperClass='mb-4' label='Phone' required />
                  <MDBBtn type='submit' className='me-1'>Create</MDBBtn>
                  <MDBBtn onClick={modalClose} color='danger' className='ms-1'>Cancel</MDBBtn>
                </form>
              </Dialog>
            </div>
          </div>
          <div className="card">
            <DataTable value={branchInfo} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
              <Column field="district" header="District" headerClassName="px-auto" style={{ width: '15%' }}></Column>
              <Column field="branch" header="Branch" style={{ width: '15%' }}></Column>
              <Column field="address" header="Address" style={{ width: '30%' }}></Column>
              <Column field="phone" header="Phone" style={{ width: '20%' }}></Column>
              <Column field="" header="Edit" style={{ width: '10%' }} body={(rowData) => { return (<Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => handleEdit(rowData)} />) }}></Column>
              <Column field="" header="Remove" style={{ width: '10%' }} body={(rowData) => { return (<Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDelete(rowData._id)} />) }}></Column>
            </DataTable>
          </div>
          <div className="col-2 mb-3 card flex justify-content-center">
            <Dialog className='text-center' header="Edit Branch" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
              {editErrMsg && <p style={{ color: 'red', fontFamily: "monospace" }}>{editErrMsg?.message}</p>}
              <form onSubmit={handleEditSubmit}>
                <MDBInput type='text' name='district' onChange={(e) => setDistrict(e.target.value)} value={district} className='mt-1' wrapperClass='mb-4' label='District' required />
                <MDBInput type='text' name='branch' onChange={(e) => setBranch(e.target.value)} value={branch} wrapperClass='mb-4' label='Branch' required />
                <MDBInput type='text' name='address' onChange={(e) => setAddress(e.target.value)} value={address} wrapperClass='mb-4' label='Address' required />
                <MDBInput type='number' name='phone' onChange={(e) => setPhone(e.target.value)} value={phone} wrapperClass='mb-4' label='Phone' required />
                <MDBBtn type='submit' className='me-1'>Save Changes</MDBBtn>
                <MDBBtn onClick={editModalClose} color='danger' className='ms-1'>Cancel Changes</MDBBtn>
              </form>
            </Dialog>
          </div>
        </Box>
      </Box>
    </div>
  )
}

export default Branches
