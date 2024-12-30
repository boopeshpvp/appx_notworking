import Box from "@mui/material/Box";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaAngular, FaDatabase, FaNodeJs, FaPhp, FaPython, FaReact, FaVuejs, } from "react-icons/fa";
import { TbBrandNextjs, TbBrandReactNative } from "react-icons/tb";
import { useLocation, useParams } from "react-router";
import SideNavbar from "../../sidenavbar";
import { Graph } from "./profileGraph";
import "./style.css";
import UserDetailsLeft from "./userDetailsLeft";
import UserDetailsRight from "./userDetailsRight";

function createData(projectName, incharge, duration, role) {
  return { projectName, incharge, duration, role };
}

const chip = [
  { id: 1, icon: <FaReact className="iconGap" />, label: "React" },
  { id: 2, icon: <FaNodeJs className="iconGap" />, label: "Node" },
  { id: 3, icon: <FaAngular className="iconGap" />, label: "Angular" },
  { id: 4, icon: <FaDatabase className="iconGap" />, label: "Database" },
  { id: 5, icon: <FaPhp className="iconGap" />, label: "Php" },
  { id: 6, icon: <FaPython className="iconGap" />, label: "Python" },
  { id: 7, icon: <FaVuejs className="iconGap" />, label: "Vue.js" },
  { id: 8, icon: <TbBrandReactNative className="iconGap" />, label: "React Native" },
  { id: 9, icon: <TbBrandNextjs className="iconGap" />, label: "Next.js" },
  { id: 11, icon: <FaReact className="iconGap" />, label: "React" },
  { id: 12, icon: <FaNodeJs className="iconGap" />, label: "Node" },
  { id: 13, icon: <FaAngular className="iconGap" />, label: "Angular" },
  { id: 14, icon: <FaDatabase className="iconGap" />, label: "Database" },
  { id: 15, icon: <FaPhp className="iconGap" />, label: "Php" },
  { id: 16, icon: <FaPython className="iconGap" />, label: "Python" },
  { id: 17, icon: <FaVuejs className="iconGap" />, label: "Vue.js" },
]



const rows = [
  createData("Internal App", "Manimaran", "2 months", "Backend"),
  createData("XCD", "Kamaraj", "4 months", "Frontend"),
  createData("Airport Service", "Alex", "6 months", "Database"),
];

const DetailView = (props) => {
  // const location = useLocation();
  // const [graphState, setGraphState] = useState("");
  const [employeeDetails,setEmployeeDetails]=useState(null)
  let userId = useParams();
  let id = userId.id;
  // useEffect(() => {
  //   setGraphState(<Graph />);
  // }, []);
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
    console.log("projectData", employeeDetails?.findEmployeeById.skills);
  return (
    <SideNavbar logoff={props}>
      <Box className="leftsidebar">
        {/* <Card>
          <Card className="headercardBox">
            <Typography className="flex employeeDetails">
              <WorkIcon fontSize="small" style={{ color: "#088b89 " }} />
              <Typography>FrontEnd Developer</Typography>
            </Typography>
            <Typography className="flex employeeDetails">
              <LocationOnIcon fontSize="small" style={{ color: "#088b89 " }} />
              <Typography>Coimbatore</Typography>
            </Typography>
            <Typography className="flex employeeDetails">
              <CalendarMonthIcon
                fontSize="small"
                style={{ color: "#088b89 " }}
              />
              <Typography>Joined June 23</Typography>
            </Typography>
          </Card>
        </Card>
        <Card className="cardBox headercardBox">
          <CardContent className="cardContent">
            <Typography className="profileCardHeading">
              Average Rating
            </Typography>
            <Rating
              name="read-only"
              value={3}
              readOnly
              className="ratingProgress"
            />
          </CardContent>
        </Card>
        <Card className="cardBox headercardBox">

          <CardContent className="cardContent cardHeight ">
            <Typography className="profileCardHeading">Progress</Typography>
            <LineGraph />
          </CardContent>
        </Card>
        <Card className="cardBox headercardBox">
          <CardContent className="cardContent">
            <Typography className="profileCardHeading">
              Total Mock Attended
            </Typography>
            <Typography className="attendedInterviewCount">12</Typography>
          </CardContent>
        </Card> */}
        <UserDetailsLeft />

      </Box>
      <Box className="rightsidebar">
        {/* <Card className="cardBox">
          <CardContent>
            <Box>
              <Box className="flexBox">
                <div className="line" />
                <Typography className="profileCardHeading scrollBarHeader">
                  Skills
                </Typography>
                <div className="line" />
              </Box>
              <Box className="flexBox skillSet">
                {
                  chip.map(skills => <Chip icon={skills.icon} label={skills.label} />)
                }
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card className="cardBox graphcardHeight">
          <CardContent>
            <Box className="flexBox">
              <div className="line" />
              <Typography className="profileCardHeading scrollBarHeader">
                Mock attended (Monthwise)
              </Typography>
              <div className="line" />
            </Box>
            {graphState}
          </CardContent>
        </Card>

        <Box className="flexBox tableHeading">
          <div className="line" />
          <Typography className="profileCardHeading scrollBarHeader">
            Project Details
          </Typography>
          <div className="line" />
        </Box>

        <Card className="cardBox">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableHead">Project name</TableCell>
                  <TableCell className="tableHead" align="center">
                    Incharge
                  </TableCell>
                  <TableCell className="tableHead" align="center">
                    Duration
                  </TableCell>
                  <TableCell className="tableHead" align="center">
                    Role
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.projectName}
                    </TableCell>
                    <TableCell align="center">{row.incharge}</TableCell>
                    <TableCell align="center">{row.duration}</TableCell>
                    <TableCell align="center">{row.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card> */}
        <UserDetailsRight projectData={employeeDetails?.findEmployeeById.projectData} interviewData={employeeDetails?.findEmployeeById.interviewDetails} educationalData={employeeDetails?.findEmployeeById.educationalData}/>
      </Box>
    </SideNavbar>
  );
};

export default DetailView;
