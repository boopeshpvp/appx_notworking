import React from "react";
import Image from "../../assets/errImage.jpg";
import "../error/style.css";
import { useNavigate } from "react-router";
import { Box, Button } from "@mui/material";
const NotFound = () => {
  const navigate = useNavigate();

  // const Auth =localStorage.getItem("authentication").toString()
  // console.log('Auth:', Auth )
  return (
    <Box className="errorPageContainer">
      <Box>
        <img src={Image} alt="noimage" className="errorImage" />
        <h1>Page Not Found</h1>
        <Button
          onClick={() =>
            localStorage.getItem("authentication") === 'true'
              ? localStorage.getItem("switchButton") === "admin"
                ? navigate("/admin/dashboard")
                : navigate("/user/home")
              : navigate("/")
          }
          className="registerButton"
        >
          {localStorage.getItem("authentication") == 'true'
            ? (localStorage.getItem("switchButton") == "admin"
              ? "Back to Admin Dashboard"
              : "Back to User Home")
            : "Back to Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
