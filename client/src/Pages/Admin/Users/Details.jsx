import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../../Redux/Features/Admin/getUsersSlice';
import { fetchUser } from '../../../Redux/Features/Admin/getUserDetails';
function Details() {
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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    const users = useSelector((state) => state?.getUsers?.users);
    const viewUser = async (id) => {
        await dispatch(fetchUser(id));
        navigate('/view')
    }
  return (
    <>
          <TableContainer component={Paper}>
              < Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                      <TableRow>
                          <StyledTableCell align="center">Full Name</StyledTableCell>
                          <StyledTableCell align="center">Blood</StyledTableCell>
                          <StyledTableCell align="center">Age</StyledTableCell>
                          <StyledTableCell align="center">District</StyledTableCell>
                          <StyledTableCell align="center">Gender</StyledTableCell>
                          <StyledTableCell align="center">Email</StyledTableCell>
                          <StyledTableCell align="center">View</StyledTableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {users.length > 0 ? (
                          users.map((user) => (
                              <StyledTableRow key={user._id}>
                                  <StyledTableCell align="center" component="th" scope="row">
                                      {user?.firstName} {user?.lastName}
                                  </StyledTableCell>
                                  <StyledTableCell align="center"> {user?.bloodGroup ? user?.bloodGroup : <span>not selected</span>}</StyledTableCell>
                                  <StyledTableCell align="center">{user?.age}</StyledTableCell>
                                  <StyledTableCell align="center">{user?.district}</StyledTableCell>
                                  <StyledTableCell align="center">{user?.gender}</StyledTableCell>
                                  <StyledTableCell align="center">{user?.email}</StyledTableCell>
                                  <StyledTableCell align="center" onClick={() => viewUser(user._id)}><VisibilityIcon /></StyledTableCell>
                              </StyledTableRow>
                          ))
                      ) : (
                          <tr>
                              <td colSpan="3">No {users.length} users found.</td>
                          </tr>
                      )}
                  </TableBody>
              </Table>
          </TableContainer>
    </>
  )
}

export default Details
