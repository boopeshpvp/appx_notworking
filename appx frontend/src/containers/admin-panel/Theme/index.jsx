import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../../../service/actioncreater';

function Theme() {
    const [themeButton, setThemeButton] = useState(useSelector(state => state.theme))
    const dispatch = useDispatch()
    const color = useSelector(state => state.color)
    const bgColor = useSelector(state => state.bgColor)

    return (
        <>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ pl: '20px', display: 'flex', alignItems: 'center' }}>
                        <IconButton sx={{ border: `1px solid ${themeButton === 'light' ? '#088b89' : 'black'}`, p: '4px', borderRadius: '5px', mr: '10px', color: `${themeButton === 'light' ? 'white' : 'black'}`, backgroundColor: `${themeButton === 'light' ? '#088b89' : 'white'}`, '&:hover': { backgroundColor: '#1a6968', color: 'white' } }} onClick={() => { setThemeButton('light'); dispatch(theme('light')) }}>
                            <LightModeIcon />
                        </IconButton>
                        <IconButton sx={{ border: `1px solid ${themeButton !== 'light' ? '#088b89' : 'black'}`, p: '4px', borderRadius: '5px', mr: '10px', color: `${themeButton !== 'light' ? 'white' : 'black'}`, backgroundColor: `${themeButton !== 'light' ? '#088b89' : 'white'}`, '&:hover': { backgroundColor: '#1a6968', color: 'white' } }} onClick={() => { setThemeButton('dark'); dispatch(theme('dark')) }}>
                            <DarkModeIcon />
                        </IconButton>
                    </Box>
                </Box>
                
        </>
    )
}
export default Theme