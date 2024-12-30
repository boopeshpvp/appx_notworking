import React from 'react'
import Box from '@mui/material/Box';
import Day from './day';

export default function Month({ month }) {
    return (
        <Box sx={{ flexGrow: "1", flexShrink: "1", flexBasis: "0%", display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>

            {month.map((row, index) => (
                console.log('row',row),
                <React.Fragment>
                    {row.map((day, idx) => (
                        console.log('day',day.format("ddd")),
                        
                        index === 0 && <p className='day'>{day.format("ddd").toUpperCase()}</p>
                    ))}
                   
                    {row.map((day, idx) => (
                        console.log('day',day),
                        console.log('idx',idx),
                        console.log('index',index),
                        < Day day={day} key={idx} rowIndex={index} />
                    ))}
                </React.Fragment>
            ))
            }

        </Box >
    )
}