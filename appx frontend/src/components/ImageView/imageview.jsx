import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import "./style.css";
import background from "../../assets/frontImg.png";
import { Box } from "@mui/material";

export function Imageview({ children }) {

  return (
    // <>
    //   <Grid container className="main-container">
    //     <Grid md={8} xs={12} className="img-container">
    //       <img src={background} alt="noimage" className="centerImg" />
    //     </Grid>
    //     <Grid md={4} xs={12} className="form-container">
    //       {children}
    //     </Grid>
    //   </Grid>
    // </>
    <>
      <Grid container className="main-container">
        <Box className="submain-container">
          <Grid className="img-container">
            <img src={background} alt="noimage" className="centerImg" />
          </Grid>
          <Grid className="form-container">
            {children}
          </Grid>
        </Box>
      </Grid>

    </>
  );
}
