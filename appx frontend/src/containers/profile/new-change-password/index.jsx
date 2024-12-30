import './style.css'

import { Box } from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';


function ProfileChangePassword() {
    const color = useSelector(state => state.color)
    const bgColor = useSelector(state => state.bgColor)

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);
    const handleMouseDownCurrentPassword = (event) => {
        event.preventDefault();
    };

    const [showNewPassword, setShowNewPassword] = useState(false);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleMouseDownNewPassword = (event) => {
        event.preventDefault();
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Box sx={{ color: color }}>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px dashed orange', borderRadius: '10px', mt: '40px', p: '10px' }}>
                    <Box sx={{ pr: '10px' }}>
                        <WarningAmberIcon sx={{ color: '#ffaa00' }} />
                    </Box>
                    <Box sx={{ pl: '10px' }}>
                        <Box>Alert!</Box>
                        <Box sx={{ 'span': { fontWeight: 'bold' } }}>Your pasword will expire in every 3 month. So change it periodically. <span>Do not share your password</span></Box>
                    </Box>
                </Box>

                <Box sx={{ border: '1px solid #cacaca', borderRadius: '10px', my: '20px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: '15px', px: '15px', alignItems: 'center', borderBottom: '1px solid #cacaca' }}>
                        <Box sx={{ fontWeight: 'bold', fontSize: 'h6.fontSize' }}>Change Password</Box>
                    </Box>
                    <Box sx={{ py: '20px', px: '15px' }}>
                        <Box>
                            <Box sx={{ width: '100%', mb: '20px' }}>
                                <FormControl sx={{
                                    width: { xs: '100%', sm: '50%' }, pr: { xs: '0px', sm: '10px' },
                                    'label': { color: color },
                                    'div': {
                                        'input': { color: color },
                                        'input:focus ~ fieldset': { borderColor: '#1976d2 !important' },
                                        'fieldset': { borderColor: color },
                                        '&:hover': { 'fieldset': { borderColor: `${color} !important` } },

                                    },
                                }}
                                    variant="outlined" size='small'>
                                    <InputLabel htmlFor="outlined-adornment-password">Current Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowCurrentPassword}
                                                    onMouseDown={handleMouseDownCurrentPassword}
                                                    edge="end"
                                                    sx={{ color: color }}
                                                >
                                                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Current Password"
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{ width: '100%', display: { sm: 'flex' }, mt: '20px' }}>
                                <FormControl sx={{
                                    width: { xs: '100%', sm: '50%' }, pr: { xs: '0px', sm: '10px' },
                                    'label': { color: color },
                                    'div': {
                                        'input': { color: color },
                                        'input:focus ~ fieldset': { borderColor: '#1976d2 !important' },
                                        'fieldset': { borderColor: color },
                                        '&:hover': { 'fieldset': { borderColor: `${color} !important` } },

                                    },
                                }}
                                    variant="outlined" size='small'>
                                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showNewPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowNewPassword}
                                                    onMouseDown={handleMouseDownNewPassword}
                                                    edge="end"
                                                    sx={{ color: color }}
                                                >
                                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="New Password"
                                    />
                                </FormControl>
                                <FormControl sx={{
                                    width: { xs: '100%', sm: '50%' }, pr: { xs: '0px', sm: '10px' },
                                    'label': { color: color },
                                    'div': {
                                        'input': { color: color },
                                        'input:focus ~ fieldset': { borderColor: '#1976d2 !important' },
                                        'fieldset': { borderColor: color },
                                        '&:hover': { 'fieldset': { borderColor: `${color} !important` } },

                                    },
                                }}
                                    variant="outlined" size='small'>
                                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownConfirmPassword}
                                                    edge="end"
                                                    sx={{ color: color }}
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirm Password"
                                    />
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'right', mt: '20px', gap: '20px' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#088b89', '&:hover': { backgroundColor: '#1a6968' } }}>Change Password</Button>
                            <Button variant="outlined" color='error'>Clear</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default ProfileChangePassword