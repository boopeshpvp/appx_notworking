import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SendEmail from "../../../components/sendEmail/sendemail";
import Demographics from "./details";
import Skill from "./skills";

const UserDetailsLeft = () => {
  const [isemail, setIsEmail] = useState(false);
  const [tomail, setToMail] = useState("");
  const [employeeDetails,setEmployeeDetails]=useState(null)
  const [imgSrc, setImgSrc] = useState("Invalid Image Source");
  let userId = useParams();
  let id = userId.id;
  console.log( userId.id);
  // const location = useLocation();
  // const id = location.pathname.split("/")[3];
  // console.log("lo",typeof id);
  // let employeeDetails;
  useEffect(()=>{
    axios({
      method: "GET",
      url: `http://${process.env.REACT_APP_NODE_BASE_URL}:4000/user/getEmployee/${id}`
    })
      .then((response) => {
        setEmployeeDetails(response.data.data)
      })
      .catch((error) => {
        console.log("error", error);
      });
    },[])
    
    const showMail = (e) => {
      setIsEmail(true);
      setToMail();
    };
    // console.log("getuserDetails", employeeDetails?.findEmployeeById);
    return (
    <Box>
      <Box className="empProfile">
        <Box className="imgdiv">
          <img
            src={employeeDetails?.findEmployeeById.profilePictureUrl}
            alt="user_image"
            onError = {() => setImgSrc("https://shorturl.at/nops5")}
          />
        </Box>
        <Box className="absoluteBackground"></Box>
        <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
          <Box sx={{ fontSize: "h6.fontSize", fontWeight: "bold" }}>
            {employeeDetails?.findEmployeeById.firstName?.charAt(0).toUpperCase() + employeeDetails?.findEmployeeById.firstName?.slice(1)}
          </Box>
          <Box sx={{ marginTop: "10px" }}>Id: {employeeDetails?.findEmployeeById._id}</Box>
        </Box>
        <Box className="userBtns">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "black" }}
          >
            <GitHubIcon sx={{ cursor: "pointer", color: "black" }} />
          </a>
          <EmailIcon
            sx={{ cursor: "pointer", color: "#dd643f" }}
            onClick={() => showMail()}
          />
          <a href="https://in.linkedin.com/" target="_blank" rel="noreferrer">
            <LinkedInIcon sx={{ cursor: "pointer", color: "#087FB8" }} />
          </a>
        </Box>
      </Box>
      <Demographics position={employeeDetails?.findEmployeeById.position} branch={employeeDetails?.findEmployeeById.personalData.branch} fatherName={employeeDetails?.findEmployeeById.personalData.fatherName} dob={employeeDetails?.findEmployeeById.personalData.dob} phone={employeeDetails?.findEmployeeById.personalData.phone} address={employeeDetails?.findEmployeeById.personalData.address}/>
      <Skill skills={employeeDetails?.findEmployeeById.skills}/>
      {isemail && (
        <SendEmail isopen={isemail} onclick={setIsEmail} tomail={tomail} />
      )}
    </Box>
  );
};

export default UserDetailsLeft;
