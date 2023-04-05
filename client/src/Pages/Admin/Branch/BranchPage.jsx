import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { branchDetails, editBranch, newBranch, removeBranch } from '../../../Redux/Features/Admin/branchSlice';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
function BranchPage() {
    const dispatch = useDispatch()
    const [newBranchdata, setNewBranchdata] = useState({ district: "", branch: "", address: "", phone: "" })
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

    const modalClose = () => {
        setAddVisible(false)
        setErrMsg(" ")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { district, branch, address, phone } = newBranchdata;
        if (district.trim() === '' || branch.trim() === '' || address.trim() === '' || phone.trim() === '') {
            setErrMsg(new Error('Please fill all required fields'));
            return;
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(newBranchdata.phone)) {
            setErrMsg(new Error("Phone number must contain 10 digits."));
            return;
        }
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
            setErrMsg(error);
        }
    }

    useEffect(() => {
        branchinfo()
    }, [dispatch])

    const handleEdit = async (branch) => {
        try {
            setSelectedBranch(branch);
            setDistrict(branch.district);
            setBranch(branch.branch);
            setAddress(branch.address);
            setPhone(branch.phone);
            setEditVisible(true);
        } catch (error) {
            console.log(error);
        }
    }

    const confirmDelete = (id) => {
        Swal.fire({
            title: "Are you sure..?",
            text: "You want to remove this branch...!",
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
        console.log(phone,'jh');
        if (district.trim() === '' || branch.trim() === '' || address.trim() === '' || phone.toString().trim() === '') {
            setEditErrMsg(new Error('Please fill all required fields'));
            return;
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            setEditErrMsg(new Error("Phone number must contain 10 digits."));
            return;
        }
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
            console.log(error);
            setEditErrMsg(error);
        }
    }
    const editModalClose = () => {
        setEditVisible(false)
        setEditErrMsg(" ")
    }
  return (
    <>
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
                          <MDBBtn type='submit' className='mb-1'>Create</MDBBtn>
                      </form>
                      <MDBBtn onClick={modalClose} color='danger' className=''>Cancel</MDBBtn>
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
                      <MDBBtn type='submit' className='mb-1'>Save Changes</MDBBtn>
                  </form>
                  <MDBBtn onClick={editModalClose} color='danger' className=''>Cancel Changes</MDBBtn>
              </Dialog>
          </div>
    </>
  )
}

export default BranchPage
