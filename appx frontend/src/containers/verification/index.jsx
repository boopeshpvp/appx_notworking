import { Box, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Imageview } from "../../components/ImageView/imageview";
import CustomizedButton from "../../components/button";
import "./style.css";

const LENGTH = 6;
const clamp = (min, max, val) => Math.max(min, Math.min(val, max));

function Verification() {
  const [data, setData] = useState([...Array(LENGTH).keys()]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const selector = useSelector((state) => state);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm({
    mode: "onChange",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (formData) => {
    if (selector.otp === formData.otp) {
      navigate("/resetpassword");
    } else {
      setErrorMessage("Incorrect OTP. Please try again.");
    }
  };

  const handleKeyPress = (index) => (e) => {
    const value = e.target.value;

    if (value.length === 1) {
      const nextIndex = clamp(0, data.length - 1, index + 1);
      inputRefs.current[nextIndex].focus();
    } else if (value.length === 0) {
      const prevIndex = clamp(0, data.length - 1, index - 1);
      inputRefs.current[prevIndex].focus();
    }
    const otpValue = data.map((_, i) => e.target.form[`otp${i}`]?.value || "").join("");
    setValue("otp", otpValue);

    setErrorMessage("");
  };

  return (
    <>
      <Imageview>
        <Box textAlign="center" className="title-container">
          Two Step Verification
        </Box>
        <Box textAlign="center" className="font-color mtb-10 p25">
          We send a verification code to your mobile. Enter the code from the
          mobile in the field given below.
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="otpfieldContainer mtb-20">
            {data.map((_, index) => (
              <TextField
                key={index}
                className="otpContainer"
                onInput={handleKeyPress(index)}
                inputRef={(ref) => (inputRefs.current[index] = ref)}
                inputProps={{ maxLength: 1 }}
                {...register(`otp${index}`, { required: true })}
              />
            ))}
          </Box>
          <Box className="verificationbutton mtb-30">
            <CustomizedButton
              className="signupbutton-container"
              buttonName="Verify My Account"
              type="submit"
            />
          </Box>
        </form>
        {errorMessage && (
          <Box textAlign="center" className="error-message">
            {errorMessage}
          </Box>
        )}
        <Box textAlign="center" className=" margin-bottom  ">
          Didn't get the code?{' '}
          <span>
            <Link className="link-container">Resend</Link>
          </span>
        </Box>
      </Imageview>
    </>
  );
}

export default Verification;
