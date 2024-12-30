import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import ForumIcon from "@mui/icons-material/Forum";
import { Box, Button, Grid, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useSession, useSessionContext, useSupabaseClient, } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FieldWithIcon from "../../../components/textFeild";
import CustomizedButton from "../../../components/button";
import 'add-to-calendar-button';
import "./style.css"
import Usersidenavbar from "../../../userSidenavbar";
const CreateEventForm = (props) => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [Title, setTitle] = useState("");
  const [ParticipantEmail, setParticipantEmail] = useState([])
  const [Participant, setParticipant] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm({
    mode: "onChange",
  });
  if (isLoading) {
    return <></>;
  }

  async function onSubmit(data) {
    console.log("data",data);
    // console.log("creating calendar evenyt");
    const event = {
      "summary": Title,
      "description": eventDescription,
      "start": {
        "dateTime": start.toISOString(),
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      "end": {
        "dateTime": end.toISOString(),
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      'attendees': [
        {'email':Participant},
      ],
      "conferenceData": {
        "createRequest": {
            "conferenceSolutionKey": {
                "type": "hangoutsMeet"
            },
            "requestId": Participant
        }
    },
      
    };

    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + session.provider_token,
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log("dataevent",data);
        alert("Event created, check your google calendar");
      }).catch(err=>console.log(err));
  }

  // async function createCalendarEvent(){
  //   console.log("creating calendar evenyt");
  //   const event={
  //     "summary":Title,
  //     "description":eventDescription,
  //     "start":{
  //       "dateTime":start.toISOString(),
  //       "timeZone":Intl.DateTimeFormat().resolvedOptions().timeZone
  //     },
  //     "end":{
  //       "dateTime":end.toISOString(),
  //       "timeZone":Intl.DateTimeFormat().resolvedOptions().timeZone
  //     }
  //   }
  //   await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events",{
  //     method:"POST",
  //     headers:{
  //       "Authorization":"Bearer"+session.provider_token
  //     },
  //     body:JSON.stringify(event)
  //   })
  //   .then((data)=>{
  //     return data.json()
  //   })
  //   .then((data)=>{
  //     console.log(data);
  //     alert("Event created, check your google calendar")
  //   })
  // }

  async function handleSignin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) {
      alert("Error logging in to Google provider with S upabase");
      // console.log(error);
    }
  }

  // async function handleSignout() {
  //   await supabase.auth.handleSignout();
  // }
  console.log("session",session);
  console.log(Participant);
  console.log(start);
  console.log(Title);
  console.log(eventDescription);
  return (
    <Usersidenavbar logoff={props}>
      <Grid
        container
        xs={12}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
      >
      <add-to-calendar-button 
  name="Sample Event"
  description="Play with me!"
  startDate="2023-09-14"
  endDate="2023-09-14"
  startTime="10:15"
  endTime="17:45"
  label="Create new event"
  timeZone="Asia/Calcutta"
  location="World Wide Web"
  options="'Google'"
></add-to-calendar-button>
</Grid>
      {/* <Grid
        container
        xs={12}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
      >
        {session?
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Box textAlign="center" className="title-container mtb-20">
              Event created by {session.user.email}
            </Box>
            <Box className="flexContainer">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <FieldWithIcon
                  icon="TitleIcon"
                  label="Add Title"
                  name="Title"
                  touchedFields={touchedFields}
                  dirtyFields={dirtyFields}
                  errors={errors}
                  register={register}
                  required={true}
                  width={270}
                  variant="standard"
                  onChange={(e) => setTitle(e.target.value)}
                /> */}
                {/* <TitleIcon
                  sx={{
                    color:
                      errors?.Title ||
                        (touchedFields?.Title && !dirtyFields?.Title)
                        ? "red"
                        : " #088b89",
                    mr: 1,
                    my: 0.5,
                  }}
                />
                <TextField
                  sx={{
                    width: 268,
                    "& .MuiFormLabel-root.Mui-focused": {
                      color:
                        (touchedFields?.Title && !dirtyFields?.Title) ||
                          errors?.Title
                          ? "red"
                          : " #088b89",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor:
                        (touchedFields?.Title && !dirtyFields?.Title) ||
                          errors?.Title
                          ? "red"
                          : " #088b89",
                    },
                  }}
                  {...register("Title", {
                    required: true,
                    // pattern: /^[a-zA-Z ]{1,30}$/,
                  })}
                  error={
                    (touchedFields?.Title && !dirtyFields?.Title) ||
                      errors.Title
                      ? true
                      : false
                  }
                  id="input-with-sx"
                  label="Add Title"
                  variant="standard"
                   onChange={(e)=>setTitle(e.target.value)}
                /> */}
              {/* </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}> */}
                {/* <BadgeIcon
                  sx={{
                    color:
                      errors?.Participant ||
                      (touchedFields?.Participant && !dirtyFields?.Participant)
                        ? "red"
                        : " #088b89",
                    mr: 1,
                    my: 0.5,
                  }}
                /> */}
{/* 
                <FieldWithIcon
                  icon="BadgeIcon"
                  label="Add Participant"
                  name="Participant"
                  touchedFields={touchedFields}
                  dirtyFields={dirtyFields}
                  errors={errors}
                  register={register}
                  required={true}
                  width={270}
                  variant="standard"
                  onChange={(e) => setParticipant(e.target.value)}
                /> */}

                {/* <TextField
                  sx={{
                    width: 268,
                    "& .MuiFormLabel-root.Mui-focused": {
                      color:
                        (touchedFields?.Participant &&
                          !dirtyFields?.Participant) ||
                          errors?.Participant
                          ? "red"
                          : " #088b89",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor:
                        (touchedFields?.Participant &&
                          !dirtyFields?.Participant) ||
                          errors?.Participant
                          ? "red"
                          : " #088b89",
                    },
                  }}
                  {...register("Participant", {
                    required: true,
                  })}
                  error={
                    (touchedFields?.Participant && !dirtyFields?.Participant) ||
                      errors.Participant
                      ? true
                      : false
                  }
                  id="input-with-sx"
                  label="Add Participant"
                  variant="standard"
                  onChange={(e)=>setParticipant(e.target.value)}
                  fullWidth
                /> */}
              {/* </Box>
            </Box>
            <Box className="flexContainer">
              <Box
                sx={{ display: "flex", alignItems: "flex-end" }}
                className="mtb-20"
              >
                <EventIcon
                  sx={{
                    color:
                      errors?.Datetime ||
                      (touchedFields?.Datetime && !dirtyFields?.Datetime)
                        ? "red"
                        : " #088b89",
                    mr: 1,
                    my: 0.5,
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      sx={{
                        overflow: "hidden",
                        width: 270,
                        "& .MuiFormLabel-root.Mui-focused": {
                          color:
                            (touchedFields?.fwe && !dirtyFields?.fed) ||
                            errors?.efwe
                              ? "red"
                              : " #088b89",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor:
                            (touchedFields?.Datetime &&
                              !dirtyFields?.Datetime) ||
                            errors?.Datetime
                              ? "red"
                              : " #088b89",
                        },
                      }}
                      error={
                        (touchedFields?.Datetime && !dirtyFields?.Datetime) ||
                        errors.Datetime
                          ? true
                          : false
                      }
                      slotProps={{
                        textField: { variant: "standard", required: true },
                      }}
                      label="Start date"
                      onChange={setStart}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "flex-end" }}
                className="mtb-20"
              >
                <AccessTimeIcon
                  sx={{
                    color:
                      errors?.Datetime ||
                      (touchedFields?.Datetime && !dirtyFields?.Datetime)
                        ? "red"
                        : " #088b89",
                    mr: 1,
                    my: 0.5,
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      sx={{
                        overflow: "hidden",
                        width: 270,
                        "& .MuiFormLabel-root.Mui-focused": {
                          color:
                            (touchedFields?.Datetime &&
                              !dirtyFields?.Datetime) ||
                            errors?.Datetime
                              ? "red"
                              : " #088b89",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor:
                            (touchedFields?.Datetime &&
                              !dirtyFields?.Datetime) ||
                            errors?.Datetime
                              ? "red"
                              : " #088b89",
                        },
                      }}
                      slotProps={{
                        textField: { variant: "standard", required: true },
                      }}
                      label="End date"
                      onChange={setEnd}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </Box>

            <Box */}
               {/* className="mtb-20" */}
              {/* sx={{ display: "flex", alignItems: "flex-end", marginTop: 4 }}
            >
              <ForumIcon
                sx={{
                  color:
                    errors?.Description ||
                    (touchedFields?.Description && !dirtyFields?.Description)
                      ? "red"
                      : " #088b89",
                  mr: 1,
                  my: 0.5,
                  marginBottom: 9,
                }}
              />
              <Box>
                <div className="modelContainer">
                  <div className="modelButtonContainer">
                    <div>
                      <TextField
                        inputProps={{
                          style: { borderColor: "yellow !important" },
                        }}
                        sx={{
                          width: 630,
                          "& .MuiFormLabel-root.Mui-focused": {
                            color:
                              (touchedFields?.Description &&
                                !dirtyFields?.Description) ||
                              errors?.Description
                                ? "red"
                                : " #088b89",
                          },
                          "& .MuiOutlinedInput-root.Mui-focused": {
                            "& > fieldset": {
                              borderColor:
                                (touchedFields?.Description &&
                                  !dirtyFields?.Description) ||
                                errors?.Description
                                  ? "red"
                                  : " #088b89",
                            },
                          },
                        }}
                        {...register("Description", {
                          required: true,
                        })}
                        error={
                          (touchedFields?.Description &&
                            !dirtyFields?.Description) ||
                          errors.Description
                            ? true
                            : false
                        }
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={3}
                        onChange={(e) => setEventDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <CustomizedButton  color="inherit" className="cancelButton" buttonName="Cancel"/>
              <CustomizedButton  color="inherit" className="createCardButton" buttonName="Save" type="submit"/>
  
            </Box>
          </Box>
        </form>
         :
         (
                   <Button onClick={() => handleSignin()}>Sign in with Google</Button>
                )
        }
      </Grid> */}
    </Usersidenavbar>
  );
};
export default CreateEventForm;