import { Box } from "@mui/material";
import React, { useState } from "react";
import SideNavbar from "../../sidenavbar";
import "./style.css";

import LanguageIcon from '@mui/icons-material/Language';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";

import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function PersonalInformation(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const totalPath = location.pathname.split('/')
    const lastPath = totalPath[totalPath.length - 1]
    const tabNo = lastPath === 'profile' ? 1 : lastPath === 'change-password' ? 2 : 3
    const [activeTab, setActiveTab] = useState(tabNo)
    const color = useSelector(state => state.color)
    const bgColor = useSelector(state => state.bgColor)

    return (
        <>
            <SideNavbar logoff={props}>
                <Box sx={{ display: 'flex', gap: '50px', borderBottom: '2px solid lightgrey', pb: '4px', position: 'sticky', top: {xs: '48px', sm:'64px'}, pt: '20px', zIndex: '1', color: color, backgroundColor:bgColor }}>
                    <Box sx={{ cursor: 'pointer', position: 'relative', color: `${activeTab === 1 && '#088b89'}` }} onClick={() => { setActiveTab(1); navigate("/admin/profile") }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: `${activeTab === 1 && 'bold'}` }}><LanguageIcon />Profile</Box>
                        {activeTab === 1 && <Box sx={{ borderBottom: '2px solid #088b89', position: 'absolute', width: '100%', bottom: '-5.6px' }}></Box>}
                    </Box>
                    <Box sx={{ cursor: 'pointer', position: 'relative', color: `${activeTab === 2 && '#088b89'}` }} onClick={() => { setActiveTab(2); navigate("/admin/profile/change-password") }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: `${activeTab === 2 && 'bold'}` }}><LockIcon />Change Password</Box>
                        {activeTab === 2 && <Box sx={{ borderBottom: '2px solid #088b89', position: 'absolute', width: '100%', bottom: '-5.6px' }}></Box>}
                    </Box>
                </Box>
                <Outlet />
            </SideNavbar>
        </>
    );
}

export default PersonalInformation;
