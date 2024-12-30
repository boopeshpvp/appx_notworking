import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HouseIcon from '@mui/icons-material/House';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router";
import companyLogo from '../../assets/MSlogo.png';
import { Addemployeebutton } from '../../utils';
import Theme from '../admin-panel/Theme';
import TransitionsModal from "../admin-panel/modal";
import '../sidenavbar/style.css';


const drawerWidth = 240;
function SideNavbar(props) {

    const theme = useSelector(state => state.theme)
    const color = useSelector(state => state.color)
    const bgColor = useSelector(state => state.bgColor)

    const location = useLocation()
    const name = location.pathname.split('/')[2]
    console.log("location",location.pathname.split('/')[2]);
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const IconBox = [<HouseIcon />, <LocationCityOutlinedIcon />, <CreditCardIcon />, <SettingsIcon />, <LogoutIcon />]
    const [activeComponent, setActiveComponent] = useState('');
    const [preActiveComponent, setPreActiveComponent] = useState('')

    let profileCard = JSON.parse(localStorage.getItem('userProfile') || '[]');
    const navigate = useNavigate();
    const handleDashboard = (activeComponent) => {
        setActiveComponent(activeComponent);
    };

    const handlerModalOpen = () => {
        navigate('/admin/addemployee');
    }
    useEffect(() => {
        const storedSelectedItem = localStorage.getItem("activeComponent");
        if (storedSelectedItem) {
            setActiveComponent(storedSelectedItem);
            setActiveComponent(storedSelectedItem);
        }
        { location.pathname === "/admin/dashboard" && setActiveComponent("Dashboard") }
        { location.pathname === "/admin/addemployee" && setActiveComponent("Add Employee") }
        { location.pathname === "/admin/employeelist" && setActiveComponent("Employee-list") }
        { location.pathname === "/admin/addemployee" && setActiveComponent("Add Employee") }
        { location.pathname === "/admin/profile" && setActiveComponent("Profile-view") }
    }, []);

    const handleItemClick = (text) => {
        setPreActiveComponent(activeComponent)
        setActiveComponent(text);
        if (text === "Dashboard") {
            navigate('/admin/dashboard')
        }
        if (text === "Employee-list") {
            navigate('/admin/employeelist');
        }
        if (text === "Profile-view") {
            navigate('/admin/profile')
        }
        // if (text === "Settings") {
        //     navigate('/admin/settings')
        // }

        setActiveComponent(text);
        localStorage.setItem("activeComponent", text);
    };
    const goBack = () => {
        navigate(-1)
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box className='drawer' sx={{ backgroundColor: bgColor }}>
            <div className='adminPanelLayout'>
                <Box sx={{ bgcolor: 'white' }}>
                    <Toolbar> <img className='officeLogo' src={companyLogo} alt='not found' /> </Toolbar>
                    <Divider />
                </Box>
                <div>
                    <List>
                        {/* {['Dashboard', 'Employee-list', 'Profile-view', 'Settings'].map((text, index) => ( */}
                        {['Dashboard', 'Employee-list', 'Profile-view'].map((text, index) => (
                            <ListItem key={text} disablePadding >
                                <ListItemButton onClick={() => handleItemClick(text)} sx={text === activeComponent ?
                                    {
                                        background: 'rgb(255, 255, 255)',
                                        width: '90%',
                                        padding: '0.675rem 0.8rem 0.675rem 1rem',
                                        margin: '5px 1rem',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        userSelect: 'none',
                                        whiteSpace: 'nowrap',
                                        boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
                                        transition: 'boxShadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                        columnGap: '15px',
                                        color: `black`,
                                        '&:hover': { background: 'rgb(255, 255, 255)' }
                                    } :
                                    {
                                        minHeight: '15px',
                                        width: '90%',
                                        justifyContent: 'center',
                                        columnGap: '15px',
                                        margin: '5px 1rem',
                                        color: color
                                    }
                                }>
                                    <ListItemIcon
                                        sx={text === activeComponent ? {
                                            minWidth: '25px',
                                            mr: 'auto',
                                            justifyContent: 'center',
                                            backgroundColor: '#088b89',
                                            border: '1px solid white',
                                            padding: '5px',
                                            borderRadius: '5px',
                                            boxShadow: '22px 22px 44px #afafaf',
                                            color: 'white'
                                        } :
                                            {
                                                minWidth: '25px',
                                                borderRadius: '5px',
                                                background: '#ffffff',
                                                mr: 'auto',
                                                justifyContent: 'center',
                                                padding: '5px'
                                            }
                                        }>
                                        {IconBox[index]}
                                    </ListItemIcon>
                                    <ListItemText primary={text.replace('-', ' ')} sx={{}} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
            <div>
                <List >
                    {['Sign Out'].map((text, index) => (
                        <ListItem key={text} disablePadding >
                            <ListItemButton onClick={() => handleItemClick(text)} sx={text === activeComponent ? {
                                background: 'rgb(255, 255, 255)',
                                width: '90%',
                                padding: '0.675rem 0.8rem 0.675rem 1rem',
                                margin: '5px 1rem',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                userSelect: 'none',
                                whiteSpace: 'nowrap',
                                boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
                                transition: 'boxShadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                columnGap: '15px',
                            } :
                                {
                                    minHeight: '15px',
                                    width: '90%',
                                    justifyContent: 'center',
                                    columnGap: '15px',
                                    margin: '5px 1rem',
                                    color: color
                                }
                            }>
                                <ListItemIcon sx={text === activeComponent ? {
                                    minWidth: '25px',
                                    mr: 'auto',
                                    justifyContent: 'center',
                                    backgroundColor: '#088b89',
                                    border: '1px solid white',
                                    padding: '5px',
                                    borderRadius: '5px',
                                    boxShadow: '22px 22px 44px #afafaf',
                                    color: 'white'
                                } :
                                    {
                                        minWidth: '25px',
                                        borderRadius: '5px',
                                        background: '#ffffff',
                                        mr: 'auto',
                                        justifyContent: 'center',
                                        padding: '5px'
                                    }
                                }>
                                    {IconBox[3]}
                                </ListItemIcon>
                                <ListItemText primary={text.replace('-', '')} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </div>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;
    const renderHeaderContent = () => {
        switch (activeComponent) {
            case "Dashboard":
                return (
                    <React.Fragment>
                        <Typography variant="h6" noWrap className='routerPathDisplay' component="div" sx={{ flexGrow: 1 }}>
                            {activeComponent.replace('-', ' ')}
                        </Typography>

                        {location.pathname === '/admin/addemployee' ? <></> : <div onClick={() => handlerModalOpen()} ><Addemployeebutton /></div>}

                    </React.Fragment>
                );
            case "Add Employee":
                return (
                    <React.Fragment>
                        <Typography variant="h6" noWrap className='routerPathDisplay' component="div" sx={{ flexGrow: 1 }}>
                            {activeComponent.replace('-', ' ')}
                        </Typography>

                        {location.pathname === '/admin/addemployee' ? <></> : <div onClick={() => handlerModalOpen()} ><Addemployeebutton /></div>}

                    </React.Fragment>
                );
            case "Employee-list":
                return (

                    <React.Fragment>
                        {name === "detailview" ?
                            <>
                                <ArrowBackIcon sx={{ color: "#088b89" }} onClick={goBack} />
                                {/* <Avatar alt="Cindy Baker" src={profileCard.employeeProfile} /> */}
                                <Typography variant="h6" noWrap className='routerPathDisplay' component="div" sx={{ flexGrow: 1 }}>
                                    {profileCard.employeeName} • {profileCard.employeeRole} </Typography>
                            </>
                            :
                            <>
                                <Typography variant="h6" noWrap className='routerPathDisplay' component="div" sx={{ flexGrow: 1 }}>
                                    {activeComponent.replace('-', ' ')}
                                </Typography>
                                {location.pathname === '/admin/addemployee' ? <></> : <div onClick={() => handlerModalOpen()} ><Addemployeebutton /></div>}</>
                        }
                    </React.Fragment>
                );
            case "Profile-view":
                return (
                    <React.Fragment>
                        <Typography variant="h6" noWrap className='routerPathDisplay' component="div" sx={{ flexGrow: 1 }}>
                            Profile View
                        </Typography>
                    </React.Fragment>
                );
            case "Settings":
                return (
                    <React.Fragment>
                        <Typography variant="h6" noWrap className='routerPathDisplay' component="div" sx={{ flexGrow: 1 }}>
                            Settings
                        </Typography>
                    </React.Fragment>
                );
            default:
                return (
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        <div className='routerPathDisplay'>{activeComponent}</div>
                    </Typography>
                );
        }
    };

    return (
        <>
            {/* {activeComponent !== 'Sign Out' ? */}
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { md: `calc(100% - ${drawerWidth}px)` },
                        ml: { md: `${drawerWidth}px` },
                        backgroundColor: bgColor,
                        color: "black"
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: "none" }, color: color }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {renderHeaderContent()}
                        <Theme/>
                    </Toolbar>
                </AppBar>

                <Box
                    component="nav"
                    sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true
                        }}
                        sx={{
                            display: { xs: "block", md: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth
                            }
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: "none", md: "block" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth
                            }
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        pb: '0px',
                        width: { md: `calc(100% - ${drawerWidth}px)` },
                        backgroundColor: bgColor,
                        minHeight: '100vh'
                    }}
                >
                    <Toolbar sx={{ minHeight: {xs: '24px !important', sm:'40px !important'} }} />
                    {props.children}
                </Box>
            </Box>

            {activeComponent === 'Sign Out' && <><TransitionsModal isValidate={handleDashboard} preActiveComponent={preActiveComponent} props={props.logoff} openModel={true} /></>}
        </>
    );
}

SideNavbar.propTypes = {
    window: PropTypes.func
};

export default SideNavbar;
