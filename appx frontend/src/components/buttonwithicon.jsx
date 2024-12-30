import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

const ButtonWithIcon = ({icon, name}) => {
    return (
        <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<DeleteIcon />}>
                {icon}
            </Button>
            <Button variant="contained" endIcon={<SendIcon />}>
                {name}
            </Button>
        </Stack>
    );
}

export default ButtonWithIcon