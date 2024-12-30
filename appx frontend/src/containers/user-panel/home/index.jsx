import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Attendinterview from "../../../assets/attend.png";
import Conductinterview from "../../../assets/conduct.png";
import CustomizedButton from "../../../components/button";
import Usersidenavbar from "../../../userSidenavbar";
import "./style.css";

const Home = (props) => {
  const [declinebox, setDeclineBox] = useState(false);
  const navigate = useNavigate();
  const declineReason = () => {
    setDeclineBox(true);
  };
  const handleDeclineBox = () => {
    setDeclineBox(false);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log("data", data);
    setDeclineBox(false);
    reset();
  };

  const style = {
    display:"flex",
    justifyContent:"center",
    width:"100%",
   height:"100vh",
   alignItems:"center",
   
  };
  const details=JSON.parse(localStorage.getItem("sb-kbxtmrhsacflpbubrfsz-auth-token"));
  console.log("details",details);
  return (
    <Usersidenavbar logoff={props}>
    
      {!declinebox ? (
        <Box className="interviewcardisplay">
          <Box className="flip-card">
            <Box className="interviewCardTitle">Attend Interview</Box>
            <Box className="flip-card-inner">
              <Box className="flip-card-front">
                <img
                  src={Attendinterview}
                  alt="Avatar"
                  className="InterviewImg"
                />
              </Box>
              <Box className="flip-card-back">
                <Box className="interviewcardheader">Interview details</Box>
                <Box className="attendInterviewcontent">
                  Your Interview scheduled @7.30pm
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                    marginTop: "30px",
                  }}
                >
                  <CustomizedButton color="inherit" className="addemployeeButton" onClick={declineReason} buttonName="Decline" />
                  <CustomizedButton color="inherit" className="addemployeeButton" buttonName="Attend" type="submit"/>
                </Box>
                <Box className="attendInterviewfooter">All the Best!!!</Box>
              </Box>
            </Box>
          </Box>

          <Box className="flip-card">
            <Box className="interviewCardTitle">Conduct Interview</Box>
            <Box className="flip-card-inner">
              <Box className="flip-card-front">
                <img
                  src={Conductinterview}
                  alt="Avatar"
                  className="InterviewImg"
                />
              </Box>
              <Box className="flip-card-back">
                <Box className="interviewcardheader">Interview details</Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
              <CustomizedButton color="inherit" className="addemployeeButton" onClick={() => navigate("/user/createinterviewForm")} buttonName="Create" type="submit"/>
              <CustomizedButton color="inherit" className="addemployeeButton" onClick={() => navigate('/user/userevent')} buttonName="View" type="submit"/>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (

        <Box sx={style}>
          <Box sx={{ padding: "20px 40px", boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;" }}>
            <div className="cancelModel">
              <HighlightOffIcon
                style={{ color: "#e55a5a" }}
                onClick={handleDeclineBox}
              />
            </div>
            <div className="modelContainer">
              <div>Reason for Decline</div>

              <div className="modelButtonContainer">
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                      // inputProps={{ style: { borderColor: "yellow !important" } }}
                      sx={{
                        "& .MuiFormLabel-root.Mui-focused": {
                          color:
                            (touchedFields?.reason && !dirtyFields?.reason) ||
                              errors?.reason
                              ? "red"
                              : " #088b89",
                        },
                        "& .MuiOutlinedInput-root.Mui-focused": {
                          "& > fieldset": {
                            borderColor:
                              (touchedFields?.reason && !dirtyFields?.reason) ||
                                errors?.reason
                                ? "red"
                                : " #088b89",
                          },
                        },
                      }}
                      {...register("reason", {
                        required: true,
                      })}
                      error={
                        (touchedFields?.reason && !dirtyFields?.reason) ||
                          errors.reason
                          ? true
                          : false
                      }
                      id="outlined-multiline-static"
                      label="Reason"
                      multiline
                      rows={4}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        gap: "20px",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <CustomizedButton color="inherit" className="cancelButton" onClick={handleDeclineBox} buttonName="Cancel"/>
                      <CustomizedButton color="inherit" className="addemployeeButton"  buttonName="Submit" type="submit"/>
                    </Box>
                  </form>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      )}
    </Usersidenavbar>
  );
};
export default Home;
