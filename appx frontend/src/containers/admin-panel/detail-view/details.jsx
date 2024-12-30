import { Box } from "@mui/material";
import moment from 'moment';
import React from "react";
import { useSelector } from 'react-redux';

const Demographics = ({position,dob,fatherName,branch,phone,address}) => {
    const date=moment(dob).utc().format('DD/MM/YYYY')
    const color = useSelector(state => state.color)
    function calcAge(dateString) {
        var birthday = +new Date(dateString);
        return ~~((Date.now() - birthday) / (31557600000));
      }
      
    return (
        <Box sx={{marginTop:"20px",display:"flex",flexDirection:"column",gap:"12px",color: color }}>
            <Box sx={{fontSize:"17px",fontWeight:600}} className="primary">Details</Box>
            {/* <Box sx={{display:"flex",justifyContent:"space-between"}}>
                <Box>Gender</Box>
                <Box>Male</Box>
            </Box> */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>DOB / Age</Box>
                <Box>{date?.replaceAll("/","-")} / {calcAge(date)}</Box>
                {/* <Box>30-06-2001 / 22</Box> */}

            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>Role</Box>
                <Box>{position?.charAt(0).toUpperCase() + position?.slice(1)?.split(" ")[0]}</Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>Branch</Box>
                <Box>{branch?.charAt(0).toUpperCase() + branch?.slice(1)}</Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>Father Name</Box>
                <Box>{fatherName?.charAt(0).toUpperCase() + fatherName?.slice(1)}</Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>Contact</Box>
                <Box>{phone}</Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>Emergency Num</Box>
                <Box>9876543210</Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between"}}>
                {/* <Box sx={{textDecoration:"underline",fontWeight:"bold",color:"blue",cursor:"pointer"}}>Address</Box> */}
                <Box>Address</Box>
                <Box>{address?.charAt(0).toUpperCase() + address?.slice(1)}</Box>
            </Box>
        </Box>
    )
}

export default Demographics;