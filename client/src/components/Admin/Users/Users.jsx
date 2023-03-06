import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Box } from '@mui/material';
import SideBar from '../Sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function CustomizedTables() {

    const [users, setUsers] = React.useState([])
    const dispatch=useDispatch()

    React.useEffect(() => {
        const user = async () => {
            const result = await axios.get('http://localhost:5000/admin/activeUsers')
            console.log(result.data);
            let data=result.data
            setUsers(result.data)
            // dispatch()
        }
        user()
    }, [])

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));


    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />

                    <TableContainer component={Paper}>
                        < Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Full Name</StyledTableCell>
                                    <StyledTableCell align="center">Blood</StyledTableCell>
                                    <StyledTableCell align="center">D.O.B</StyledTableCell>
                                    <StyledTableCell align="center">Age</StyledTableCell>
                                    <StyledTableCell align="center">Locality</StyledTableCell>
                                    <StyledTableCell align="center">Email</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <StyledTableRow key={user.id}>
                                        <StyledTableCell align="center" component="th" scope="row">
                                            {user.firstName} {user.lastName}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{user.blood}{user.blood}<span>Not Selected</span></StyledTableCell>
                                        <StyledTableCell align="center">{user.dob}{user.dob}<span>Not Selected</span></StyledTableCell>
                                        <StyledTableCell align="center">{user.age}{user.age}<span>Not Selected</span></StyledTableCell>
                                        <StyledTableCell align="center">{user.locality}{user.locality}<span>Not Selected</span></StyledTableCell>
                                        <StyledTableCell align="center">{user.email}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box >
        </>
    );
}