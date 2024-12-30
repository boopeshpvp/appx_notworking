import { Box } from '@mui/material'
import './style.css'

function AdminProfileSettings() {
    return (
        <>
            <Box sx={{ display: 'flex', mt: '30px', alignItems: 'center' }}>
                <Box sx={{ fontWeight: 'bold', fontSize: 'h5.fontSize', pr: '20px' }}>Admin profile settings</Box>
            </Box>
        </>
    )
}
export default AdminProfileSettings