import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Divider, Modal } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";

const ProjectDetailCard = ({projectData,interviewData,educationalData}) => {
  console.log("ProjectDetailCard",interviewData);
  const [project, setProject] = useState(true);
  const [interview, setInterview] = useState(false);
  const [education, setEducation] = useState(false);
  const [projectDescription, setProjectDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [interviewStatus, setInterviewStatus] = React.useState(null);

  const showProject = () => {
    setProject(true);
    setEducation(false);
    setInterview(false);
  };
  const showInterview = () => {
    setProject(false);
    setEducation(false);
    setInterview(true);
  };
  const showEducation = () => {
    setProject(false);
    setEducation(true);
    setInterview(false);
  };
  const handleOpen = (projectDesc,projectname) => {
    setOpen(true);
    setProjectDescription(projectDesc)
    setProjectName(projectname)
  };
  const handleEyeOpen=(interview)=>{
    setInterviewStatus(interview)
    setOpen(true);
    setProjectName("Interview Details")
  }
  const handleClose = () => {
    setOpen(false)
    setProjectDescription("")
    setProjectName("")
    setInterviewStatus(null)
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "white",
    borderRadius: "20px",
    boxShadow: 24,
    padding: "7px",
    zIndex: 10,
  };
  return (
    <TableContainer component={Paper} className="detailTable">
      <Table aria-label="simple table" sx={{ border: "0px" }}>
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                // width: "25%",
                cursor: "pointer",
                backgroundColor: `${project ? "#088B89" : "white"}`,
                color: `${project ? "white" : "black"}`,
                transition:"1s"
              }}
              onClick={showProject}
            >
              Project Details
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                // width: "25%",
                cursor: "pointer",
                backgroundColor: `${interview ? "#088B89" : "white"}`,
                color: `${interview ? "white" : "black"}`,
                transition:"1s"
              }}
              onClick={showInterview}
            >
              Interview Details
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                // width: "50%",
                cursor: "pointer",
                backgroundColor: `${education ? "#088B89" : "white"}`,
                color: `${education ? "white" : "black"}`,
                transition:"1s"
              }}
              onClick={showEducation}
            >
              Education Details
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {project ? (
              <TableCell
                align="left"
                sx={{
                  fontSize: "16px",
                  padding: "0",
                  verticalAlign: "baseline",
                }}
                colSpan={3}
              >
                <TableContainer component={Paper} className="border">
                  <Table aria-label="a dense table" className="innerTable">
                  <TableHead>
                      <TableRow>
                      <TableCell
                          align="center"
                          sx={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          S.No
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          Project Name
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          Duration
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          Stack
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          Role
                        </TableCell>
                      </TableRow>
                    </TableHead>
                   {
                    projectData?.toReversed()?.map((project,index)=>{
                      return (
                        <>
                    <TableBody>
                      <TableRow>
                      <TableCell align="center" >
                        {index+1}.
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            // borderBottom: "none",
                            fontWeight: "bold",
                            cursor: "pointer",
                            color: "blue",
                            textDecoration:"underline"
                          }}
                          onClick={()=>handleOpen(project?.projectDescription,project?.projectName.charAt(0).toUpperCase() + project?.projectName.slice(1))}
                        >
                          {project?.projectName.charAt(0).toUpperCase() + project?.projectName.slice(1)}
                        </TableCell>
                        <TableCell align="center" >
                        {project?.endYear==="current"?"current":project?.endYear===""?"NA":(project?.endYear.split("/")[1] - project?.startYear.split("/")[1]) * 12 + (project?.startYear.split("/")[0] - project?.endYear.split("/")[0])+" Months"}
                        </TableCell>
                        <TableCell align="center" >
                          {project?.stack.charAt(0).toUpperCase() + project?.stack.slice(1)}
                        </TableCell>
                        <TableCell align="center" >
                        {project?.role.charAt(0).toUpperCase() + project?.role.slice(1).split(" ")[0]}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                        </>
                      )
                    })
                   }
                  </Table>
                </TableContainer>
              </TableCell>
            ) : (
              <></>
            )}
            {interview ? (
              <TableCell
                align="left"
                sx={{
                  fontSize: "16px",
                  padding: "0",
                  verticalAlign: "baseline",
                }}
                colSpan={3}
              >
                <Table aria-label="a dense table" className="innerTable">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{ fontSize: "16px", fontWeight: "bold" }}
                      >
                        Attented Date
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: "16px", fontWeight: "bold" }}
                      >
                        Round
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: "16px", fontWeight: "bold" }}
                      >
                        Stack
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: "16px", fontWeight: "bold" }}
                      >
                        Year of Experience
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {
                    interviewData?.map((interview)=>{
                      return (
                        <>
                        <TableBody>
                    <TableRow>
                      <TableCell
                        align="center"
                        
                      >
                        {interview.interviewDate}
                      </TableCell>
                      <TableCell align="center" >
                        {interview.round}
                      </TableCell>
                      <TableCell align="center" >
                      {interview.techStack}
                      </TableCell>
                      <TableCell align="center" sx={{display:"flex",justifyContent:"center",gap:"5rem"}}>
                      {+interview.experience?.replace(":",".").slice(0,2)+'.'+interview.experience?.replace(":",".")?.split('.')[1]?.replace('0','')} <Box><ErrorOutlinedIcon className="primary" sx={{cursor:"pointer"}} onClick={()=>handleEyeOpen(interview)}/></Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                        </>
                      )
                    })
                  }
                </Table>
              </TableCell>
            ) : (
              <></>
            )}
            {education ? (
              <TableCell
                align="left"
                sx={{
                  fontSize: "16px",
                  padding: "0",
                  verticalAlign: "baseline",
                }}
                colSpan={3}
              >
                <TableContainer component={Paper} className="border">
                  <Table aria-label="a dense table" className="innerTable">
                  <TableHead>
                    </TableHead>
                    {
                      educationalData?.map((education)=>{
                        return (
                          <>
                          <TableRow>
                        <TableCell
                          align="left"
                          sx={{ fontSize: "16px", fontWeight: "bold",width:"20%"}}
                        >
                          {education.startYear}-{education.endYear}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          {education.degree}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ fontSize: "16px"}}
                        >
                          {education.degree} in {education.major} University of {education.institute}, England
                        </TableCell>
                      </TableRow>
                          </>
                        )
                      })
                    }
                  </Table>
                </TableContainer>
              </TableCell>
            ) : (
              <></>
            )}
          </TableRow>
        </TableBody>
      </Table>
      {open ? (
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="cancelModel">
              <HighlightOffIcon
                onClick={handleClose}
                sx={{ cursor: "pointer" }}
              />
            </div>
            <div className="projectModelContainer" style={{ color: "black" }}>
              <div
                style={{
                  color: "#088B89",
                  fontWeight: "bold",
                  fontSize: "22px",
                }}
              >
                {projectName?.charAt(0).toUpperCase() + projectName.slice(1)}
              </div>
              <Divider sx={{borderColor:"black"}}/>
            {projectDescription}
            {
              interviewStatus!==null?
              <Box>
                <Box sx={{display:"flex"}}><Box sx={{fontWeight:"bold"}}>Client</Box>: {interviewStatus?.client?.charAt(0).toUpperCase() + interviewStatus?.client.slice(1)}</Box>
                <Box sx={{display:"flex"}}><Box sx={{fontWeight:"bold"}}>Inteterviewer</Box>: {interviewStatus?.interviewer?.charAt(0).toUpperCase() + interviewStatus?.interviewer?.slice(1)}</Box>
                <Box sx={{display:"flex"}}><Box sx={{fontWeight:"bold"}}>Resource</Box>: {interviewStatus?.resource?.charAt(0).toUpperCase() + interviewStatus?.resource?.slice(1)}</Box>
                <Box sx={{display:"flex"}}><Box sx={{fontWeight:"bold"}}>Bde</Box>: {interviewStatus?.bde?.charAt(0).toUpperCase() + interviewStatus?.bde?.slice(1)}</Box>
                <Box sx={{display:"flex"}}><Box sx={{fontWeight:"bold"}}>Feedback</Box>: {interviewStatus?.feedback?.charAt(0).toUpperCase() + interviewStatus?.feedback?.slice(1)}</Box>
                <Box sx={{display:"flex"}}><Box sx={{fontWeight:"bold"}}>Status</Box>: {interviewStatus?.status?.charAt(0).toUpperCase() + interviewStatus?.status?.slice(1)}</Box>
              </Box>
              :""
            }
            </div>
          </Box>
        </Modal>
      ) : (
        <></>
      )}
    </TableContainer>
  );
};
export default ProjectDetailCard;
