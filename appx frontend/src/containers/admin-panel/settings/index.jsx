import './style.css'
import SideNavbar from '../../sidenavbar'
import { Box, IconButton } from '@mui/material'
import { useState } from 'react'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';

function AdminSettings(props) {
    const [themeButton, setThemeButton] = useState(useSelector(state => state.theme))
    const dispatch = useDispatch()
    const color = useSelector(state => state.color)
    const bgColor = useSelector(state => state.bgColor)

    return (
        <>
            <SideNavbar logoff={props}>
            <Box sx={{ fontWeight: 'bold',pr: '20px', color:color,textAlign:"center",mt:"30px"}}>Need to design</Box>
            </SideNavbar>
        </>
    )
}
export default AdminSettings