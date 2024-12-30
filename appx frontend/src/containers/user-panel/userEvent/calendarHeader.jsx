
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import TodayIcon from '@mui/icons-material/Today';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import CustomizedButton from '../../../components/button';
import GlobalContext from './context/globalContext';

export default function CalendarHeader({month}) {
    const navigate = useNavigate();
    const { monthIndex, setMonthIndex } = useContext(GlobalContext)

    const handleReset = () => {
        setMonthIndex(dayjs().month())
    }
    const handlePreviousMonth = () => {
        setMonthIndex(monthIndex - 1)
    }
    const handleNextMonth = () => {
        setMonthIndex(monthIndex + 1)
    }
    const goBack = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent:"space-between", pl: "1rem", pr: "1rem", mt:"0.5rem"}}>
            <Box sx={{ mr: "2.5rem", lineHeight: "2.5rem" }}>
                <ArrowBackIcon sx={{ color: "#088b89" }} onClick={goBack} />
            </Box>
            <Box sx={{ display: "flex" }}>
                <CustomizedButton variant="contained" icon={<TodayIcon />} className='todayButton' onClick={() => handleReset()} buttonName="Today" type="submit" />
                <Tooltip title="Previous Month">
                    <IconButton
                        onClick={() => handlePreviousMonth()}
                        size="small"
                        sx={{ ml: 2, color: "#088b89" }}
                    >
                        <ChevronLeftOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Next Month">
                    <IconButton
                        onClick={() => handleNextMonth()}
                        size="small"
                        sx={{ ml: 2, color: "#088b89" }}
                    >
                        <ChevronRightOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Typography variant='h2' sx={{ fontWeight: "700", fontSize: "1.25rem", lineHeight: "2.5rem", color: "rgb(107 114 128)", ml: "1rem" }}>
                    {dayjs(new Date(dayjs().year(), monthIndex)).format("MMM YYYY")}
                </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Typography sx={{ fontWeight: "700", fontSize: "1.25rem", lineHeight: "2.5rem", color: "#088b89" }} >Events</Typography>
            </Box>
        </Box>
        
    )
}