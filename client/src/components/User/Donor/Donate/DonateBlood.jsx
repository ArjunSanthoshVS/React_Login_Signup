import React, { useEffect, useState } from 'react'
import {
    MDBInput,
    MDBBtn,
    MDBCard,
    MDBCardBody,
} from 'mdb-react-ui-kit';
import DonorSideBar from '../DonorSideBar';
import { Box, FormControl, InputLabel, MenuItem, Select, Toolbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { donate } from '../../../../Redux/Features/User/DonateSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { allDistricts, districtChoose } from '../../../../Redux/Features/User/DistrictSlice';


function DonateBlood() {
    const { user } = useSelector((state) => ({ ...state?.user?.user }))
    const b = user?.bloodGroup
    const a = user?.age
    const _id = user?._id
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const name = user?.firstName + " " + user?.lastName
    const Gender = user?.gender

    const [districts, setDistricts] = useState([])
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [branches, setBranches] = useState([]);
    const [blood, setBlood] = useState(b);
    const [unit, setUnit] = useState(1);
    const [disease, setDisease] = useState("");
    const [age, setAge] = useState(a);
    const [userId, setUserId] = useState(_id);
    const [donatedDate, setDonatedDate] = useState(date);
    const [fullName, setFullName] = useState(name);
    const [gender, setGender] = useState(Gender);
    const [status, setStatus] = useState('Pending')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const Districts = async () => {
            const response = await dispatch(allDistricts())
            setDistricts(response.payload.districts)
        }
        Districts()
    }, [dispatch])

    const handleDistrictChange = async (event) => {
        const selectedDistrict = event.target.value;
        setSelectedDistrict(selectedDistrict);
        const response = await dispatch(districtChoose({ district: selectedDistrict }))
        setBranches(response.payload.branches);
    };

    const successfull = () => {
        Swal.fire({
            title: 'Your Request successfully submitted',
            text: `Administrator want to accept your blood. So keep track on history...!`,
            icon: 'success',
            confirmButtonColor: '#054D60',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Check my status', // change confirm button text
        }).then((result) => { // use then to perform an action on confirmation
            if (result.isConfirmed) {
                navigate('/donation_history') // navigate to next page
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { selectedDistrict, selectedBranch, blood, unit, disease, age, userId, donatedDate, fullName, gender, status }
        dispatch(donate(data))
        successfull()
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <DonorSideBar />
                <Box className='vh-100' component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <MDBCard className='w-75 mx-auto' style={{ backgroundColor: "#e3e3e3", color: "#054d60" }}>
                        <MDBCardBody>
                            <h1 className='text-center p-5 pb-0 fw-bolder' style={{ fontFamily: 'math' }}>Donate Your Most Valuable Blood</h1>
                            <p className='text-center'>Please Give proper informations...!</p>
                            <form onSubmit={handleSubmit} className='w-50 mx-auto mb-4'>
                                <FormControl fullWidth className='form-control-lg mb-2'>
                                    <InputLabel id="demo-simple-select-label">District</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="district"
                                        value={selectedDistrict}
                                        label="District"
                                        onChange={handleDistrictChange}
                                    >
                                        {districts.map((district) => (
                                            <MenuItem key={district._id} value={district}>
                                                {district}
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
                                        {branches.map((branch) => (
                                        <MenuItem key={branch._id} value={branch.branch}>
                                            {branch.branch}
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
                                    value={disease}
                                    name='disease'
                                    onChange={(e) => setDisease(e.target.value)}
                                    id='validationCustom05'
                                    required
                                    label='Disease (Mention if any)'
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
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                                <MDBInput
                                    type={'hidden'}
                                    value={donatedDate}
                                    name='donatedDate'
                                    onChange={(e) => setDonatedDate(e.target.value)}
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
                    {/* <SmallFooter/> */}
                </Box>
            </Box>
        </>
    )
}

export default DonateBlood
