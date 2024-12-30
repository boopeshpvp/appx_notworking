import React, { useContext, useEffect, useState } from 'react';
import { getMonth } from './utils';
import { Box, Grid } from '@mui/material';
import CalendarHeader from './calendarHeader';
import GlobalContext from './context/globalContext';
import "./style.css";
import Month from './month';
import Usersidenavbar from '../../../userSidenavbar';


const Calendar = (props) => {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex } = useContext(GlobalContext)
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])
  console.log('currentMonth',currentMonth);
  return (
    <Usersidenavbar logoff={props}>
      <Grid sx={{ marginTop: 10,width:"90%"}}>
        <Box sx={{ height: '88vh', display: 'flex', flexDirection: 'column' }}>
          <CalendarHeader month={currentMonth}/>
          <Box sx={{ margin: "auto", width: "90%", display: 'flex', flexGrow: "1", flexShrink: "1", flexBasis: "0%" }}>

            <Month month={currentMonth} />
          </Box>
        </Box>
      </Grid>
    </Usersidenavbar>
  );
}

export default Calendar;