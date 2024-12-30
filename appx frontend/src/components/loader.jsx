import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

const LoaderComp = ({isLoading}) => {
    const color=useSelector(state=>state.color)

    return (
        <Backdrop
          sx={{ backgroundColor:'rgb(0 0 0 / 12%)', marginLeft: 'auto',marginTop: 'auto',width: '85%', height: '92vh', zIndex: (theme) => theme.zIndex.drawer + 1, color:color }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default LoaderComp