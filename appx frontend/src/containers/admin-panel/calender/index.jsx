// import React from "react";
// import '../calender/style.css';
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from '@fullcalendar/interaction';
// import events from "./ResourceGroup";

// export default function App() {
//   return (
//     <div className="App">
//       {/* <FullCalendar
//         dayMinWidth={'60%'}
//         height={'400px'}
//         defaultView="dayGridMonth"
//         header={{
//           left: "prev,next",
//           center: "title",
//           right: "dayGridMonth,timeGridWeek,timeGridDay"
//         }}
//         themeSystem="Simplex"
//         plugins={[dayGridPlugin]}
//         events={events}
//       /> */}


//       <FullCalendar
//        dayMinWidth={'65%'}
//        contentHeight={'auto'}
//         defaultView="dayGridMonth"
//         themeSystem="Simplex"
//         header={{
//           left: "prev,next",
//           center: "title",
//           right: "dayGridMonth,timeGridWeek,timeGridDay",
//         }}
        
//         plugins={[interactionPlugin, dayGridPlugin ]}
//         events={events}
//         displayEventEnd="true"
//         selectable = "true"
//         eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
//       />
// {/* 
//       <FullCalendar
//        contentHeight={'auto'}
//        plugins={[interactionPlugin, dayGridPlugin ]}
//        events={events}
//        eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
//        /> */}
//     </div>
//   );
// }

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import Grid from "@mui/material/Unstable_Grid2";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
// import Header from "../../components/Header";
// import { tokens } from "../../theme";

const App = () => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(date);
};

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">
      {/* <Header title="Calendar" subtitle="Full Calendar Interactive Page" /> */}
      <Grid container spacing={2} justifyContent={"center"} alignItems={"center"} height={"95vh"}>
        <Grid xs={12} md={4}>
          <Box
          // backgroundColor={colors.primary[400]}
             p="15px"
             borderRadius="4px"
        > 
            <Typography variant="h5">Events</Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    // backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid xs={10} md={8}>
          <Box ml="15px">
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={[
                {
                  id: "12315",
                  title: "All-day event",
                  date: "2022-09-14",
                },
                {
                  id: "5123",
                  title: "Timed event",
                  date: "2022-09-28",
                },
              ]}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;