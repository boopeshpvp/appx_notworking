import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EventIcon from '@mui/icons-material/Event';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import companyLogo from "../assets/MSlogo.png";
import profileImage from "../assets/profile-image.jpg";
import "./style.css";


import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useState } from 'react';
import { loginSource } from '../service/actioncreater';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    zIndex: 10,
    borderRadius: "12px",
    backgroundColor: "whitesmoke",
    padding: "12px"
};
export default function Usersidenavbar(props) {

    const selector = useSelector((state) => state)
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();
    const [activeComponent, setActiveComponent] = React.useState("");
    const [modal, setModal] = React.useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [dropdown, setDropdown] = React.useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const IconBox = [<HomeIcon />, <EventIcon />, <AccountBoxIcon />, <LogoutIcon />]
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const storedSelectedItem = localStorage.getItem("activeComponent");
        if (storedSelectedItem) {
            setActiveComponent(storedSelectedItem);
            setActiveComponent(storedSelectedItem);
        }
        {
            location.pathname === "/user/home" && setActiveComponent("Home");
        }
        {
            location.pathname === "/user/userevent" && setActiveComponent("Event");
        }
        {
            location.pathname === "/user/userprofile" &&
                setActiveComponent("Profile");
        }
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
        setIsDrawerOpen(!isDrawerOpen)
    };
    const handleClose = () => {
        setModal(false);
    };

    const handleLogout = () => {
        localStorage.setItem("authentication", false);
        localStorage.removeItem("route")
        localStorage.removeItem("token");
        localStorage.removeItem("userdetails")
        localStorage.removeItem("activeComponent");
        localStorage.removeItem("password");
        localStorage.removeItem("userProfile");
        localStorage.setItem("switchButton", "[]");
        props.logoff.isAuthOut();
        dispatch(loginSource(false))
        navigate("/", { state: { logoff: true } });
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlerClick = (event) => {
        setDropdown(event?.currentTarget);
    }
    const closeDropdown = () => {
        setDropdown(null)
    }
    const opens = Boolean(anchorEl);
    const openData = Boolean(dropdown)

    const handleNotification = () => {
        setAnchorEl(null);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setIsDrawerOpen(!isDrawerOpen)
    };
    const handleItemClick = (text) => {
        console.log("text", text);
        setActiveComponent(text);
        if (text === "Home") {
            navigate("/user/home");
        }
        if (text === "Profile") {
            navigate("/user/userprofile");
        }
        if (text === "Event") {
            navigate("/user/userevent");
        }
        if (text === "Sign Out") {
            setModal(true);
        }
        localStorage.setItem("activeComponent", text);
    };

    console.log("log", selector.loginDetails.email)

    return (
        <Box sx={{ display: 'flex', position: "relative" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            color: "#088b89",
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box className="topNavbar" sx={{ backgroundColor: "#f1f2f6" }}>
                        <Box sx={{ cursor: "pointer" }}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                onClick={() => handleItemClick("Home")}
                            >
                                {isDrawerOpen ? "" : <img
                                    className="officeLogo"
                                    src={companyLogo}
                                    alt="not found"
                                />}
                            </Typography>
                        </Box>

                        <Box>
                            <Box className="topNavbarIcons">
                                <Box sx={{ cursor: "pointer" }}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        onClick={handleClick}
                                    >
                                        <NotificationsActiveIcon
                                            style={{ color: "#088b89 " }}
                                        />

                                    </Typography>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={opens}
                                        onClose={handleNotification}
                                        onClick={handleNotification}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: "visible",
                                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                mt: 1.5,
                                                "& .MuiAvatar-root": {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                "&:before": {
                                                    content: '""',
                                                    display: "block",
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: "background.paper",
                                                    transform: "translateY(-50%) rotate(45deg)",
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{
                                            horizontal: "right",
                                            vertical: "top",
                                        }}
                                        anchorOrigin={{
                                            horizontal: "right",
                                            vertical: "bottom",
                                        }}
                                    >
                                        <MenuItem onClick={handleNotification}>
                                            <Avatar /> TimeSheet Notifications
                                        </MenuItem>
                                        <MenuItem onClick={handleNotification}>
                                            <Avatar /> Leave Notifications
                                        </MenuItem>
                                    </Menu>
                                </Box>
                                <Box sx={{ cursor: "pointer" }}>
                                    <Box sx={{ color: '#088b89', fontSize: '1.2rem', mt: '0.25rem', fontWeight: '700' }} >
                                        <img
                                            className="profileLogo"
                                            src={selector.loginSource ? selector.loginDetails._tokenResponse.photoUrl : profileImage}
                                            alt="not found"
                                            onClick={handlerClick}
                                        />
                                        {selector.loginSource ? selector.loginDetails._tokenResponse.firstName : selector.loginDetails.Email?.charAt(0).toUpperCase() + selector.loginDetails.Email?.slice(1).split(".")[0]}
                                    </Box>
                                    <Menu
                                        anchorEl={dropdown}
                                        id="account-menu"
                                        open={openData}
                                        onClose={closeDropdown}
                                        onClick={closeDropdown}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: "visible",
                                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                mt: 1.5,
                                                "& .MuiAvatar-root": {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                "&:before": {
                                                    content: '""',
                                                    display: "block",
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: "background.paper",
                                                    transform: "translateY(-50%) rotate(45deg)",
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{
                                            horizontal: "right",
                                            vertical: "top",
                                        }}
                                        anchorOrigin={{
                                            horizontal: "right",
                                            vertical: "bottom",
                                        }}
                                    >
                                        <MenuItem onClose={closeDropdown} >
                                            <Avatar /> Comments
                                        </MenuItem>
                                        <MenuItem onClose={closeDropdown} onClick={() => handleItemClick("Sign Out")}>
                                            <Avatar /> Logout
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <img className="officeLogo" src={companyLogo} alt="not found" />
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Home', 'Event', 'Profile', 'Sign Out'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton className={text === activeComponent && isDrawerOpen ? "boxShadow" : ""} onClick={() => handleItemClick(text)}
                                sx={text === activeComponent ? {
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    background: 'rgb(255, 255, 255)',
                                    width: '90%',
                                    padding: '0.675rem 0.8rem 0.675rem 1rem',
                                    margin: '15px 0.7rem',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    whiteSpace: 'nowrap',
                                    transition: 'boxShadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                    columnGap: '15px',
                                } :
                                    {
                                        minHeight: '15px',
                                        width: '90%',
                                        justifyContent: 'center',
                                        columnGap: '15px',
                                        margin: '15px 0.7rem',
                                        color: 'black'
                                    }}
                            >
                                <ListItemIcon
                                    sx={text === activeComponent ? {
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        minWidth: '25px',
                                        mr: 'auto',
                                        backgroundColor: '#088b89',
                                        padding: '0.5rem',
                                        border: '1px solid white',
                                        borderRadius: '5px',
                                        color: 'white'
                                    } :
                                        {
                                            minWidth: '25px',
                                            borderRadius: '5px',
                                            background: '#ffffff',
                                            mr: 'auto',
                                            justifyContent: 'center',
                                        }}
                                >
                                    {IconBox[index]}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <DrawerHeader />
            {props.children}
            {modal &&
                <Box sx={style}>
                    <div className="cancelModel">
                        <HighlightOffIcon onClick={handleClose} />
                    </div>
                    <div className="modelContainer">
                        <div> Are you sure want to Logout</div>
                        <div className="modelButtonContainer">
                            <div>
                                <Button
                                    variant="outlined"
                                    color="success"
                                    onClick={handleLogout}
                                >
                                    Yes
                                </Button>
                            </div>
                            <div>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={handleClose}
                                >
                                    No
                                </Button>
                            </div>
                        </div>
                    </div>
                </Box>
            }
        </Box>
    );
}



