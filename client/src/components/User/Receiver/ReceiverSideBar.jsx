import * as React from 'react';
import './ReceiverSideBar.css'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import Doantion from '@mui/icons-material/VolunteerActivismOutlined';
import HistoryIcon from '@mui/icons-material/History';
import Branch from '@mui/icons-material/Business';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../../Redux/Features/User/userSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Avatar, Container, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';

const settings = ['Profile', 'Logout'];
const drawerWidth = 240;
export default function ReceiverSideBar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => ({ ...state?.user?.user }))
    const handleLogout = () => {
        dispatch(setLogout())
        window.location = "/login"
    }
    const handleDonor = () => {
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
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar style={{ backgroundColor: "#054D60" }} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
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
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: "#e3e3e3" },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {[
                            { name: 'Home', icon: <HomeIcon /> },
                            { name: 'Request Blood', icon: <Doantion /> },
                            { name: 'Transfusion History', icon: <HistoryIcon /> },
                            { name: 'Available Branches', icon: <Branch /> },
                            { name: 'Other Donations', icon: < CurrencyRupeeIcon /> },
                            { name: 'Chat', icon: <Branch /> },
                        ].map((text, index) => (
                                <ListItem key={text.name} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {text.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={text.name}
                                            onClick={() => {
                                                console.log(text.name);
                                                let text2 = text.name.toLowerCase()
                                                text2 === "home" && navigate('/receiver')
                                                text2 === "request blood" && navigate('/receive')
                                                text2 === "transfusion history" && navigate('/transfusion_history')
                                                text2 === "available branches" && navigate('/receiverBranches')
                                                text2 === "other donations" && navigate('/receiver_other_donation')
                                                text2 === "chat" && navigate('/chat')
                                            }} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}