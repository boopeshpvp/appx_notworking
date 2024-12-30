import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Skill = ({ skills }) => {
  const color = useSelector((state) => state.color);

  return (
    <Box sx={{ marginTop: "20px", color: color }}>
      <Box sx={{ fontSize: "17px", fontWeight: 600 }}>Skill</Box>
      <Box
        sx={{
          marginTop: "16px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {skills?.map((skill) => {
          return (
            <>
              <Box>• {skill}</Box>
            </>
          );
        })}
      </Box>
    </Box>
  );
};
export default Skill;
