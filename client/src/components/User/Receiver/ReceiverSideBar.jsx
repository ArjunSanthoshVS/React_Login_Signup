import * as React from 'react';
import './ReceiverSideBar.css'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
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
    console.log(user, 'mmmmmmmmmmm');

    const handleLogout = () => {
        dispatch(setLogout())
        // navigate("/login")
        window.location = "/login"
    }

    const handleDonor = () => {
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
    }
    const handleReceiver = () => {
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
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar style={{ backgroundColor: "#054D60" }} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
               
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {[
                            { name: 'Home', icon: <HomeIcon /> },
                            { name: 'Receive Blood', icon: <Doantion /> },
                            { name: 'Transfusion History', icon: <HistoryIcon /> },
                            { name: 'Available Branches', icon: <Branch /> },
                            { name: 'Other Donations', icon: < CurrencyRupeeIcon /> }].map((text, index) => (
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
                                                text2 === "receive blood" && navigate('/receive')
                                                text2 === "transfusion history" && navigate('/transfusion_history')
                                                text2 === "available branches" && navigate('/branches')
                                                text2 === "other donations" && navigate('/other_donation')

                                            }} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                    </List>
                </Box>



            </Drawer>
            {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </Box> */}
        </Box>
    );
}