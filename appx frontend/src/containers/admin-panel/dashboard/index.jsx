import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  ListItemText,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import "animate.css";
import { useLocation } from "react-router";
import SideNavbar from "../../sidenavbar";
import PieChart from "../chartdata";
import "../dashboard/style.css";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router";
import AddEvent from "../../../assets/eventimg.png";
import FullCalendar from "@fullcalendar/react";
import Grid from "@mui/material/Unstable_Grid2";
import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { List, ListItem, useTheme } from "@mui/material";
import { EventImpl } from "@fullcalendar/core/internal";

const AdminDashbaord = (props) => {
  const navigate = useNavigate();
  const [calendar, setCalendar] = useState(false);
  const [alertMessage, setAlertMessage] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = alertMessage;

  const location = useLocation();

  const handleClose = () => {
    setAlertMessage({ ...alertMessage, open: false });
  };
  const openCalender = () => {
    setCalendar(true);
  };

  let time = new Date();
  useEffect(() => {
    // const obj = document.getElementById("value");
    // const lastinterView = document.getElementById("weekInterview");
    // const currentInterview = document.getElementById("todayInterview");
    function animateValue(obj, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const employeeCount = Math.floor(progress * (end - start) + start);
        obj.innerHTML = `${employeeCount}`;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
    // animateValue(obj, 0, 20, 1000);
    // animateValue(lastinterView, 0, 10, 1000);
    // animateValue(currentInterview, 0, 5, 1000);
    if (location.state !== null) {
      setAlertMessage({ ...alertMessage, open: true });
    }
    setTimeout(() => call(), 1000);
  }, []);
  const call = () => {
    window.history.replaceState({}, document.title);
  };

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
  const goBack = () => {
    setCalendar(false);
  };

  return (
    <>
    <SideNavbar logoff={props}>

    need to design
    </SideNavbar>
      {/* <SideNavbar logoff={props}>
        {!calendar ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            > */}
              {/* PieChart */}
              {/* <div className="peichartWidth ">
                <Divider className="dashboardTitle">Total Employees</Divider>
                <div className="pieChart ">
                  <div>
                    <PieChart />
                  </div>
                </div>
              </div>

              <div>
                <div className="headerWidth">
                  <Divider className="dashboardTitle ">
                    Interview Scheduled
                  </Divider>
                </div> */}
                {/* card */}

                {/* <Box sx={{ marginTop: 1 }}>
                  <div className="dashboardHeader">
                    <div className="dynamicCardsTotal">
                      <div className="topicHeader">Total </div>
                      <div id="value" className="topicTotalEmployee"></div>
                    </div> */}

                    {/* <div className="dynamicCardsTotal">
                    <div className="topicHeader">Last 5 days </div>
                    <div
                      id="weekInterview"
                      className="topicTotalEmployee"
                    ></div>
                  </div> */}
                    {/* <div className="dynamicCardsTotal">
                      <div className="topicHeader">
                        Today
                        {`(${time.getDate()}/${
                          time.getMonth() + 1
                        }/${time.getFullYear()})`}
                      </div>
                      <div
                        id="todayInterview"
                        className="topicTotalEmployee"
                      ></div>
                    </div>
                  </div>
                </Box>
              </div>
            </div>

            <Box sx={{ marginTop: 2 }} className="dashboardContainer">
              <div className="calenderWidth">
                <Divider className="dashboardTitle">Events</Divider> */}
                {/* <Box className="eventCardDisplay">
                  <Box>
                    <Card className="cardBox">
                      <CardContent className="cardContent">
                        <Typography className="profileCardHeading">
                          All-day event
                        </Typography>
                        <Typography className="attendedInterviewCount">
                          Sep 14,2022
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                  <Box>
                    <Card className="cardBox">
                      <CardContent className="cardContent">
                        <Typography className="profileCardHeading">
                          Timed event
                        </Typography>
                        <Typography className="attendedInterviewCount">
                          Sep 28,2022
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Box> */}
                {/* <List className="eventDisplay">
                  {currentEvents.map((event) => {
                    console.log("event", event);
                    return (
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
                    );
                  })}
                </List> */}
{/* 
                <Button className="addEventButton" onClick={openCalender}>
                  Add Event
                </Button> */}
                {/* <Card
                  className="eventcardBox"
                  onClick={() => navigate("/admin/eventcalendar")}
                >
                  <CardContent className="eventcardContent">
                    <img src={AddEvent} alt="eventimg" className="eventImg" />
                  </CardContent>
                </Card> */}
              {/* </div>
            </Box>
            <Box m="20px">
             
              <Grid
                container
                spacing={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Grid xs={6}>
                  <Box ml="15px">
                    <FullCalendar
                      height="40vh"
                      plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                      ]}
                      headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right:
                          "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
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
                      ]}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <>
            <Button className="addEventButton" onClick={goBack}>
              Back
            </Button>
            <Box m="20px">
             
              <Grid
                container
                spacing={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Grid xs={10}>
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
                        right:
                          "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
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
          </>
        )}
      </SideNavbar>
      <Stack spacing={1} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          key={"top" + "left"}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully Logged !
          </Alert>
        </Snackbar>
      </Stack> */}
    </>
  );
};
export default AdminDashbaord;