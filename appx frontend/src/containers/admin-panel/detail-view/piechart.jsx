import { Box } from "@mui/material";
import React from "react";

const Piechart = () => {
  return (
    <Box sx={{position:"relative", display:'flex', alignItems:'center', justifyContent:'center', height:'160px', width:'130px'}}>
      <Box className="firstCircle" sx={{position:"absolute"}}>
        <Box className="percent">
          <svg style={{display:'flex', alignItems:'center', height:'130px', width:'130px'}}>
            <circle cx="60" cy="60" r="60"></circle>
            <circle cx="60" cy="60" r="60"></circle>
          </svg>
        </Box>
      </Box>
      <Box className="secondCircle" sx={{position:"absolute"}}>
        <Box className="percent">
          <svg style={{display:'flex', alignItems:'center', height:'90px', width:'90px'}}>
            <circle cx="40" cy="40" r="40"></circle>
            <circle cx="40" cy="40" r="40"></circle>
          </svg>
        </Box>
      </Box>
      <Box className="thirdCircle" sx={{position:"absolute"}}>
        <Box className="percent" sx={{}}>
          <svg style={{display:'flex', alignItems:'center', height:'50px', width:'50px'}}>
            <circle cx="20" cy="20" r="20"></circle>
            <circle cx="20" cy="20" r="20"></circle>
          </svg>
        </Box>
      </Box>
    </Box>
  );
};

export default Piechart;
