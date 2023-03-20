import * as React from 'react';
import './HomeNav.css'
import Swal from 'sweetalert2'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../../../Redux/Features/User/userSlice';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Logout'];

function HomeNav() {

    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const dispatch = useDispatch()
    const { user } = useSelector((state) => ({ ...state?.user?.user }))
    console.log(user, 'mmmmmmmmmmm');

    const handleLogout = () => {
        dispatch(setLogout())
        // navigate("/login")
        window.location = "/login"
    }

    const handleDonor = () => {
        if (user?.mobile && user?.bloodGroup && user?.birthDate && user?.weight && user?.age && user?.gender && user?.district) {
            console.log('handle donor');
            Swal.fire({
                title: `Hi ${user?.firstName}`,
                text: 'Continue as a Donor?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#054D60',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, I want to Donate', // change confirm button text
            }).then((result) => { // use then to perform an action on confirmation
                if (result.isConfirmed) {
                    navigate('/donor') // navigate to next page
                }
            });
        } else {
            Swal.fire({
                title: `Complete Your Profile`,
                text: 'First you want to complete your profile..!',
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#054D60',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yeh Sure..!', // change confirm button text
            }).then((result) => { // use then to perform an action on confirmation
                if (result.isConfirmed) {
                    navigate('/profile') // navigate to next page
                }
            });
        }
    }
    const handleReceiver = () => {
        if (user?.mobile && user?.bloodGroup && user?.birthDate && user?.weight && user?.age && user?.gender && user?.district) {
            console.log('handle receiver');
            Swal.fire({
                title: `Hi ${user?.firstName}`,
                text: 'Are you ready for Transfusion?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#054D60',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes', // change confirm button text
            }).then((result) => { // use then to perform an action on confirmation
                if (result.isConfirmed) {
                    navigate('/receiver') // navigate to next page
                }
            });
        } else {
            Swal.fire({
                title: `Complete Your Profile`,
                text: 'First you want to complete your profile..!',
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#054D60',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yeh Sure..!', // change confirm button text
            }).then((result) => { // use then to perform an action on confirmation
                if (result.isConfirmed) {
                    navigate('/profile') // navigate to next page
                }
            });
        }
    }

    return (
        <>
            <AppBar style={{ backgroundColor: "#054D60" }} position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                        <Box
                            component="img"
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                mr: 1,
                                height: 50,
                                width: 200,
                                maxHeight: { xs: 233, md: 167 },
                                maxWidth: { xs: 350, md: 250 },
                            }}
                            alt="The house from the offer."
                            src="/images/red wings logo.png"
                        />
                        {/* <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: '',
                                fontWeight: "bolder",
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            REDWINGS
                        </Typography> */}

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                        <Box
                            component="img"
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                mr: 1,
                                height: 50,
                                width: 200,
                                maxHeight: { xs: 233, md: 167 },
                                maxWidth: { xs: 350, md: 250 },
                            }}
                            alt="The house from the offer."
                            src="/images/red wings logo.png" />
                        {/* <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            REDWINGS
                        </Typography> */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        {user?._id && (
                            <h3 className='me-2 m-0'>{user?.firstName} {user?.lastName}</h3>
                        )}
                        <Tooltip title="Donate">
                            <lord-icon
                                onClick={handleDonor}
                                style={{ width: "60px", height: "60px", cursor: "pointer" }}
                                colors="primary:#e83a30,secondary:#ebe6ef"
                                src="https://cdn.lordicon.com/tlyvkjxa.json"
                                trigger="hover"
                            >
                            </lord-icon>
                        </Tooltip>
                        <Tooltip title="Receive" >
                            <lord-icon
                                onClick={handleReceiver}
                                src="https://cdn.lordicon.com/uiaaaqiz.json"
                                trigger="hover"
                                colors="primary:#e83a30,secondary:#ffffff"
                                style={{ width: "60px", height: "60px", cursor: "pointer" }}>
                            </lord-icon>
                        </Tooltip>


                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton className='ms-2' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={user?.image ?? "https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        {/* <Typography textAlign="center">{setting}</Typography> */}
                                        <ListItemText primary={setting} onClick={() => {
                                            let text = setting.toLowerCase()
                                            text === "profile" ? navigate('/profile') : handleLogout()
                                        }} />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar >


            {/* 
            <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>

                        <MDBModalBody className='p-4'>
                            <h3 className='fw-bold text-center' >RED WINGS</h3>
                            <h5 className='fw-bold text-center'>
                                Be the reason for someone's heartbeat.
                            </h5>
                            <Row>
                                <Col className='text-center' onClick={() => navigate('/donor')}
                                    style={{ cursor: 'pointer' }}>
                                    <lord-icon
                                        style={{ width: "200px", height: "200px" }}
                                        colors="primary:#e83a30,secondary:#ebe6ef"
                                        src="https://cdn.lordicon.com/tlyvkjxa.json"
                                        trigger="hover">
                                    </lord-icon>
                                    <h3 className='text-center'
                                        style={{
                                            fontWeight: "bold",
                                            color: "#e83a30",
                                        }}>Donate</h3>
                                </Col>
                                <Col className='text-center' onClick={() => navigate('/receiver')}
                                    style={{ cursor: 'pointer' }}>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/uiaaaqiz.json"
                                        trigger="hover"
                                        colors="primary:#e83a30,secondary:#ffffff"
                                        style={{ width: "200px", height: "200px" }}>
                                    </lord-icon>
                                    <h3 className='text-center'
                                        style={{
                                            fontWeight: "bold",
                                            color: "#e83a30"
                                        }}>Receive</h3>
                                </Col>
                            </Row>
                        </MDBModalBody>

                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal > */}
        </>
    );
}
export default HomeNav;