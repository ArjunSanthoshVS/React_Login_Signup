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
import Users from '../Sidebar/Sidebar';
import { Box } from '@mui/material';
import SideBar from '../Sidebar/Sidebar'


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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default function CustomizedTables() {

    const [users, setUsers] = React.useState([])

    React.useEffect(() => {
        const user = async () => {
            const result = await axios.get('http://localhost:5000/api/activeUsers')
            console.log(result.data);
            setUsers(result.data)
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