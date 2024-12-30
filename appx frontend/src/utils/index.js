import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import CustomizedButton from "../components/button";
import './style.css';

export const Addemployeebutton = () => <CustomizedButton buttonName="ADD" className="boxShadow" sx={{display:'none',  backgroundColor: '#088b89 !important'}}  icon={<PersonAddAltIcon /> } variant="contained"/>
export const AddSearchEmployee = (onData) => <FormControl sx={{
    outline: 'none',
    borderColor: '#26bf47',
    boxShadow: '0 0 10px #088b89',
    borderRadius: '5px',
    border: 'none !important',
}} variant="outlined">

    <OutlinedInput sx={{ borderRadius: '5px', maxWidth: '100%', height: 38 }}
        placeholder="Find my name..."
        startAdornment={
            <InputAdornment position="start">
                <IconButton>
                    <SearchIcon />
                </IconButton>
            </InputAdornment>
        }
        endAdornment={
            <InputAdornment position="end">
                <IconButton><HighlightOffIcon /></IconButton>
            </InputAdornment>
        }
    />
</FormControl>

