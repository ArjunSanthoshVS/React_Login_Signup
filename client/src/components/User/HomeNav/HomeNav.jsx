import './HomeNav.css'
import * as React from 'react';
import Swal from 'sweetalert2'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../../../Redux/Features/User/userSlice';


const pages = ['Donate', 'Receive'];
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

    const handleLogout = () => {
        dispatch(setLogout())
        window.location = "/login"
    }

    const handleDonor = () => {
        if (user?.mobile && user?.bloodGroup && user?.weight && user?.age && user?.gender && user?.district) {
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
        if (user?.mobile && user?.bloodGroup && user?.weight && user?.age && user?.gender && user?.district) {
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
                            src="https://res.cloudinary.com/dchrawfgy/image/upload/v1681500637/red_wings_logo_fga789.png"
                        />

                        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' },width:"80px"  }}>
                            <IconButton
                                size="medium"
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
                                        <ListItemText primary={page} onClick={() => {
                                            let pageText = page.toLowerCase()
                                            pageText === "donate" ? navigate('/donor') : navigate('/receiver')
                                        }} />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
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
                            src="https://res.cloudinary.com/dchrawfgy/image/upload/v1681500637/red_wings_logo_fga789.png" />

                        {user?._id && (
                            <h4 className='username ms-auto me-2 m-0'>{user?.firstName} {user?.lastName}</h4>
                        )}
                        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'block' } }}>
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
                        </Box>

                        <Box sx={{ flexGrow: 0  }}>
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
        </>
    );
}
export default HomeNav;