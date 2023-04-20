import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import Doantion from '@mui/icons-material/VolunteerActivismOutlined';
import HistoryIcon from '@mui/icons-material/History';
import Branch from '@mui/icons-material/Business';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../../Redux/Features/User/userSlice';
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
const settings = ['Profile', 'Logout'];
const drawerWidth = 240;

function DonorSideBar(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => ({ ...state?.user?.user }))
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        dispatch(setLogout())
        window.location = "/login"
    }

    const drawer = (
        <div>
            <div className="d-flex m-2">
                <div>
                    <img style={{ width: "50px" }} className='ms-2' src="https://res.cloudinary.com/dchrawfgy/image/upload/v1681886400/favicon_awqu1j.png" alt="" />
                </div>
                <div className='mx-auto my-auto'>
                    {user ? (<h5 className='m-0 text-center fw-b'>{user?.firstName + " " + user?.lastName}</h5>) : (<p>Redwings always be with you.</p>)}
                </div>
            </div>
            <Divider />
            <List>
                {[
                    { name: 'Home', icon: <HomeIcon /> },
                    { name: 'Donate Blood', icon: <Doantion /> },
                    { name: 'Donation History', icon: <HistoryIcon /> },
                    { name: 'Available Branches', icon: <Branch /> },
                    { name: 'Patients', icon: <Branch /> },
                    { name: 'Other Donations', icon: < CurrencyRupeeIcon /> },
                    { name: 'Chats', icon: < CurrencyRupeeIcon /> }
                ].map((text, index) => (
                    <ListItem key={text.name} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {text.icon}
                            </ListItemIcon>
                            <ListItemText primary={text.name}
                                onClick={() => {
                                    let text2 = text.name.toLowerCase()
                                    text2 === "home" && navigate('/donor')
                                    text2 === "donate blood" && handleDonate()
                                    text2 === "donation history" && navigate('/donation_history')
                                    text2 === "available branches" && navigate('/donorBranches')
                                    text2 === "patients" && navigate('/patients')
                                    text2 === "other donations" && navigate('/donor_other_donation')
                                    text2 === "chats" && navigate('/chat')
                                }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const handleDonate = () => {
        const radioOptions = {
            'Yes': 'Yes',
            'No': 'No',
        }

        Swal.fire({
            icon: "question",
            title: 'Did you donate blood for past 3 months ?',
            input: 'radio',
            inputOptions: radioOptions,
            inputValidator: (value) => {
                if (!value) {
                    return 'You must choose an option'
                }
            },
            showCancelButton: true,
            confirmButtonColor: '#054D60',
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value === 'Yes') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sorry',
                        text: 'You are not eligible because you donated your blood.'
                    })
                } else {
                    handleAntibiotics()
                }
            }
        })
    }
    const handleAntibiotics = () => {
        const radioOptions = {
            'Yes': 'Yes',
            'No': 'No',
        }

        Swal.fire({
            icon: "question",
            title: 'Did you take any Antibiotics for past 1 week ?',
            input: 'radio',
            inputOptions: radioOptions,
            inputValidator: (value) => {
                if (!value) {
                    return 'You must choose an option'
                }
            },
            showCancelButton: true,
            confirmButtonColor: '#054D60',
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value === "Yes") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sorry',
                        text: 'You are not eligible because you conceed antibiotics.'
                    })
                } else {
                    navigate('/donate')
                }
            }
        })
    }
    const handleReceiver = () => {
        Swal.fire({
            title: `Hi ${user?.firstName}`,
            text: 'Are you ready for Transfusion?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#054D60',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/receiver')
            }
        });
    }
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: "#054D60"
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{
                        mr: 1,
                        height: 50,
                        width: 200,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                    }}
                        component="img"
                        alt="The house from the offer."
                        src="https://res.cloudinary.com/dchrawfgy/image/upload/v1681500637/red_wings_logo_fga789.png"
                    />
                    <Box sx={{ display: "flex", alignItems: "center" }}>

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
                                        <ListItemText primary={setting} onClick={() => {
                                            let text = setting.toLowerCase()
                                            text === "profile" ? navigate('/profile') : handleLogout()
                                        }} />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

        </Box>
    );
}

DonorSideBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DonorSideBar;