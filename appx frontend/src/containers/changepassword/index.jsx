import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import passwordImage from "../../assets/lock.png";
import { Imageview } from "../../components/ImageView/imageview";
import CustomizedButton from "../../components/button";
import { resetPassword } from "../../service/actioncreater";

function Resetpassword() {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  console.log('selector: ', selector.getID);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const response = await dispatch(resetPassword({ id: selector.getID, newPassword: data.Password }))
    console.log('response: ', response);
    alert("Password changed successfully")
    navigate("/")
  };

  return (
    <>
      <Imageview>
        <Box textAlign="center" className="title-container lockdisplay">
          Reset Password?{" "}
          <span>
            <img src={passwordImage} alt="nolock" className="lockimage" />
          </span>
        </Box>
        <Box textAlign="center" className="font-color p25">
          Your new password must be different from previously used passwords
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="textfieldContainer">
            <Box
              className="mtb-10"
              sx={{
                display: "flex",
                alignItems: "flex-end",
                width: "100%",
                // maxWidth: "100%",
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
            </Box>
            <Box
              className="mtb-10"
              sx={{
                display: "flex",
                alignItems: "flex-end",
                width: "100%",
                // maxWidth: "100%",
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
                type={showPassword ? "text" : "password"}
                id="fullwidth"
                label="Confirm Password"
                variant="standard"
                fullWidth
              />
              <span onClick={handleClickShowPassword}>
                {showPassword ? (
                  <Visibility style={{ color: "#088b89" }} />
                ) : (
                  <VisibilityOff />
                )}
              </span>
            </Box>
          <Box className="signupbutton mtb-20">
            <CustomizedButton className="signupbutton-container " buttonName="Set New Password" type="submit" />
          </Box>
          </Box>
        </form>
        <Box textAlign="center" className=" margin-bottom ">
          <span onClick={() => navigate("/")}>
            <Link className="link-container linkDisplay">
              <KeyboardArrowLeftIcon /> Back to login
            </Link>
          </span>
        </Box>
      </Imageview>
    </>
  );
}

export default Resetpassword;
