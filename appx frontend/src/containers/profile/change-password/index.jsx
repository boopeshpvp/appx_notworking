
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomizedButton from "../../../components/button";
import SideNavbar from "../../sidenavbar";
import "./style.css";

export default function ProfileChangePassword(props) {
  const [showOldPassword, setshowOldPassword] = useState(false);
  const [showNewPassword, setshowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickshowNewPassword = () => setshowNewPassword((show) => !show);
  const handleClickshowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleClickshowOldPassword = () => setshowOldPassword((show) => !show);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <SideNavbar logoff={props}>
      <Grid className="changepasswordContainer">
        <Grid className="header">Change Password</Grid>
        <hr />
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
                  <LockIcon
                    sx={{

                      color:
                        errors?.OldPassword ||
                          (touchedFields?.OldPassword &&
                            !dirtyFields?.OldPassword)
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
                          (touchedFields?.OldPassword &&
                            !dirtyFields?.OldPassword) ||
                            errors?.OldPassword
                            ? "red"
                            : " #088b89",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor:
                          (touchedFields?.OldPassword &&
                            !dirtyFields?.OldPassword) ||
                            errors?.OldPassword
                            ? "red"
                            : " #088b89",
                      },
                    }}
                    {...register("OldPassword", {
                      required: true,
                      validate: (value, formValues) =>
                        value === localStorage.getItem("password"),
                    })}
                    error={
                      (touchedFields.OldPassword &&
                        !dirtyFields?.OldPassword) ||
                        errors?.OldPassword
                        ? true
                        : false
                    }
                    type="text"
                    id="fullwidth"
                    label="Old Password"
                    variant="standard"
                    fullWidth
                  />
                  <span onClick={handleClickshowOldPassword}>
                    {showOldPassword ? (
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
                        errors?.Password ||
                          (touchedFields?.Password && !dirtyFields?.Password)
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
                          (touchedFields?.Password && !dirtyFields?.Password) ||
                            errors?.Password
                            ? "red"
                            : " #088b89",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor:
                          (touchedFields?.Password && !dirtyFields?.Password) ||
                            errors?.Password
                            ? "red"
                            : " #088b89",
                      },
                    }}
                    {...register("Password", {
                      required: true,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?^()_={}'":;+-/><.,|`~])[A-Za-z\d#$@!%&*?^()_={}'":;+-/><.,|`~]{8,30}$/,
                      validate: (value, formValues) =>
                        value !== localStorage.getItem("password"),
                    })}
                    error={
                      (touchedFields.Password && !dirtyFields?.Password) ||
                        errors?.Password
                        ? true
                        : false
                    }
                    type="text"
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
                        value === formValues.Password,
                    })}
                    error={
                      (touchedFields.ConfirmPassword &&
                        !dirtyFields?.ConfirmPassword) ||
                        errors?.ConfirmPassword
                        ? true
                        : false
                    }
                    type={showNewPassword ? "text" : "password"}
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
                <CustomizedButton className="cancelButton boxShadow" buttonName="Cancel" />
                <CustomizedButton className="saveButton boxShadow" buttonName="Save" type="submit" />
              </Box>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </SideNavbar>
  );
}