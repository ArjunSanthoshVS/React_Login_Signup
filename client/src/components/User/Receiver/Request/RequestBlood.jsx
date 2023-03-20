import { Box, FormControl, InputLabel, MenuItem, Select, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import ReceiverSideBar from '../ReceiverSideBar'
import {
    MDBInput,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBValidationItem,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { transfusionRequests } from '../../../../Redux/Features/User/TransfusionSlice';
const districts = [
    { id: 1, name: "Thrissur", branches: ["Karuvannur", "Ollur", "Patturaikkal", "Karalam", "Varadiyam"] },
    { id: 2, name: "Ernamkulam", branches: ["Kakkanad", "Maradu", "MG Road"] },
    { id: 3, name: "Kottayam", branches: ["Pala"] },
];
function RequestBlood() {
    const { user } = useSelector((state) => ({ ...state?.user?.user }))
    console.log(user, 'kkkkkk');
    const b = user?.bloodGroup
    const a = user?.age
    const _id = user?._id
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const name = user?.firstName + " " + user?.lastName
    const Gender = user?.gender

    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [branches, setBranches] = useState([]);
    const [blood, setBlood] = useState(b);
    const [unit, setUnit] = useState(1);
    const [reason, setReason] = useState("");
    const [age, setAge] = useState(a);
    const [userId, setId] = useState(_id);
    const [receivedDate, setReceivedDate] = useState(date);
    const [fullName, setFullName] = useState(name);
    const [gender, setGender] = useState(Gender);
    const [status, setStatus] = useState('Pending')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDistrictChange = (event) => {
        const selectedDistrict = districts.find((district) => district.name === event.target.value);
        setSelectedDistrict(selectedDistrict.name);
        setBranches(selectedDistrict.branches);
        setSelectedBranch('');
    };

    const successfull = () => {
        Swal.fire({
            title: 'Successfully Requested',
            text: `Administrator want to accept your blood. So keep track on history...!`,
            icon: 'success',
            confirmButtonColor: '#054D60',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Check my status', // change confirm button text
        }).then((result) => { // use then to perform an action on confirmation
            if (result.isConfirmed) {
                navigate('/transfusion_history') // navigate to next page
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { selectedDistrict, selectedBranch, blood, unit, reason, age, userId, receivedDate, fullName, gender, status }
        console.log(data, '1111');
        dispatch(transfusionRequests(data))
        successfull()
    }
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <ReceiverSideBar />
                <Box className='vh-100' component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <MDBCard className='w-75 mx-auto' style={{ backgroundColor: "#e3e3e3", color: "#054d60" }}>
                        <MDBCardBody>
                            <h1 className='text-center p-5 pb-0 fw-bolder' style={{ fontFamily: 'math' }}>Request to Blood</h1>
                            <p className='text-center'>Please Give proper informations...!</p>
                            <form onSubmit={handleSubmit} className='w-50 mx-auto mb-4'>
                                <FormControl fullWidth className='form-control-lg mb-2'>
                                    <InputLabel id="demo-simple-select-label">District</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="district"
                                        value={selectedDistrict}
                                        label="District"
                                        onChange={handleDistrictChange} >
                                        {districts.map((district) => (
                                            <MenuItem key={district.id} value={district.name}>
                                                {district.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth className='form-control-lg mb-2'>
                                    <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                                    <Select
                                        id='branches'
                                        value={selectedBranch}
                                        label="Branch"
                                        onChange={(e) => setSelectedBranch(e.target.value)}
                                        required
                                    >
                                        {branches.map((b) => (
                                            <MenuItem key={b} value={b}>
                                                {b}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <MDBInput
                                    type={'text'}
                                    className="form-control-lg mb-2"
                                    value={user?.bloodGroup}
                                    name='bloodGroup'
                                    id='validationCustom02'
                                    required
                                    onChange={(e) => setBlood(e.target.value)} label='Blood Group'
                                    disabled
                                />
                                <MDBInput
                                    type={'number'}
                                    className="form-control-lg mb-2"
                                    value={unit}
                                    name='unit'
                                    onChange={(e) => setUnit(e.target.value)}
                                    id='validationCustom03'
                                    required
                                    label='Unit'
                                />
                                <MDBInput
                                    className="form-control-lg mb-2"
                                    value={reason}
                                    name='reason'
                                    onChange={(e) => setReason(e.target.value)}
                                    id='validationCustom05'
                                    required
                                    label='Reason for request'
                                />
                                <MDBInput
                                    type={'number'}
                                    className="form-control-lg mb-2"
                                    value={user?.age}
                                    name='age'
                                    onChange={(e) => setAge(e.target.value)}
                                    id='validationCustom05'
                                    required
                                    label='Age'
                                    disabled
                                />
                                <MDBInput
                                    type={'hidden'}
                                    value={user?._id}
                                    name='userId'
                                    onChange={(e) => setId(e.target.value)}
                                />
                                <MDBInput
                                    type={'hidden'}
                                    value={receivedDate}
                                    name='requestedDate'
                                    onChange={(e) => setReceivedDate(e.target.value)}
                                />
                                <MDBInput
                                    type={'hidden'}
                                    value={user?.firstName + " " + user?.lastName}
                                    name='fullName'
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                                <MDBInput
                                    type={'hidden'}
                                    value={user?.gender}
                                    name='gender'
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <div className='col-12'>
                                    <MDBBtn type='submit' style={{ backgroundColor: "#054d60" }}>Submit form</MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </Box>
            </Box>
        </>
    )
}

export default RequestBlood
