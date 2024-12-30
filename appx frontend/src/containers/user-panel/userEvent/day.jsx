// import { Box, Chip, Tooltip } from '@mui/material';
// import dayjs from 'dayjs';
// import React, { useEffect } from 'react';
// import { useState } from 'react';

// export default function Day({ day, rowIndex }) {
//     const [selectDate, setSelectDate] = useState([])
//     const eventArray = [
//         { title: "React", participant: "Interview with Ganapathy", date: "31-08-2023", time: "3.00pm", description: "Prepare React Top to bottom" }, { title: "React", participant: "Interview with Mani", date: "26-08-2023", time: "3.00pm", description: "Prepare Angular upto Bottom" },
//         { title: "Node", participant: "Interview with Boopesh", date: "30-08-2023", time: "3.00pm", description: "Prepare Node Top to bottom" },
//         { title: "Python", participant: "Interview with Revan", date: "30-08-2023", time: "3.00pm", description: "Prepare Python Top to bottom" },
//     {title:"Django",participant:"Interview with Baasha",date:"02-10-2023",time: "3.00pm", description: "Prepare Python Top to bottom" }]

//     const getCurrentDayClass = () => {
//         return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY") ? "presentDay" : "";
//     };
//     const isCurrentYear = day.format("YYYY") === dayjs().format("YYYY");

//     const isCurrentMonth = day.format("MM") === dayjs().format("MM");
//     const isCurrentDay = day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY");

//     useEffect(() => {
//         setSelectDate(eventArray.map((events) => events.date))
//     }, [])

//     return (
//         <>
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     border: "1px solid rgb(229 231 235)",
//                     backgroundColor: isCurrentMonth && isCurrentYear ? (isCurrentDay ? 'lightyellow' : 'white') : '#f5f5f5',
//                 }}
//             >
//                 {rowIndex === 0 && (
//                     <p className='day'> {day.format("ddd").toUpperCase()}</p>
//                 )}
//                 <header className='header'>
//                     <p className={`date ${getCurrentDayClass()}`}>{day.format("DD")}</p>
//                 </header>

//                 <p>{selectDate.map(date => date).includes(day.format("DD-MM-YYYY")) ?eventArray.map((events) => events.date.includes(day.format("DD-MM-YYYY")) ?
//                     <Tooltip title={events.participant} >
//                         <Chip label={events.description} color="primary" variant="outlined" /></Tooltip> : "") : ""}</p>
//             </Box>
//         </>
//     );
// }


import { Box, Chip, Tooltip } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useState } from 'react';

export default function Day({ day, rowIndex }) {
    const [eventData, setEventData] = useState([])
    const apiData = eventData.map(res => res.startDate)
    // console.log("apiData", apiData);

    // const eventArray = [
    //     { title: "React", participant: "Interview with Ganapathy", date: "31-08-2023", time: "3.00pm", description: "Prepare React Top to bottom" },
    //     { title: "React", participant: "Interview with Mani", date: "26-08-2023", time: "3.00pm", description: "Prepare Angular upto Bottom" },
    //     { title: "Node", participant: "Interview with Boopesh", date: "30-08-2023", time: "3.00pm", description: "Prepare Node Top to bottom" },
    //     { title: "Python", participant: "Interview with Revan", date: "30-08-2023", time: "3.00pm", description: "Prepare Python Top to bottom" }]

    const getCurrentDayClass = () => {
        return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY") ? "presentDay" : "";
    };

    const isCurrentYear = day.format("YYYY") === dayjs().format("YYYY");
    const isCurrentMonth = day.format("MM") === dayjs().format("MM");
    const isCurrentDay = day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY");

    useEffect(() => {
        axios.get("http://localhost:4000/user/createEvent", {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((res) => {
                console.log('res',res);
                setEventData(res.data.map((response) => response))
            })
            .catch((err) => console.log("Error", err))
    }, [])
console.log("dd",day.format("DD"));
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: "1px solid rgb(229 231 235)",
                    backgroundColor: isCurrentMonth && isCurrentYear ? (isCurrentDay ? 'lightyellow' : 'white') : '#f5f5f5',

                }}
            >
                {/* {rowIndex === 0 && (
                    <p className='day'> {day.format("ddd").toUpperCase()}</p>
                )} */}
                <header className='header'>
                    
                    <p className={`date ${getCurrentDayClass()}`}>{day.format("DD")}</p>
                </header>
                <p >{eventData.map(selectDate => selectDate.startDate).includes(day.format("DD-MM-YYYY")) ?
                    eventData.map((events) => events.startDate.includes(day.format("DD-MM-YYYY")) ?
                        <Tooltip title={events.participant} >
                            <Chip sx={{ display: "flex", justifyContent: "center", backgroundColor: '#088b89', color: "whitesmoke" }} label={events.description} color="success" />
                        </Tooltip> : "")
                    : ""}</p>
            </Box>
        </>
    );
}