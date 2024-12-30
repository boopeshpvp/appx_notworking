import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './style.css'
import ProfileChangePassword from '../change-password';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import SideNavbar from '../../sidenavbar';




const ITEM_HEIGHT = 48;

export default function MenuBar({handleChangeProfile}) {
    const navigate=useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        if(anchorEl==="Change password"){
            console.log("Cauht")
        }
  
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
       
        <div className='menu'>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
                
            >
                      <MenuItem onClick={()=>navigate("/admin/profile/change-password")}>Change Password</MenuItem>
            </Menu>
        </div>

    );
}