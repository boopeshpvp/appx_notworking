import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ProjectDetailCard from "./projectDetailsCard";

const UserDetailsRight = ({projectData,interviewData,educationalData}) => {
  console.log("report",projectData);
  const current=projectData?.filter((data)=>{
    return data.endYear==="current"
  })
  console.log(current);
  const color=useSelector(state=>state.color)

  return (
    <Box>
      <Box className="leftCard" sx={{ display: "flex", gap: "20px", color:color }}>
        <Box className="projectCard">
          <p className="primary"
            style={{ textAlign: "center", fontSize: "26px", fontWeight: "600" }}
          >
            Current Project
          </p>
          <Box sx={{display:"flex",gap:"10px",justifyContent:"center"}}>
          {
            current?.map((project,index)=>{
              return (
                <>
                <Box sx={{fontWeight:"bold"}}>{project?.projectName.charAt(0).toUpperCase() + project?.projectName.slice(1)}</Box><Box>|</Box>
                </>
                )
              })
            }
            </Box>
        </Box>
        <Box className="reportCard">
          <p className="primary"
            style={{ textAlign: "center", fontSize: "26px", fontWeight: "600" }}
          >
            Reported to
          </p>
          <Box sx={{display:"flex",gap:"10px",justifyContent:"center"}}>
          {
            current?.map((project)=>{
              return (
                <>
                <Box sx={{fontWeight:"bold"}}>{project?.reportedTo.charAt(0).toUpperCase() + project?.reportedTo.slice(1)}</Box><Box>|</Box>
                </>
                )
              })
            }
            </Box>
        </Box>
      </Box>
      <Box sx={{ marginTop: "3rem" }}>
        <ProjectDetailCard projectData={projectData} interviewData={interviewData} educationalData={educationalData}/>
      </Box>
    </Box>
  );
};
export default UserDetailsRight;
