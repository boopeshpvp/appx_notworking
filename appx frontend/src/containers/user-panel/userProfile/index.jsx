import AccountCircle from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EmailIcon from "@mui/icons-material/Email";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import HomeIcon from "@mui/icons-material/Home";
import HouseIcon from "@mui/icons-material/House";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import LockIcon from "@mui/icons-material/Lock";
import PinIcon from "@mui/icons-material/Pin";
import SendIcon from "@mui/icons-material/Send";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import WorkIcon from '@mui/icons-material/Work';
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Rating, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Tab from "@mui/material/Tab";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import profile from "../../../assets/cover-picture.jpg";
import CustomizedButton from "../../../components/button";
import FieldWithIcon from "../../../components/textFeild";
import Usersidenavbar from "../../../userSidenavbar";
import "./style.css";


function TableRows({ rows, tableRowRemove, onValUpdate }) {
  return rows.map((rowsData, index) => {
    const { projectname, mainstack, startdate, enddate, incharge } = rowsData;
    return (
      <tr key={index}>
        <td>
          <input
            type="text"
            value={projectname}
            onChange={(event) => onValUpdate(index, event)}
            name="projectname"
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            value={mainstack}
            onChange={(event) => onValUpdate(index, event)}
            name="mainstack"
            className="form-control"
          />
        </td>
        <td>
          <input
            type="text"
            value={incharge}
            onChange={(event) => onValUpdate(index, event)}
            name="incharge"
            className="form-control"
          />
        </td>
        <td style={{ width: "14%", padding: "0px 0.5rem" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                format="MM / YYYY"
                sx={{ overflow: "hidden" }}
                views={["month", "year"]}
                slotProps={{ textField: { variant: "standard" } }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </td>
        <td style={{ width: "14%", padding: "0px 0.5rem" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                format="MM / YYYY"
                sx={{ overflow: "hidden" }}
                views={["month", "year"]}
                slotProps={{ textField: { variant: "standard" } }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </td>

        <td onClick={() => tableRowRemove(index)}>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Box>
              <DeleteOutlineIcon
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              />
            </Box>
            <Box>
              <BorderColorIcon
                style={{ color: "#088b89", width: "20px", height: "20px" }}
              />
            </Box>
          </Box>
        </td>
      </tr>
    );
  });
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 10,
  borderRadius: 2,
};

const UserProfile = (props) => {
  const interviewDetailsData = [
    {
      sNo: "1",
      date: "29.08.2023",
      startTime: "3.00 pm",
      endTime: "4.00 pm",
      hostedBy: "Ganapathy",
      attendedBy: "Boopesh",
      status: "Attended",
      comments: "Good effort",
      rating: <Rating name="disabled" value={3} readOnly />,
      driveLink: <CustomizedButton className="addLinkButton" variant="outlined" icon={<InsertLinkIcon />} buttonName="Add" type="submit" />
    },
    {
      sNo: "2",
      date: "29.08.2023",
      startTime: "3.00 pm",
      endTime: "4.00 pm",
      hostedBy: "Ganapathy",
      attendedBy: "Boopesh",
      status: "Attended",
      comments: "Good effort",
      rating: <Rating name="disabled" value={3} readOnly />,
      driveLink: <CustomizedButton className="addLinkButton" variant="outlined" icon={<InsertLinkIcon />} buttonName="Add" type="submit" />
    },
    {
      sNo: "3",
      date: "29.08.2023",
      startTime: "3.00 pm",
      endTime: "4.00 pm",
      hostedBy: "Ganapathy",
      attendedBy: "Boopesh",
      status: "Attended",
      comments: "Good effort",
      rating: <Rating name="disabled" value={3} readOnly />,
      driveLink: <CustomizedButton className="addLinkButton" variant="outlined" icon={<InsertLinkIcon />} buttonName="Add" type="submit" />
    }
  ]

  const [showOldPassword, setshowOldPassword] = useState(false);
  const [isLinkReceived, setIsLinkReceived] = useState(false);
  const [interviewDetailState, setInterviewDetailState] = useState(interviewDetailsData)
  const [isLinkOpen, setIsLinkOpen] = useState(false)
  const [selectIndex, setSelectIndex] = useState(0)
  const [showNewPassword, setshowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickshowNewPassword = () => setshowNewPassword((show) => !show);
  const handleClickshowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleClickshowOldPassword = () => setshowOldPassword((show) => !show);
  const [addlink, setAddlink] = useState("");
  const [modal, setModal] = useState(false);
  const [rows, initRow] = useState([]);
  const [readMore,setReadMore]=useState(false);

  const addRowTable = () => {
    const data = {
      projectname: "",
      mainstack: "",
      startdate: "",
      enddate: "",
      incharge: "",
    };
    initRow([...rows, data]);
  };
  const tableRowRemove = (index) => {
    const dataRow = [...rows];
    dataRow.splice(index, 1);
    initRow(dataRow);
  };
  const onValUpdate = (i, event) => {
    const { name, value } = event.target;
    const data = [...rows];
    data[i][name] = value;
    initRow(data);
  };

  const handleClose = () => {
    setModal(false);
  };
  const [value, setValue] = React.useState("1");

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm({
    mode: "onChange",
  });
  const {
    register: register2,
    formState: {
      errors: errors2,
      touchedFields: touchedFields2,
      dirtyFields: dirtyFields2,
    },
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onChange",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onSubmit = (data) => {
    console.log("data", data);
  };
  const linkSubmit = (data) => {
    console.log("data", data);
    // setAddlink(data.drivelink);
    console.log("linkSubmit", addlink);
    handleClose()
  };

  const handleAddLink = (index) => {
    setModal(true)
    setSelectIndex(index)
    setAddlink("")
  }
  const handleLinkButton = () => {
    setModal(false)
    console.log("Hai");
  }
  const handleReceiveLink = () => {
    let added = interviewDetailState.map((item, index) => {
      console.log("AddLink", addlink)
      if (index === selectIndex) {
        setIsLinkReceived(!isLinkReceived)
        setIsLinkOpen(!isLinkOpen)
        return {
          ...item,
          driveLink: <Link to={addlink} className="linkButton" target="_blank">Link</Link>
        }
      }
      return item

    })
    setInterviewDetailState(added)
  }
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#088b89",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  console.log("isLinkOpen,", isLinkOpen);
  
  return (
    <Usersidenavbar logoff={props}>
      <Grid container sx={{ marginTop: 10 }}>
        <Grid xs={3}>
          <Box className="imageProfile">
            <Box>
              <Box
                sx={{
                  border: "1px solid black",
                  padding: "10px 50px",
                  backgroundColor: "lightgrey",
                }}
              >
                <img src={profile} alt="noimage" className="profileImg" />
              </Box>
              <Grid xs={1}>
                <Box sx={{ fontWeight: 600 }} className="mtb-30">
                  <Box
                    className="mtb-10"
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 1,
                      maxWidth: "100%",
                    }}
                  >
                    <AccountCircle style={{ color: "#088b89" }} /> <Box> Manikandan</Box>
                  </Box>
                </Box>
              </Grid>
              <Box sx={{ fontWeight: 600 }} className="mtb-30">
                <Box
                  className="mtb-10"
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                    maxWidth: "100%",
                  }}
                >
                  <WorkIcon style={{ color: "#088b89" }} />  Full stack Developer
                </Box>
              </Box>
              <Box sx={{ fontWeight: 600 }} className="mtb-30">
                <Box
                  className="mtb-10"
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                    maxWidth: "100%",
                  }}
                >
                  <InsertInvitationIcon style={{ color: "#088b89" }} />  joined on May 10,2022
                </Box>
              </Box>
              <Box sx={{ fontWeight: 600 }} className="mtb-30">
                <Box
                  className="mtb-10"
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                    maxWidth: "100%",
                  }}
                >
                  <LocationOnIcon style={{ color: "#088b89" }} />  Coimbatore
                </Box>
              </Box>
              <Box sx={{ fontWeight: 600 }} className="mtb-30">
                <Box
                  className="mtb-10"
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                    maxWidth: "100%",
                  }}
                >
                  <ContactPhoneIcon style={{ color: "#088b89" }} /> +91 9893542745
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CustomizedButton className="createCardButton" buttonName="Edit profile" type="submit" />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid xs={9}>
          <Box className="mtb-20">
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TabList onChange={handleChange}>
                  <Tab className="profileValue" label="Bio Data" value="1" />
                  <Tab
                    className="profileValue"
                    label="Project Details"
                    value="2"
                  />
                  <Tab
                    className="profileValue"
                    label="Interview Details"
                    value="3"
                  />
                  <Tab
                    className="profileValue"
                    label="Change Password"
                    value="4"
                  />
                </TabList>
              </Box>

              <TabPanel value="1">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container xs={12}>
                    <Grid xs={4} className="feild">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <AccountCircle
                          sx={{
                            color:
                              errors?.FirstName ||
                              (touchedFields?.FirstName &&
                                !dirtyFields?.FirstName)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                          }}
                        />
                        <TextField
                          sx={{
                            "& .MuiFormLabel-root.Mui-focused": {
                              color:
                                (touchedFields?.FirstName &&
                                  !dirtyFields?.FirstName) ||
                                errors?.FirstName
                                  ? "red"
                                  : " #088b89",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor:
                                (touchedFields?.FirstName &&
                                  !dirtyFields?.FirstName) ||
                                errors?.FirstName
                                  ? "red"
                                  : " #088b89",
                            },
                          }}
                          // defaultValue={emailfeild}
                          {...register("FirstName", {
                            required: true,
                          })}
                          error={
                            (touchedFields?.FirstName &&
                              !dirtyFields?.FirstName) ||
                            errors.FirstName
                              ? true
                              : false
                          }
                          id="standard-required"
                          label="First Name"
                          variant="standard"
                        />
                      </Box>
                    </Grid>
                    <Grid xs={4} className="feild">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <AccountCircle
                          sx={{
                            color:
                              errors?.LastName ||
                              (touchedFields?.LastName &&
                                !dirtyFields?.LastName)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                          }}
                        />
                        <TextField
                          sx={{
                            // width:420,
                            "& .MuiFormLabel-root.Mui-focused": {
                              color:
                                (touchedFields?.LastName &&
                                  !dirtyFields?.LastName) ||
                                errors?.LastName
                                  ? "red"
                                  : " #088b89",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor:
                                (touchedFields?.LastName &&
                                  !dirtyFields?.LastName) ||
                                errors?.LastName
                                  ? "red"
                                  : " #088b89",
                            },
                          }}
                          // defaultValue={emailfeild}
                          {...register("LastName", {
                            required: true,
                          })}
                          error={
                            (touchedFields?.LastName &&
                              !dirtyFields?.LastName) ||
                            errors.LastName
                              ? true
                              : false
                          }
                          id="standard-password-input"
                          label="Last Name"
                          type="text"
                          autoComplete="current-password"
                          variant="standard"
                        />
                      </Box>
                    </Grid>
                    <Grid xs={4} className="feild">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <BadgeIcon
                          sx={{
                            color:
                              errors?.EmpId ||
                              (touchedFields?.EmpId && !dirtyFields?.EmpId)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                          }}
                        />
                        <TextField
                          sx={{
                            // width:420,
                            "& .MuiFormLabel-root.Mui-focused": {
                              color:
                                (touchedFields?.EmpId && !dirtyFields?.EmpId) ||
                                errors?.EmpId
                                  ? "red"
                                  : " #088b89",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor:
                                (touchedFields?.EmpId && !dirtyFields?.EmpId) ||
                                errors?.EmpId
                                  ? "red"
                                  : " #088b89",
                            },
                          }}
                          // defaultValue={emailfeild}
                          {...register("EmpId", {
                            required: true,
                          })}
                          error={
                            (touchedFields?.EmpId && !dirtyFields?.EmpId) ||
                            errors.EmpId
                              ? true
                              : false
                          }
                          id="standard-password-input"
                          label="Emp ID"
                          type="text"
                          autoComplete="current-password"
                          variant="standard"
                        />
                      </Box>
                    </Grid>
                    <Grid xs={4} className="feild">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <EmailIcon
                          sx={{
                            color:
                              errors?.Email ||
                              (touchedFields?.Email && !dirtyFields?.Email)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                          }}
                        />
                        <TextField
                          sx={{
                            marginTop: 5,
                            "& .MuiFormLabel-root.Mui-focused": {
                              color:
                                (touchedFields?.Email && !dirtyFields?.Email) ||
                                errors?.Email
                                  ? "red"
                                  : " #088b89",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor:
                                (touchedFields?.Email && !dirtyFields?.Email) ||
                                errors?.Email
                                  ? "red"
                                  : " #088b89",
                            },
                          }}
                          // defaultValue={emailfeild}
                          {...register("Email", {
                            required: true,
                            pattern: /^[a-zA-Z0-9._%+-]+@mitrahsoft\.com$/,
                          })}
                          error={
                            (touchedFields?.Email && !dirtyFields?.Email) ||
                            errors.Email
                              ? true
                              : false
                          }
                          id="standard-read-only-input"
                          label="Email Address"
                          variant="standard"
                        />
                      </Box>
                    </Grid>
                    <Grid xs={4} className="feild">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <LockIcon
                          sx={{
                            color:
                              errors?.Password ||
                              (touchedFields?.Password &&
                                !dirtyFields?.Password)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                          }}
                        />
                        <TextField
                          sx={{
                            // width: 420,
                            marginTop: 5,
                            "& .MuiFormLabel-root.Mui-focused": {
                              color:
                                (touchedFields?.Password &&
                                  !dirtyFields?.Password) ||
                                errors?.Password
                                  ? "red"
                                  : " #088b89",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor:
                                (touchedFields?.Password &&
                                  !dirtyFields?.Password) ||
                                errors?.Password
                                  ? "red"
                                  : " #088b89",
                            },
                          }}
                          // defaultValue={emailfeild}
                          {...register("Password", {
                            required: true,
                          })}
                          error={
                            (touchedFields?.Password &&
                              !dirtyFields?.Password) ||
                            errors.Password
                              ? true
                              : false
                          }
                          id="standard-number"
                          label="Password"
                          type="Password"
                          variant="standard"
                        />
                      </Box>
                    </Grid>
                    <Grid xs={4}  sx={{ margin: '4px 0px 0 -15px',display: "flex", justifyContent: "flex-end" }}>
                      <Box  sx={{ display: "flex", alignItems: "flex-end" }}>
                        <InsertInvitationIcon
                          sx={{
                            color:
                              errors?.date ||
                              (touchedFields?.date && !dirtyFields?.date)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                          }}
                        />  
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              label="Joined Date"
                              sx={{
                                width:"80%",
                                overflow: "hidden",
                                "& .MuiFormLabel-root.Mui-focused": {
                                  color:
                                    (touchedFields?.date &&
                                      !dirtyFields?.date) ||
                                    errors?.date
                                      ? "red"
                                      : " #088b89",
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottomColor:
                                    (touchedFields?.date &&
                                      !dirtyFields?.date) ||
                                    errors?.date
                                      ? "red"
                                      : " #088b89",
                                },
                              }}
                              slotProps={{
                                textField: {
                                  variant: "standard",
                                  required: true,
                                },
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      
                      </Box>
                  
                    </Grid>
                    <Grid xs={4} className="feild">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <LocationSearchingIcon
                          sx={{
                            color:
                              errors?.Branch ||
                              (touchedFields?.Branch && !dirtyFields?.Branch)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                          }}
                        />
                        <TextField
                          sx={{
                            // width: 420,
                            marginTop: 5,
                            "& .MuiFormLabel-root.Mui-focused": {
                              color:
                                (touchedFields?.Branch &&
                                  !dirtyFields?.Branch) ||
                                errors?.Branch
                                  ? "red"
                                  : " #088b89",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor:
                                (touchedFields?.Branch &&
                                  !dirtyFields?.Branch) ||
                                errors?.Branch
                                  ? "red"
                                  : " #088b89",
                            },
                          }}
                          // defaultValue={emailfeild}
                          {...register("Branch", {
                            required: true,
                          })}
                          error={
                            (touchedFields?.Branch && !dirtyFields?.Branch) ||
                            errors.Branch
                              ? true
                              : false
                          }
                          id="standard-number"
                          label="Branch"
                          type="text"
                          variant="standard"
                        />
                      </Box>
                    </Grid>

                    <Grid xs={4} className="feild">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <SummarizeIcon
                          sx={{
                            color:
                              errors?.Report ||
                              (touchedFields?.Report && !dirtyFields?.Report)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                          }}
                        />
                        <TextField
                          sx={{
                            // width: 420,
                            marginTop: 5,
                            "& .MuiFormLabel-root.Mui-focused": {
                              color:
                                (touchedFields?.Report &&
                                  !dirtyFields?.Report) ||
                                errors?.Report
                                  ? "red"
                                  : " #088b89",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor:
                                (touchedFields?.Report &&
                                  !dirtyFields?.Report) ||
                                errors?.Report
                                  ? "red"
                                  : " #088b89",
                            },
                          }}
                          // defaultValue={emailfeild}
                          {...register("Report", {
                            required: true,
                          })}
                          error={
                            (touchedFields?.Report && !dirtyFields?.Report) ||
                            errors.Report
                              ? true
                              : false
                          }
                          id="standard-number"
                          label="Reporting To"
                          type="text"
                          variant="standard"
                        />
                      </Box>
                    </Grid>
                    <Grid xs={4} className="feild">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <BookmarksIcon
                          sx={{
                            color:
                              errors?.Stack ||
                              (touchedFields?.Stack && !dirtyFields?.Stack)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                          }}
                        />
                        <TextField
                          sx={{
                            // width: 420,
                            marginTop: 5,
                            "& .MuiFormLabel-root.Mui-focused": {
                              color:
                                (touchedFields?.Stack && !dirtyFields?.Stack) ||
                                errors?.Stack
                                  ? "red"
                                  : " #088b89",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor:
                                (touchedFields?.Stack && !dirtyFields?.Stack) ||
                                errors?.Stack
                                  ? "red"
                                  : " #088b89",
                            },
                          }}
                          // defaultValue={emailfeild}
                          {...register("Stack", {
                            required: true,
                          })}
                          error={
                            (touchedFields?.Stack && !dirtyFields?.Stack) ||
                            errors.Stack
                              ? true
                              : false
                          }
                          id="standard-number"
                          label="Main Stack"
                          type="text"
                          variant="standard"
                        />
                      </Box>
                    </Grid>
                    <Grid xs={4} className="feild">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <ContactPhoneIcon
                          sx={{
                            color:
                              errors?.contactNumber ||
                              (touchedFields?.contactNumber &&
                                !dirtyFields?.contactNumber)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                          }}
                        />
                        <TextField
                          sx={{
                            // width: 420,
                            marginTop: 5,
                            "& .MuiFormLabel-root.Mui-focused": {
                              color:
                                (touchedFields?.contactNumber &&
                                  !dirtyFields?.contactNumber) ||
                                errors?.contactNumber
                                  ? "red"
                                  : " #088b89",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor:
                                (touchedFields?.contactNumber &&
                                  !dirtyFields?.contactNumber) ||
                                errors?.contactNumber
                                  ? "red"
                                  : " #088b89",
                            },
                          }}
                          // defaultValue={emailfeild}
                          {...register("contactNumber", {
                            required: true,
                          })}
                          error={
                            (touchedFields?.contactNumber &&
                              !dirtyFields?.contactNumber) ||
                            errors.contactNumber
                              ? true
                              : false
                          }
                          id="standard-number"
                          label="Contact Number"
                          type="text"
                          variant="standard"
                        />
                      </Box>
                    </Grid>
                    <Grid xs={4} className="feild">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <ContactEmergencyIcon
                          sx={{
                            color:
                              errors?.EmergencyPerson ||
                              (touchedFields?.EmergencyPerson &&
                                !dirtyFields?.EmergencyPerson)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                          }}
                        />
                        <TextField
                          sx={{
                            // width: 420,
                            marginTop: 5,
                            "& .MuiFormLabel-root.Mui-focused": {
                              color:
                                (touchedFields?.EmergencyPerson &&
                                  !dirtyFields?.EmergencyPerson) ||
                                errors?.EmergencyPerson
                                  ? "red"
                                  : " #088b89",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor:
                                (touchedFields?.EmergencyPerson &&
                                  !dirtyFields?.EmergencyPerson) ||
                                errors?.EmergencyPerson
                                  ? "red"
                                  : " #088b89",
                            },
                          }}
                          // defaultValue={emailfeild}
                          {...register("EmergencyPerson", {
                            required: true,
                          })}
                          error={
                            (touchedFields?.EmergencyPerson &&
                              !dirtyFields?.EmergencyPerson) ||
                            errors.EmergencyPerson
                              ? true
                              : false
                          }
                          id="standard-number"
                          label="Emergency Person"
                          type="text"
                          variant="standard"
                        />
                      </Box>
                    </Grid>
                    <Grid xs={4} className="feild">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <ContactPhoneIcon
                          sx={{
                            color:
                              errors?.EmergencyNumber ||
                              (touchedFields?.EmergencyNumber &&
                                !dirtyFields?.EmergencyNumber)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                          }}
                        />
                        <TextField
                          sx={{
                            // width: 420,
                            marginTop: 5,
                            "& .MuiFormLabel-root.Mui-focused": {
                              color:
                                (touchedFields?.EmergencyNumber &&
                                  !dirtyFields?.EmergencyNumber) ||
                                errors?.EmergencyNumber
                                  ? "red"
                                  : " #088b89",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor:
                                (touchedFields?.EmergencyNumber &&
                                  !dirtyFields?.EmergencyNumber) ||
                                errors?.EmergencyNumber
                                  ? "red"
                                  : " #088b89",
                            },
                          }}
                          // defaultValue={emailfeild}
                          {...register("EmergencyNumber", {
                            required: true,
                          })}
                          error={
                            (touchedFields?.EmergencyNumber &&
                              !dirtyFields?.EmergencyNumber) ||
                            errors.EmergencyNumber
                              ? true
                              : false
                          }
                          id="standard-number"
                          label="Emergency Number"
                          type="text"
                          variant="standard"
                        />
                      </Box>
                    </Grid>

                    <Grid xs={4} className="feild">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <LocationCityIcon
                          sx={{
                            color:
                              errors?.city ||
                              (touchedFields?.city && !dirtyFields?.city)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                          }}
                        />
                        <TextField
                          sx={{
                            // width: 420,
                            marginTop: 5,
                            "& .MuiFormLabel-root.Mui-focused": {
                              color:
                                (touchedFields?.city && !dirtyFields?.city) ||
                                errors?.city
                                  ? "red"
                                  : " #088b89",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor:
                                (touchedFields?.city && !dirtyFields?.city) ||
                                errors?.city
                                  ? "red"
                                  : " #088b89",
                            },
                          }}
                          // defaultValue={emailfeild}
                          {...register("city", {
                            required: true,
                          })}
                          error={
                            (touchedFields?.city && !dirtyFields?.city) ||
                            errors.city
                              ? true
                              : false
                          }
                          id="standard-number"
                          label="City"
                          type="text"
                          variant="standard"
                        />
                      </Box>
                    </Grid>
                    <Grid xs={4} className="feild">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <HouseIcon
                          sx={{
                            color:
                              errors?.state ||
                              (touchedFields?.state && !dirtyFields?.state)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                          }}
                        />
                        <TextField
                          sx={{
                            // width: 420,
                            marginTop: 5,
                            "& .MuiFormLabel-root.Mui-focused": {
                              color:
                                (touchedFields?.state && !dirtyFields?.state) ||
                                errors?.state
                                  ? "red"
                                  : " #088b89",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor:
                                (touchedFields?.state && !dirtyFields?.state) ||
                                errors?.state
                                  ? "red"
                                  : " #088b89",
                            },
                          }}
                          // defaultValue={emailfeild}
                          {...register("state", {
                            required: true,
                          })}
                          error={
                            (touchedFields?.state && !dirtyFields?.state) ||
                            errors.state
                              ? true
                              : false
                          }
                          id="standard-number"
                          label="State"
                          type="text"
                          variant="standard"
                        />
                      </Box>
                    </Grid>
                    <Grid xs={4} className="feild">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <PinIcon
                          sx={{
                            color:
                              errors?.pincode ||
                              (touchedFields?.pincode && !dirtyFields?.pincode)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                          }}
                        />
                        <TextField
                          sx={{
                            // width: 420,
                            marginTop: 5,
                            "& .MuiFormLabel-root.Mui-focused": {
                              color:
                                (touchedFields?.pincode &&
                                  !dirtyFields?.pincode) ||
                                errors?.pincode
                                  ? "red"
                                  : " #088b89",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor:
                                (touchedFields?.pincode &&
                                  !dirtyFields?.pincode) ||
                                errors?.pincode
                                  ? "red"
                                  : " #088b89",
                            },
                          }}
                          // defaultValue={emailfeild}
                          {...register("pincode", {
                            required: true,
                          })}
                          error={
                            (touchedFields?.pincode && !dirtyFields?.pincode) ||
                            errors.pincode
                              ? true
                              : false
                          }
                          id="standard-number"
                          label="Pincode"
                          type="text"
                          variant="standard"
                        />
                      </Box>
                    </Grid>
                    <Grid xs={12} className="feild">
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <HomeIcon
                          sx={{
                            color:
                              errors?.reason ||
                              (touchedFields?.reason && !dirtyFields?.reason)
                                ? "red"
                                : " #088b89",
                            mr: 1,
                            my: 0.5,
                            marginBottom: 12,
                          }}
                        />
                        <TextField
                          sx={{
                            marginTop: 3,
                            width: 970,
                            "& .MuiFormLabel-root.Mui-focused": {
                              color:
                                (touchedFields?.reason &&
                                  !dirtyFields?.reason) ||
                                errors?.reason
                                  ? "red"
                                  : " #088b89",
                            },
                            "& .MuiOutlinedInput-root.Mui-focused": {
                              "& > fieldset": {
                                borderColor:
                                  (touchedFields?.reason &&
                                    !dirtyFields?.reason) ||
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
                          label="Address"
                          multiline
                          rows={4}
                        />
                      </Box>
                    </Grid>
                    <Grid xs={11} sx={{ marginTop: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "20px",
                          float: "right",
                        }}
                      >
                        <Button
                          className="createCardButton"
                          // onClick={cancelInterview}
                        >
                          Cancel
                        </Button>

                        <Button type="submit" className="createCardButton">
                          Save
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </TabPanel>
              <TabPanel value="2">
                <Box
                  sx={{ textAlign: "center", fontSize: 25, fontWeight: 600 }}
                >
                  Add Project or Delete Project
                </Box>
                <Box sx={{ marginTop: 3 }}>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th style={{ width: "32%", textAlign: "center" }}>
                          Project Name
                        </th>
                        <th style={{ width: "16%", textAlign: "center" }}>
                          Main Stack
                        </th>
                        <th style={{ width: "16%", textAlign: "center" }}>
                          {" "}
                          Incharge
                        </th>
                        <th style={{ textAlign: "center" }}>Start Date</th>
                        <th style={{ textAlign: "center" }}>End Date</th>

                        <th
                          style={{ textAlign: "center" }}
                          onClick={addRowTable}
                        >
                          <ControlPointIcon style={{ color: "#088b89" }} />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <TableRows
                        rows={rows}
                        tableRowRemove={tableRowRemove}
                        onValUpdate={onValUpdate}
                      />
                    </tbody>
                  </table>
                </Box>
              </TabPanel>
              <TabPanel value="3">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 1000, border: "none" }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">S.No</StyledTableCell>
                        <StyledTableCell align="center">Date</StyledTableCell>
                        <StyledTableCell align="center">Start Time</StyledTableCell>
                        <StyledTableCell align="center">End Time</StyledTableCell>
                        <StyledTableCell align="center">Hosted by</StyledTableCell>
                        <StyledTableCell align="center">Attended by</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Comments</StyledTableCell>
                        <StyledTableCell align="center">Rating</StyledTableCell>
                        <StyledTableCell align="center">Drive link</StyledTableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {interviewDetailState.map((row, index) => (
                        <StyledTableRow key={row.sNo}>
                          <StyledTableCell align="center" >{row.sNo}</StyledTableCell>
                          <StyledTableCell align="center" >{row.date}</StyledTableCell>
                          <StyledTableCell align="center">{row.startTime}</StyledTableCell>
                          <StyledTableCell align="center">{row.endTime}</StyledTableCell>
                          <StyledTableCell align="center">{row.hostedBy}</StyledTableCell>
                          <StyledTableCell align="center">{row.attendedBy}</StyledTableCell>
                          <StyledTableCell align="center">{row.status}</StyledTableCell>
                          <StyledTableCell align="center">{row.comments}</StyledTableCell>
                          <StyledTableCell align="center">{row.rating}</StyledTableCell>
                          <StyledTableCell align="center" onClick={() =>handleAddLink(index)}>{row.driveLink}</StyledTableCell>
                        </StyledTableRow>
                      ))}

                    </TableBody>
                  </Table>
                </TableContainer>
                {modal && (
                  <Box sx={style}>
                    <span className="modelContainer">Add Link</span>
                    <HighlightOffIcon className="cancelModel" onClick={handleClose} />
                    <Box className="modelButtonContainer">
                      <form onSubmit={handleSubmit2(linkSubmit)}>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                          <FieldWithIcon
                            icon="InsertLinkIcon"
                            label="Add Drive Link"
                            type="url"
                            name="drivelink"
                            value={addlink}
                            onChange={(event) => {
                              setAddlink(event.target.value)
                            }}
                            touchedFields={touchedFields2}
                            dirtyFields={dirtyFields2}
                            errors={errors2}
                            register={register2}
                            required={true}
                            width={270}
                            variant="standard"
                          />
                          <Button type="submit"><SendIcon style={{ color: "#088b89" }} onClick={() => handleReceiveLink()} /></Button>
                        </Box>
                      </form>
                    </Box>
                  </Box>

                )}
              </TabPanel>
              <TabPanel value="4">
                <Grid className="changepasswordContainer">
                  <Grid container>
                    <Grid xs={10} justifyContent={"center"}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Box className="textfieldContainer">
                          <Box
                            className="mtb-10 p-20"
                            sx={{
                              width: 450,
                              display: "flex",
                              alignItems: "flex-end",
                              maxWidth: "100%",
                            }}
                          >
                          </Box>
                          <Box
                            className="mtb-10 p-20"
                            sx={{
                              display: "flex",
                              alignItems: "flex-end",
                              maxWidth: "100%",
                            }}
                          >
                            <LockIcon
                              sx={{
                                color:
                                  errors?.password ||
                                    (touchedFields?.password && !dirtyFields?.password)
                                    ? "red"
                                    : " #088b89",
                                mr: 1,
                                my: 0.5,
                              }}
                            />
                            <TextField
                              sx={{
                                "& .MuiFormLabel-root.Mui-focused": {
                                  color:
                                    (touchedFields?.password && !dirtyFields?.password) ||
                                      errors?.password
                                      ? "red"
                                      : " #088b89",
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottomColor:
                                    (touchedFields?.password && !dirtyFields?.password) ||
                                      errors?.password
                                      ? "red"
                                      : " #088b89",
                                },
                              }}
                              {...register("password", {
                                required: true,
                                pattern:
                                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?^()_={}'":;+-/><.,|`~])[A-Za-z\d#$@!%&*?^()_={}'":;+-/><.,|`~]{8,30}$/,
                                validate: (value, formValues) =>
                                  value !== localStorage.getItem("password"),
                              })}
                              error={
                                (touchedFields.password && !dirtyFields?.password) ||
                                  errors?.password
                                  ? true
                                  : false
                              }
                              type={showNewPassword ? "text" : "password"}
                              id="fullwidth"
                              label="New Password"
                              variant="standard"
                              fullWidth
                            />
                            <span onClick={handleClickshowNewPassword}>
                              {showNewPassword ? (
                                <Visibility style={{ color: "#088b89" }} />
                              ) : (
                                <VisibilityOff />
                              )}
                            </span>
                          </Box>
                          <Box
                            className="mtb-10 p-20"
                            sx={{
                              display: "flex",
                              alignItems: "flex-end",
                              maxWidth: "100%",
                            }}
                          >
                            <LockIcon
                              sx={{
                                color:
                                  errors?.ConfirmPassword ||
                                    (touchedFields?.ConfirmPassword &&
                                      !dirtyFields?.ConfirmPassword)
                                    ? "red"
                                    : " #088b89",
                                mr: 1,
                                my: 0.5,
                              }}
                            />
                            <TextField
                              sx={{
                                "& .MuiFormLabel-root.Mui-focused": {
                                  color:
                                    (touchedFields?.ConfirmPassword &&
                                      !dirtyFields?.ConfirmPassword) ||
                                      errors?.ConfirmPassword
                                      ? "red"
                                      : " #088b89",
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottomColor:
                                    (touchedFields?.ConfirmPassword &&
                                      !dirtyFields?.ConfirmPassword) ||
                                      errors?.ConfirmPassword
                                      ? "red"
                                      : " #088b89",
                                },
                              }}
                              {...register("ConfirmPassword", {
                                required: true,
                                validate: (value, formValues) =>
                                  value === formValues.password,
                              })}
                              error={
                                (touchedFields.ConfirmPassword &&
                                  !dirtyFields?.ConfirmPassword) ||
                                  errors?.ConfirmPassword
                                  ? true
                                  : false
                              }
                              type={showConfirmPassword ? "text" : "password"}
                              id="fullwidth"
                              label="Confirm Password"
                              variant="standard"
                              fullWidth
                            />
                            <span onClick={handleClickshowConfirmPassword}>
                              {showConfirmPassword ? (
                                <Visibility style={{ color: "#088b89" }} />
                              ) : (
                                <VisibilityOff />
                              )}
                            </span>
                          </Box>
                        </Box>
                        <Box className="footerButton">
                          <Button className="createCardButton ">Cancel</Button>
                          <Button type="submit" className="createCardButton ">
                            Save
                          </Button>
                        </Box>
                      </form>
                    </Grid>
                  </Grid>
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Usersidenavbar>
  );
};
export default UserProfile;
