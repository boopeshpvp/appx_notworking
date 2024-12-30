import EmailIcon from "@mui/icons-material/Email";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import passwordImage from "../../assets/lock.png";
import { Imageview } from "../../components/ImageView/imageview";
import CustomizedButton from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { getId, getRegisterDetails } from "../../service/actioncreater";
import "./style.css"
function ForgetPassword() {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const response = await dispatch(getRegisterDetails(data.Email))
    if (response) {
      dispatch(getId(response))
      navigate("/verification");
    }
    else {
      setErrorMessage("Please enter Registered Mail")
    }
  };

  const handleEmailChange = () => {
    if (errorMessage && !dirtyFields.Email) {
      setErrorMessage("");
    }
  };

  return (
    <>
      <Imageview>
        <Box textAlign="center" className="title-container lockdisplay">
          Forget Password?{" "}
          <span>
            <img src={passwordImage} alt="nolock" className="lockimage" />
          </span>
        </Box>
        <Box textAlign="center" className="font-color p25 mt-4">
          Enter your email and we'll send you instructions to 
          reset your password
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="textfieldContainer">
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                width:"100%",
                // maxWidth: "100%",
              }}
            >
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
                  (touchedFields?.Email && !dirtyFields?.Email) || errors.Email
                    ? true
                    : false
                }
                id="fullWidth"
                label="Email Address"
                variant="standard"
                fullWidth
                onChange={handleEmailChange}
              />
            </Box>
          <Box className="signupbutton mtb-20 mt-5">
            <CustomizedButton className="signupbutton-container" buttonName="Send Reset Link" type="submit" />
          </Box>
          </Box>
        </form>
        {errorMessage && (
          <Box textAlign="center" className="error-message">
            {errorMessage}
          </Box>
        )}
        <Box textAlign="center" className=" margin-bottom ">
          <span onClick={() => navigate("/")}>
            <Link className="link-container linkDisplay">
              <KeyboardArrowLeftIcon /> Go back
            </Link>
          </span>
        </Box>
      </Imageview>
    </>
  );
}
export default ForgetPassword;
