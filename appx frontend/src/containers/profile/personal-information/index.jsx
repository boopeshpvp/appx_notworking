import BorderColorIcon from "@mui/icons-material/BorderColor";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import HouseIcon from "@mui/icons-material/House";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
    Box,
    Divider,
    IconButton,
    Paper,
    TextField,
    Tooltip
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useForm } from "react-hook-form";
import profilePicture from "../../../assets/image-upload.png";
import SideNavbar from "../../sidenavbar";

import CustomizedButton from "../../../components/button";
import FieldWithIcon from "../../../components/textFeild";
import "./style.css";
function PersonalInformation(props) {
    const startDate = new Date();
    const [inputData, setInputData] = useState("");
    const [istoggle, setToggle] = useState(false);
    const [image, setImage] = useState("");
    const hiddenFileInput = React.useRef(null);
    console.log("hidden", hiddenFileInput);
    console.log("image", image);
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, dirtyFields },
    } = useForm({
        mode: "onChange",
    });
    const onSubmit = (data) => {
        console.log(data);
        setInputData(data);
        console.log("onClickState", inputData);
    };

    const handleClick = () => {
        setInputData("")
        // setImage("")
        setToggle(true)
    }
    const handleUpload = (event) => {
        hiddenFileInput.current.click();
    }
    const handleChange = (event) => {
        const reader = new FileReader();
        reader.onloadend = function (e) {
            setImage(reader.result)
        }
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    return (
        <>
            <SideNavbar logoff={props}>
                <Box className={inputData ? "editIconOn" : "editIconOff"}>
                    <Tooltip title="Edit your profile">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2, color: "#088b89" }}
                        >
                            <BorderColorIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                        <Divider textAlign="center" className="divider form-header">Personal Information</Divider>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                        <Box className="imageContainer">
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    "& > :not(style)": {
                                        m: 1,
                                        width: 250,
                                        height: 250,
                                    },
                                }}
                            >
                                <Paper elevation={3}>
                                    <Box className="profileImage">
                                        <Box>
                                            <img
                                                src={image === "" ? profilePicture : image}
                                                alt="profile image"
                                                width={"220px"}
                                                height={"220px"}
                                                style={{ borderRadius: "50%" }}
                                                htmlFor="contained-button-file"
                                                onClick={
                                                    Object.keys(inputData).length
                                                        ? () => { }
                                                        : handleUpload
                                                }
                                            />
                                            <input
                                                type="file"
                                                ref={hiddenFileInput}
                                                onChange={handleChange}
                                                style={{ display: "none" }}
                                            />
                                        </Box>
                                    </Box>
                                </Paper>
                            </Box>
                            <Box className="profilePicture">Profile Picture</Box>
                        </Box>
                        <Box className="textfieldContainer">
                            <Box className=" name-container mtb-10 p-15">
                                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                    <AccountCircle
                                        sx={{
                                            color:
                                                errors?.FirstName ||
                                                    (touchedFields?.FirstName && !dirtyFields?.FirstName)
                                                    ? "red"
                                                    : " #088b89",
                                            mr: 1,
                                            my: 0.5,
                                        }}
                                    />
                                    <TextField
                                        className="textWidth"
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
                                        {...register("FirstName", {
                                            required: true,
                                            pattern: /^[a-zA-Z ]{1,30}$/,
                                        })}
                                        error={
                                            (touchedFields?.FirstName && !dirtyFields?.FirstName) ||
                                                errors.FirstName
                                                ? true
                                                : false
                                        }
                                        id="input-with-sx"
                                        label="First Name"
                                        variant="standard"
                                        InputProps={
                                            Object.keys(inputData).length
                                                ? {
                                                    readOnly: true,
                                                }
                                                : {
                                                    readOnly: false,
                                                }
                                        }
                                    />
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                    <AccountCircle
                                        sx={{
                                            color:
                                                errors?.LastName ||
                                                    (touchedFields?.LastName && !dirtyFields?.LastName)
                                                    ? "red"
                                                    : " #088b89",
                                            mr: 1,
                                            my: 0.5,
                                        }}
                                    />
                                    <TextField
                                        className="textWidth"
                                        sx={{
                                            "& .MuiFormLabel-root.Mui-focused": {
                                                color:
                                                    (touchedFields?.LastName && !dirtyFields?.LastName) ||
                                                        errors?.LastName
                                                        ? "red"
                                                        : " #088b89",
                                            },
                                            "& .MuiInput-underline:after": {
                                                borderBottomColor:
                                                    (touchedFields?.LastName && !dirtyFields?.LastName) ||
                                                        errors?.LastName
                                                        ? "red"
                                                        : " #088b89",
                                            },
                                        }}
                                        {...register("LastName", {
                                            required: true,
                                            pattern: /^[a-zA-Z ]{1,30}$/,
                                        })}
                                        error={
                                            (touchedFields?.LastName && !dirtyFields?.LastName) ||
                                                errors?.LastName
                                                ? true
                                                : false
                                        }
                                        id="input-with-sx"
                                        label="Last Name"
                                        variant="standard"
                                        InputProps={
                                            Object.keys(inputData).length
                                                ? {
                                                    readOnly: true,
                                                }
                                                : {
                                                    readOnly: false,
                                                }
                                        }
                                    />
                                </Box>
                            </Box>

                            <Box className=" name-container  mtb-10 p-15">
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
                                        className="textWidth"
                                        sx={{
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
                                        {...register("Email", {
                                            required: true,
                                            pattern: /^\w.+@[a-zA-Z_]+?\.[a-zA-Z]{1,3}$/,
                                        })}
                                        error={
                                            (touchedFields?.Email && !dirtyFields?.Email) ||
                                                errors.Email
                                                ? true
                                                : false
                                        }
                                        id="input-with-sx"
                                        label="Email Address"
                                        variant="standard"
                                        InputProps={
                                            Object.keys(inputData).length
                                                ? {
                                                    readOnly: true,
                                                }
                                                : {
                                                    readOnly: false,
                                                }
                                        }
                                    />
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                    <DateRangeIcon
                                        sx={{
                                            color:
                                                errors?.Date ||
                                                    (touchedFields?.Date && !dirtyFields?.Date)
                                                    ? "red"
                                                    : " #088b89",
                                            mr: 1,
                                            my: 0.5,
                                        }}
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker"]}>
                                            <DatePicker
                                                sx={{
                                                    overflow: "hidden",
                                                    width: 350,
                                                    "& .MuiFormLabel-root.Mui-focused": {
                                                        color:
                                                            (touchedFields?.fwe &&
                                                                !dirtyFields?.fed) ||
                                                                errors?.efwe
                                                                ? "red"
                                                                : " #088b89",
                                                    },
                                                    "& .MuiInput-underline:after": {
                                                        borderBottomColor:
                                                            (touchedFields?.Date && !dirtyFields?.Date) ||
                                                                errors?.Date
                                                                ? "red"
                                                                : " #088b89",
                                                    },
                                                }}
                                                // {...register("Date", {
                                                //     required: true,
                                                // })}
                                                error={
                                                    (touchedFields?.Date && !dirtyFields?.Date) ||
                                                        errors.Date
                                                        ? true
                                                        : false
                                                }

                                                slotProps={{ textField: { variant: "standard" } }}
                                                label="Date Of Birth"
                                                // InputProps={
                                                //   Object.keys(inputData).length
                                                //     ? {
                                                //       readOnly: true,
                                                //     }
                                                //     : {
                                                //       readOnly: false,
                                                //     }
                                                // }
                                                readOnly={Object.keys(inputData).length ? true : false}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Box>
                            </Box>

                            <Box className=" name-container  mtb-10 p-15">
                                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                    <PhoneIcon
                                        sx={{
                                            color:
                                                errors?.Phone ||
                                                    (touchedFields?.Phone && !dirtyFields?.Phone)
                                                    ? "red"
                                                    : " #088b89",
                                            mr: 1,
                                            my: 0.5,
                                        }}
                                    />
                                    <TextField
                                        className="textWidth"
                                        sx={{
                                            "& .MuiFormLabel-root.Mui-focused": {
                                                color:
                                                    (touchedFields?.Phone && !dirtyFields?.Phone) ||
                                                        errors?.Phone
                                                        ? "red"
                                                        : " #088b89",
                                            },
                                            "& .MuiInput-underline:after": {
                                                borderBottomColor:
                                                    (touchedFields?.Phone && !dirtyFields?.Phone) ||
                                                        errors?.Phone
                                                        ? "red"
                                                        : " #088b89",
                                            },
                                        }}
                                        {...register("Phone", {
                                            required: true,
                                            // pattern: /^\w.+@[a-zA-Z_]+?\.[a-zA-Z]{1,3}$/,
                                        })}
                                        error={
                                            (touchedFields?.Phone && !dirtyFields?.Phone) ||
                                                errors.Phone
                                                ? true
                                                : false
                                        }
                                        id="input-with-sx"
                                        label="Phone Number"
                                        variant="standard"
                                        InputProps={
                                            Object.keys(inputData).length
                                                ? {
                                                    readOnly: true,
                                                }
                                                : {
                                                    readOnly: false,
                                                }
                                        }
                                    />
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                    <WorkIcon
                                        sx={{
                                            color:
                                                errors?.Designation ||
                                                    (touchedFields?.Designation &&
                                                        !dirtyFields?.Designation)
                                                    ? "red"
                                                    : " #088b89",
                                            mr: 1,
                                            my: 0.5,
                                        }}
                                    />
                                    <TextField
                                        className="textWidth"
                                        sx={{
                                            "& .MuiFormLabel-root.Mui-focused": {
                                                color:
                                                    (touchedFields?.Designation &&
                                                        !dirtyFields?.Designation) ||
                                                        errors?.Designation
                                                        ? "red"
                                                        : " #088b89",
                                            },
                                            "& .MuiInput-underline:after": {
                                                borderBottomColor:
                                                    (touchedFields?.Designation &&
                                                        !dirtyFields?.Designation) ||
                                                        errors?.Designation
                                                        ? "red"
                                                        : " #088b89",
                                            },
                                        }}
                                        {...register("Designation", {
                                            required: true,
                                            // pattern: /^\w.+@[a-zA-Z_]+?\.[a-zA-Z]{1,3}$/,
                                        })}
                                        error={
                                            (touchedFields?.Designation &&
                                                !dirtyFields?.Designation) ||
                                                errors.Designation
                                                ? true
                                                : false
                                        }
                                        id="input-with-sx"
                                        label="Designation"
                                        variant="standard"
                                        InputProps={
                                            Object.keys(inputData).length
                                                ? {
                                                    readOnly: true,
                                                }
                                                : {
                                                    readOnly: false,
                                                }
                                        }
                                    />
                                </Box>
                            </Box>
                            <Box className=" name-container  mtb-10 p-15">
                                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                    <LocationCityIcon
                                        sx={{
                                            color:
                                                errors?.City ||
                                                    (touchedFields?.City &&
                                                        !dirtyFields?.City)
                                                    ? "red"
                                                    : " #088b89",
                                            mr: 1,
                                            my: 0.5,
                                        }}
                                    />
                                    <TextField
                                        className="textWidth"
                                        sx={{
                                            "& .MuiFormLabel-root.Mui-focused": {
                                                color:
                                                    (touchedFields?.City &&
                                                        !dirtyFields?.City) ||
                                                        errors?.City
                                                        ? "red"
                                                        : " #088b89",
                                            },
                                            "& .MuiInput-underline:after": {
                                                borderBottomColor:
                                                    (touchedFields?.City &&
                                                        !dirtyFields?.City) ||
                                                        errors?.City
                                                        ? "red"
                                                        : " #088b89",
                                            },
                                        }}
                                        {...register("City", {
                                            required: true,
                                            // pattern: /^\w.+@[a-zA-Z_]+?\.[a-zA-Z]{1,3}$/,
                                        })}
                                        error={
                                            (touchedFields?.City &&
                                                !dirtyFields?.City) ||
                                                errors.City
                                                ? true
                                                : false
                                        }
                                        id="input-with-sx"
                                        label="City"
                                        variant="standard"
                                        InputProps={
                                            Object.keys(inputData).length
                                                ? {
                                                    readOnly: true,
                                                }
                                                : {
                                                    readOnly: false,
                                                }
                                        }
                                    />
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                    <HomeIcon
                                        sx={{
                                            color:
                                                errors?.State ||
                                                    (touchedFields?.State &&
                                                        !dirtyFields?.State)
                                                    ? "red"
                                                    : " #088b89",
                                            mr: 1,
                                            my: 0.5,
                                        }}
                                    />
                                    <TextField
                                        className="textWidth"
                                        sx={{
                                            "& .MuiFormLabel-root.Mui-focused": {
                                                color:
                                                    (touchedFields?.State &&
                                                        !dirtyFields?.State) ||
                                                        errors?.State
                                                        ? "red"
                                                        : " #088b89",
                                            },
                                            "& .MuiInput-underline:after": {
                                                borderBottomColor:
                                                    (touchedFields?.State &&
                                                        !dirtyFields?.State) ||
                                                        errors?.State
                                                        ? "red"
                                                        : " #088b89",
                                            },
                                        }}
                                        {...register("State", {
                                            required: true,
                                            // pattern: /^\w.+@[a-zA-Z_]+?\.[a-zA-Z]{1,3}$/,
                                        })}
                                        error={
                                            (touchedFields?.State &&
                                                !dirtyFields?.State) ||
                                                errors.State
                                                ? true
                                                : false
                                        }
                                        id="input-with-sx"
                                        label="State"
                                        variant="standard"
                                        InputProps={
                                            Object.keys(inputData).length
                                                ? {
                                                    readOnly: true,
                                                }
                                                : {
                                                    readOnly: false,
                                                }
                                        }
                                    />
                                </Box>
                            </Box>
                            <Box className=" name-container  mtb-10 p-15">
                                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                    <LocationOnIcon
                                        sx={{
                                            color:
                                                errors?.Address ||
                                                    (touchedFields?.Address && !dirtyFields?.Address)
                                                    ? "red"
                                                    : " #088b89",
                                            mr: 1,
                                            my: 0.5,
                                            marginBottom: 12,
                                        }}
                                    />
                                    <TextField
                                        className="addressWidth"
                                        sx={{
                                            marginTop: 3,
                                            width: 840,
                                            "& .MuiFormLabel-root.Mui-focused": {
                                                color:
                                                    (touchedFields?.Address && !dirtyFields?.Address) ||
                                                        errors?.Address
                                                        ? "red"
                                                        : " #088b89",
                                            },
                                            "& .MuiOutlinedInput-root.Mui-focused": {
                                                "& > fieldset": {
                                                    borderColor:
                                                        (touchedFields?.Address &&
                                                            !dirtyFields?.Address) ||
                                                            errors?.Address
                                                            ? "red"
                                                            : " #088b89",
                                                },
                                            },
                                        }}
                                        {...register("Address", {
                                            required: true,
                                            // pattern: /^\w.+@[a-zA-Z_]+?\.[a-zA-Z]{1,3}$/,
                                        })}
                                        error={
                                            (touchedFields?.Address && !dirtyFields?.Address) ||
                                                errors.Address
                                                ? true
                                                : false
                                        }
                                        id="input-with-sx"
                                        label="Address"
                                        multiline
                                        rows={4}
                                        InputProps={
                                            Object.keys(inputData).length
                                                ? {
                                                    readOnly: true,
                                                }
                                                : {
                                                    readOnly: false,
                                                }
                                        }
                                    />
                                </Box>
                            </Box>

                            <Box className="footerButton" >
                                {/* <Button
                  type="submit"
                  variant="contained"
                  className={
                    Object.keys(inputData).length === 0
                      ? "buttonVisiblityOn"
                      : "buttonVisiblityOff"
                  }
                >
                  {istoggle ? "Save" : "Submit"}
                </Button> */}

                                <CustomizedButton variant="contained" type="submit" sx={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }} className={
                                    Object.keys(inputData).length === 0
                                        ? "buttonVisiblityOn"
                                        : "buttonVisiblityOff"
                                } buttonName={istoggle ? "Save" : "Submit"} />
                            </Box>
                        </Box>
                    </Box>
                </form>
            </SideNavbar>
        </>
    );
}

export default PersonalInformation;
