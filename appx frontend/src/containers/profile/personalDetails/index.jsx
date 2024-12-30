import "./style.css";

import TextareaAutosize from "@mui/base/TextareaAutosize";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import DefaultProfile from "../../../assets/defaultProfile.webp";
import YearPicker from "../../../components/yearPicker";
import useOnClickOutside from "../../../utils/customHooks/useOnClickOutside";

function PersonalDetails() {
  const [isEdit, setIsEdit] = useState(false);
  const theme = useSelector((state) => state.theme);
  const color = useSelector((state) => state.color);
  const bgColor = useSelector((state) => state.bgColor);
  const [isAddEdu, setIsAddEdu] = useState(false);
  const [eduStartYear, setEduStartYear] = useState(new Date().getFullYear());
  const [isEduYearStartOpen, setIsEduYearStartOpen] = useState(false);
  const [eduEndYear, setEduEndYear] = useState(new Date().getFullYear());
  const [isEduYearEndOpen, setIsEduYearEndOpen] = useState(false);
  const [education, setEducation] = useState("");
  const [isAddEmp, setIsAddEmp] = useState(false);
  const [empStartYear, setEmpStartYear] = useState(new Date().getFullYear());
  const [isEmpYearStartOpen, setIsEmpYearStartOpen] = useState(false);
  const [empEndYear, setEmpEndYear] = useState(new Date().getFullYear());
  const [isEmpYearEndOpen, setIsEmpYearEndOpen] = useState(false);
  const [position, setPosition] = useState("");
  const yearSelectBox = useRef();
  const [adminDetails, setAdminDetails] = useState({});
  const [tempAdminDetails, setTempAdminDetails] = useState({});
  const [adminEducationalData, setAdminEducationalData] = useState([]);
  const [addAdminEducationalData, setAddAdminEducationalData] = useState({});
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [profile, setprofile] = useState(null)
  const [change, setChange] = useState(false)

  useOnClickOutside(yearSelectBox, () => {
    setIsEduYearStartOpen(false);
    setIsEduYearEndOpen(false);
    setIsEmpYearStartOpen(false);
    setIsEmpYearEndOpen(false);
  });

  const handleEduStartYearChange = (year) => {
    setAddAdminEducationalData((state) => {
      return { ...state, startYear: year };
    });
    setIsEduYearStartOpen(false);
  };

  const handleEmpStartYearChange = (year) => {
    setEmpStartYear(year);
    setIsEmpYearStartOpen(false);
  };

  const handleEduEndYearChange = (year) => {
    setAddAdminEducationalData((state) => {
      return { ...state, endYear: year };
    });
    setIsEduYearEndOpen(false);
  };

  const handleEmpEndYearChange = (year) => {
    setEmpEndYear(year);
    setIsEmpYearEndOpen(false);
  };

  const handleEducationChange = (event) => {
    setAddAdminEducationalData((state) => {
      return { ...state, degree: event.target.value };
    });
  };

  // const handlePositionChange = (event) => {
  //   setPosition(event.target.value);
  // };

  const handleOpen = () => {
    setOpen(true);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 340,
    bgcolor: "white",
    borderRadius: "20px",
    boxShadow: 24,
    padding: "24px",
    zIndex: 10,
  };
  const handleClose = () => {
    setOpen(false);
    setChange(false)
  };

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_NODE_BASE_URL
        }:4000/admin/getAdminDetail/${localStorage.getItem("id")}`
      )
      .then((res) => {
        console.log("res", res.data.data.findAdminById);
        // setprofile(res.data.data.findAdminById.profilePicture);
        setAdminDetails(res.data.data.findAdminById.personalData);
        setTempAdminDetails(res.data.data.findAdminById.personalData);
        setAdminEducationalData(res.data.data.findAdminById.educationalData);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_NODE_BASE_URL
        }:4000/admin/getAdminDetail/${localStorage.getItem("id")}`
      )
      .then((res) => {
        console.log("res", res.data.data.findAdminById);
        setprofile(res.data.data.findAdminById.profilePicture)
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }, [open === false]);

  // function profileChange(img) {
  // setAdminDetails((state) => {
  //   return { ...state, profilePicture: URL.createObjectURL(img) };
  // });
  // }

  const profileChange = (e) => {
    setChange(true)
    console.log(e);
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    console.log("hello from handleUpload");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("_id", localStorage.getItem("id"));

      console.log("formData: ", formData);

      await axios.post(
        `http://${process.env.REACT_APP_NODE_BASE_URL}:4000/admin/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // alert("File uploaded successfully!");
      setOpen(false);
      setChange(false)
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  function updateDetails() {
    console.log("adminDetails", adminDetails);
    setTempAdminDetails(adminDetails);
    axios
      .patch(
        `http://${process.env.REACT_APP_NODE_BASE_URL
        }:4000/admin/adminPersonalDetails/${localStorage.getItem("id")}`,
        adminDetails
      )
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }

  function updateEducation() {
    console.log("addAdminEducationalData", addAdminEducationalData);
    axios
      .patch(
        `http://${process.env.REACT_APP_NODE_BASE_URL
        }:4000/admin/adminEducationDetails/${localStorage.getItem("id")}`,
        addAdminEducationalData
      )
      .then((res) => {
        console.log("res", res);
        setAdminEducationalData(res.data.data.educationalData);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }

  // const deleteProfile = () => {
  //   console.log("deleteProfile");
  // };
  console.log("file", adminDetails);

  return (
    <>
      <Box sx={{ gap: "20px", color: color }} className="personalDetailsPage">
        <Box
          sx={{
            border: "1px solid #cacaca",
            borderRadius: "10px",
            height: "fit-content",
            mt: "40px",
            boxShadow:
              "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
          }}
          className="contactDetailsBox"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: "15px",
              px: "10px",
              borderBottom: "1px solid #cacaca",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box>
                <img
                  width={"82px"}
                  height={"66px"}
                  src={profile || DefaultProfile}
                  alt=""
                />
                </Box>
                <Box className="camDiv">
                <CameraAltIcon className="camIcon" sx={{color:"#D5D4DA"}}/>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    opacity: 0,
                  }}
                  onClick={() => handleOpen()}
                >
                  {/* <input type='file' style={{ width: '100%', height: '100%', borderRadius: '50%', cursor: 'pointer', padding: '50px' }} onChange={(e) => { profileChange(e.target.files[0]) }} /> */}
                  {/* <input type='file' style={{ width: '100%', height: '100%', borderRadius: '50%', cursor: 'pointer', padding: '50px' }} onClick={()=>handleOpen()}/> */}
                </Box>
              </Box>
              <Box sx={{ paddingLeft: "10px" }}>
                <Box sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  {adminDetails?.fullName || "-"}
                </Box>
                <Box sx={{ fontSize: "16px" }}>
                  {adminDetails?.position || "-"}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: "15px",
              px: "10px",
              pt: "30px",
              borderBottom: "1px solid #cacaca",
              mx: "10px",
            }}
          >
            <Box sx={{ pr: "50px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <MailOutlineIcon />
                Email
              </Box>
            </Box>
            <Box
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {adminDetails?.email || "-"}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: "15px",
              px: "10px",
              borderBottom: "1px solid #cacaca",
              mx: "10px",
            }}
          >
            <Box sx={{ pr: "42px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <PhoneAndroidIcon />
                Phone
              </Box>
            </Box>
            <Box
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {adminDetails?.phone || "-"}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: "15px",
              px: "10px",
              mx: "10px",
            }}
          >
            <Box sx={{ pr: "23px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <PinDropIcon />
                Location
              </Box>
            </Box>
            <Box>{adminDetails?.city || "-"}</Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            mt: "40px",
            overflowY: "auto",
            maxHeight: "calc(100vh - 156px)",
            "&::-webkit-scrollbar": { width: "0px" },
          }}
          className="allPersonalDetails"
        >
          <Box
            sx={{
              border: "1px solid #cacaca",
              borderRadius: "10px",
              mb: "20px",
              boxShadow:
                "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: "15px",
                px: "15px",
                alignItems: "center",
                borderBottom: "1px solid #cacaca",
              }}
            >
              <Box sx={{ fontWeight: "bold", fontSize: "h6.fontSize" }}>
                About me
              </Box>
              <Box>
                {isEdit ? (
                  <IconButton
                    onClick={() => {
                      setIsEdit(false);
                      setAdminDetails(tempAdminDetails);
                    }}
                  >
                    <HighlightOffIcon sx={{ color: "red" }} />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  >
                    <BorderColorIcon sx={{ color: color }} />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box sx={{ py: "20px", px: "15px" }}>
              {isEdit ? (
                <TextareaAutosize
                  value={adminDetails?.bio}
                  className="bioInput"
                  placeholder="Enter your bio"
                  onChange={(e) => {
                    setAdminDetails((state) => {
                      return { ...state, bio: e.target.value };
                    });
                  }}
                />
              ) : (
                <Box>{adminDetails?.bio || "My Bio -"}</Box>
              )}
              <Box
                sx={{
                  fontSize: "19px",
                  fontWeight: "bold",
                  pb: "10px",
                  pt: "20px",
                }}
              >
                Personal Details
              </Box>
              <Box sx={{ py: "10px", pl: "25px" }}>
                <Box
                  sx={{ display: "flex", py: "10px", alignItems: "baseline" }}
                >
                  <Box
                    sx={{
                      minWidth: "150px",
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <Box>Full Name</Box>
                    <Box>:</Box>
                  </Box>
                  {isEdit ? (
                    <TextField
                      value={adminDetails?.fullName}
                      id="filled-basic"
                      variant="filled"
                      size="small"
                      className="personalInput"
                      sx={{
                        pl: "30px",
                        div: {
                          bgcolor: `${theme === "light"
                              ? "rgba(0, 0, 0, 0.06)"
                              : "#ffffff !important"
                            }`,
                        },
                      }}
                      onChange={(e) => {
                        setAdminDetails((state) => {
                          return { ...state, fullName: e.target.value };
                        });
                      }}
                    />
                  ) : (
                    <Box sx={{ pl: "30px" }}>
                      {adminDetails?.fullName || "-"}
                    </Box>
                  )}
                </Box>
                <Box sx={{ display: "flex", py: "10px", alignItems: "center" }}>
                  <Box
                    sx={{
                      minWidth: "150px",
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <Box>Fathers Name</Box>
                    <Box>:</Box>
                  </Box>
                  {isEdit ? (
                    <TextField
                      value={adminDetails?.fatherName}
                      id="filled-basic"
                      variant="filled"
                      size="small"
                      className="personalInput"
                      sx={{
                        pl: "30px",
                        div: {
                          bgcolor: `${theme === "light"
                              ? "rgba(0, 0, 0, 0.06)"
                              : "#ffffff !important"
                            }`,
                        },
                      }}
                      onChange={(e) => {
                        setAdminDetails((state) => {
                          return { ...state, fatherName: e.target.value };
                        });
                      }}
                    />
                  ) : (
                    <Box sx={{ pl: "30px" }}>
                      {adminDetails?.fatherName || "-"}
                    </Box>
                  )}
                </Box>
                <Box sx={{ display: "flex", py: "10px", alignItems: "center" }}>
                  <Box
                    sx={{
                      minWidth: "150px",
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <Box>Address</Box>
                    <Box>:</Box>
                  </Box>
                  {isEdit ? (
                    <TextField
                      value={adminDetails?.address}
                      id="filled-basic"
                      variant="filled"
                      size="small"
                      className="personalInput"
                      sx={{
                        pl: "30px",
                        div: {
                          bgcolor: `${theme === "light"
                              ? "rgba(0, 0, 0, 0.06)"
                              : "#ffffff !important"
                            }`,
                        },
                      }}
                      onChange={(e) => {
                        setAdminDetails((state) => {
                          return { ...state, address: e.target.value };
                        });
                      }}
                    />
                  ) : (
                    <Box sx={{ pl: "30px" }}>
                      {adminDetails?.address || "-"}
                    </Box>
                  )}
                </Box>
                <Box sx={{ display: "flex", py: "10px", alignItems: "center" }}>
                  <Box
                    sx={{
                      minWidth: "150px",
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <Box>City</Box>
                    <Box>:</Box>
                  </Box>
                  {isEdit ? (
                    <TextField
                      value={adminDetails?.city}
                      id="filled-basic"
                      variant="filled"
                      size="small"
                      className="personalInput"
                      sx={{
                        pl: "30px",
                        div: {
                          bgcolor: `${theme === "light"
                              ? "rgba(0, 0, 0, 0.06)"
                              : "#ffffff !important"
                            }`,
                        },
                      }}
                      onChange={(e) => {
                        setAdminDetails((state) => {
                          return { ...state, city: e.target.value };
                        });
                      }}
                    />
                  ) : (
                    <Box sx={{ pl: "30px" }}>{adminDetails?.city || "-"}</Box>
                  )}
                </Box>
                <Box sx={{ display: "flex", py: "10px", alignItems: "center" }}>
                  <Box
                    sx={{
                      minWidth: "150px",
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <Box>Phone</Box>
                    <Box>:</Box>
                  </Box>
                  {isEdit ? (
                    <TextField
                      value={adminDetails?.phone}
                      id="filled-basic"
                      variant="filled"
                      size="small"
                      className="personalInput"
                      sx={{
                        pl: "30px",
                        div: {
                          bgcolor: `${theme === "light"
                              ? "rgba(0, 0, 0, 0.06)"
                              : "#ffffff !important"
                            }`,
                        },
                      }}
                      onChange={(e) => {
                        setAdminDetails((state) => {
                          return { ...state, phone: e.target.value };
                        });
                      }}
                    />
                  ) : (
                    <Box sx={{ pl: "30px" }}>{adminDetails?.phone || "-"}</Box>
                  )}
                </Box>
                <Box sx={{ display: "flex", py: "10px", alignItems: "center" }}>
                  <Box
                    sx={{
                      minWidth: "150px",
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <Box>Email</Box>
                    <Box>:</Box>
                  </Box>
                  {isEdit ? (
                    <TextField
                      value={adminDetails?.email}
                      id="filled-basic"
                      variant="filled"
                      size="small"
                      className="personalInput"
                      sx={{
                        pl: "30px",
                        div: {
                          bgcolor: `${theme === "light"
                              ? "rgba(0, 0, 0, 0.06)"
                              : "#ffffff !important"
                            }`,
                        },
                      }}
                      onChange={(e) => {
                        setAdminDetails((state) => {
                          return { ...state, email: e.target.value };
                        });
                      }}
                    />
                  ) : (
                    <Box sx={{ pl: "30px" }}>{adminDetails?.email || "-"}</Box>
                  )}
                </Box>
                <Box sx={{ display: "flex", py: "10px", alignItems: "center" }}>
                  <Box
                    sx={{
                      minWidth: "150px",
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <Box>Position</Box>
                    <Box>:</Box>
                  </Box>
                  {isEdit ? (
                    <TextField
                      value={adminDetails?.position}
                      id="filled-basic"
                      variant="filled"
                      size="small"
                      className="personalInput"
                      sx={{
                        pl: "30px",
                        div: {
                          bgcolor: `${theme === "light"
                              ? "rgba(0, 0, 0, 0.06)"
                              : "#ffffff !important"
                            }`,
                        },
                      }}
                      onChange={(e) => {
                        setAdminDetails((state) => {
                          return { ...state, position: e.target.value };
                        });
                      }}
                    />
                  ) : (
                    <Box sx={{ pl: "30px" }}>
                      {adminDetails?.position || "-"}
                    </Box>
                  )}
                </Box>
              </Box>
              {isEdit && (
                <Box
                  sx={{ display: "flex", justifyContent: "right", gap: "15px" }}
                  onClick={() => {
                    setIsEdit(false);
                    updateDetails();
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#088b89",
                      "&:hover": { backgroundColor: "#1a6968" },
                    }}
                  >
                    Save
                  </Button>
                </Box>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              border: "1px solid #cacaca",
              borderRadius: "10px",
              my: "20px",
              boxShadow:
                "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: "15px",
                px: "15px",
                alignItems: "center",
                borderBottom: "1px solid #cacaca",
              }}
            >
              <Box sx={{ fontWeight: "bold", fontSize: "h6.fontSize" }}>
                Education
              </Box>
              <Box>
                {isAddEdu ? (
                  <IconButton
                    onClick={() => {
                      setIsAddEdu(false);
                      setAddAdminEducationalData({});
                    }}
                  >
                    <HighlightOffIcon sx={{ color: "red" }} />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      setIsAddEdu(true);
                    }}
                  >
                    <ControlPointIcon
                      sx={{ color: `${isAddEdu ? "#088b89" : color}` }}
                    />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box sx={{ py: "20px", px: "15px" }}>
              {adminEducationalData.map((data, index) => {
                return (
                  <Box sx={{ display: "flex", width: "100%" }}>
                    <Box sx={{ pr: "40px", py: "15px", width: "25%" }}>
                      <Box sx={{ fontWeight: "bold", pb: "5px" }}>
                        {data.startYear}-{data.endYear}
                      </Box>
                      <Box>{data.degree}</Box>
                    </Box>
                    <Box sx={{ pl: "40px", py: "15px", width: "75%" }}>
                      <Box sx={{ fontWeight: "bold", pb: "5px" }}>
                        {data.major}
                      </Box>
                      <Box>{data.institute}</Box>
                    </Box>
                  </Box>
                );
              })}
              {isAddEdu && (
                <>
                  <Box
                    sx={{
                      height: "2px",
                      width: "100%",
                      backgroundColor: color,
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", width: "100%" }}>
                    <Box sx={{ pr: "40px", py: "15px", width: "25%" }}>
                      <Box
                        sx={{
                          fontWeight: "bold",
                          pb: "5px",
                          position: "relative",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            pb: "5px",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>Start year</Box>
                          <TextField
                            id="filled-basic"
                            value={addAdminEducationalData.startYear}
                            aria-readonly
                            variant="filled"
                            size="small"
                            className="personalInput"
                            sx={{
                              minWidth: "65px",
                              maxWidth: "65px",
                              div: {
                                bgcolor: `${theme === "light"
                                    ? "rgba(0, 0, 0, 0.06)"
                                    : "#ffffff !important"
                                  }`,
                              },
                            }}
                            onClick={() => {
                              setIsEduYearStartOpen(true);
                              setIsEduYearEndOpen(false);
                            }}
                            onChange={(e) => {
                              console.log(e.target.value);
                            }}
                          />
                          {isEduYearStartOpen && (
                            <Box
                              sx={{ position: "absolute", zIndex: 2 }}
                              ref={yearSelectBox}
                            >
                              <YearPicker
                                selectedYear={eduStartYear}
                                onClick={handleEduStartYearChange}
                              />
                            </Box>
                          )}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            pt: "5px",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>End year</Box>
                          <TextField
                            id="filled-basic"
                            value={addAdminEducationalData.endYear}
                            aria-readonly
                            variant="filled"
                            size="small"
                            className="personalInput"
                            sx={{
                              minWidth: "65px",
                              maxWidth: "65px",
                              ml: "3.5px",
                              div: {
                                bgcolor: `${theme === "light"
                                    ? "rgba(0, 0, 0, 0.06)"
                                    : "#ffffff !important"
                                  }`,
                              },
                            }}
                            onClick={() => {
                              setIsEduYearEndOpen(true);
                              setIsEduYearStartOpen(false);
                            }}
                          />
                          {isEduYearEndOpen && (
                            <Box
                              sx={{ position: "absolute", zIndex: 2 }}
                              ref={yearSelectBox}
                            >
                              <YearPicker
                                selectedYear={eduStartYear}
                                onClick={handleEduEndYearChange}
                              />
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Box>
                        <FormControl
                          variant="filled"
                          sx={{ mt: 1, minWidth: "109px", width: "100%" }}
                          size="small"
                        >
                          <InputLabel id="demo-simple-select-filled-label">
                            Education
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={addAdminEducationalData.degree}
                            onChange={handleEducationChange}
                            sx={{
                              bgcolor: `${theme === "light"
                                  ? "rgba(0, 0, 0, 0.06)"
                                  : "#ffffff !important"
                                }`,
                            }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={"School"}>School</MenuItem>
                            <MenuItem value={"Bachelor"}>Bachelor</MenuItem>
                            <MenuItem value={"Master Degree"}>
                              Master Degree
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                    <Box sx={{ pl: "40px", py: "15px", width: "75%" }}>
                      <Box sx={{ fontWeight: "bold", pb: "10px" }}>
                        <TextField
                          id="filled-basic"
                          value={addAdminEducationalData.major}
                          variant="filled"
                          size="small"
                          className="personalInput"
                          placeholder="Enter your education details"
                          sx={{
                            width: "100%",
                            div: {
                              bgcolor: `${theme === "light"
                                  ? "rgba(0, 0, 0, 0.06)"
                                  : "#ffffff !important"
                                }`,
                            },
                          }}
                          onChange={(e) => {
                            setAddAdminEducationalData((state) => {
                              return { ...state, major: e.target.value };
                            });
                          }}
                        />
                      </Box>
                      <Box>
                        <TextField
                          id="filled-basic"
                          value={addAdminEducationalData.institute}
                          variant="filled"
                          size="small"
                          className="personalInput"
                          placeholder="Enter your institute details"
                          sx={{
                            width: "100%",
                            div: {
                              bgcolor: `${theme === "light"
                                  ? "rgba(0, 0, 0, 0.06)"
                                  : "#ffffff !important"
                                }`,
                            },
                          }}
                          onChange={(e) => {
                            setAddAdminEducationalData((state) => {
                              return { ...state, institute: e.target.value };
                            });
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "right",
                      gap: "15px",
                    }}
                    onClick={() => {
                      setIsAddEdu(false);
                      updateEducation();
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#088b89",
                        "&:hover": { backgroundColor: "#1a6968" },
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              border: "1px solid #cacaca",
              borderRadius: "10px",
              my: "20px",
              boxShadow:
                "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: "15px",
                px: "15px",
                alignItems: "center",
                borderBottom: "1px solid #cacaca",
              }}
            >
              <Box sx={{ fontWeight: "bold", fontSize: "h6.fontSize" }}>
                Employment
              </Box>
              <Box>
                <IconButton
                  onClick={() => {
                    setIsAddEmp(true);
                  }}
                >
                  <ControlPointIcon
                    sx={{ color: `${isAddEmp ? "#088b89" : color}` }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ py: "20px", px: "15px" }}>
              <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ pr: "40px", py: "15px", width: "25%" }}>
                  <Box sx={{ fontWeight: "bold", pb: "5px" }}>Current</Box>
                </Box>
                <Box sx={{ pl: "40px", py: "15px", width: "75%" }}>
                  <Box sx={{ fontWeight: "bold", pb: "5px" }}>
                    Senior UI/UX designer
                  </Box>
                  <Box>
                    Perform task related to project manager with the 100+ team
                    under my observation. Team. management is key role in this
                    company.
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ pr: "40px", py: "15px", width: "25%" }}>
                  <Box sx={{ fontWeight: "bold", pb: "5px" }}>2017-2019</Box>
                </Box>
                <Box sx={{ pl: "40px", py: "15px", width: "75%" }}>
                  <Box sx={{ fontWeight: "bold", pb: "5px" }}>
                    Trainee cum Project Manager
                  </Box>
                  <Box>Microsoft, TX, USA</Box>
                </Box>
              </Box>
              {isAddEmp && (
                <>
                  <Box
                    sx={{
                      height: "2px",
                      width: "100%",
                      backgroundColor: color,
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", width: "100%" }}>
                    <Box sx={{ pr: "40px", py: "15px", width: "25%" }}>
                      <Box
                        sx={{
                          fontWeight: "bold",
                          pb: "5px",
                          position: "relative",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            pb: "5px",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>Start year</Box>
                          <TextField
                            id="filled-basic"
                            value={empStartYear}
                            aria-readonly
                            variant="filled"
                            size="small"
                            className="personalInput"
                            sx={{
                              minWidth: "65px",
                              maxWidth: "65px",
                              div: {
                                bgcolor: `${theme === "light"
                                    ? "rgba(0, 0, 0, 0.06)"
                                    : "#ffffff !important"
                                  }`,
                              },
                            }}
                            onClick={() => {
                              setIsEmpYearStartOpen(true);
                              setIsEmpYearEndOpen(false);
                            }}
                          />
                          {isEmpYearStartOpen && (
                            <Box
                              sx={{ position: "absolute", zIndex: 2 }}
                              ref={yearSelectBox}
                            >
                              <YearPicker
                                selectedYear={empStartYear}
                                onClick={handleEmpStartYearChange}
                              />
                            </Box>
                          )}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            pt: "5px",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>End year</Box>
                          <TextField
                            id="filled-basic"
                            value={empEndYear}
                            aria-readonly
                            variant="filled"
                            size="small"
                            className="personalInput"
                            sx={{
                              minWidth: "65px",
                              maxWidth: "65px",
                              ml: "3.5px",
                              div: {
                                bgcolor: `${theme === "light"
                                    ? "rgba(0, 0, 0, 0.06)"
                                    : "#ffffff !important"
                                  }`,
                              },
                            }}
                            onClick={() => {
                              setIsEmpYearEndOpen(true);
                              setIsEmpYearStartOpen(false);
                            }}
                          />
                          {isEmpYearEndOpen && (
                            <Box
                              sx={{ position: "absolute", zIndex: 2 }}
                              ref={yearSelectBox}
                            >
                              <YearPicker
                                selectedYear={empEndYear}
                                onClick={handleEmpEndYearChange}
                              />
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ pl: "40px", py: "15px", width: "75%" }}>
                      <Box sx={{ fontWeight: "bold", pb: "10px" }}>
                        <TextField
                          id="filled-basic"
                          variant="filled"
                          size="small"
                          className="personalInput"
                          placeholder="Enter your role"
                          sx={{
                            width: "100%",
                            div: {
                              bgcolor: `${theme === "light"
                                  ? "rgba(0, 0, 0, 0.06)"
                                  : "#ffffff !important"
                                }`,
                            },
                          }}
                        />
                      </Box>
                      <Box>
                        <TextField
                          id="filled-basic"
                          variant="filled"
                          size="small"
                          className="personalInput"
                          placeholder="Enter your work in organization"
                          sx={{
                            width: "100%",
                            div: {
                              bgcolor: `${theme === "light"
                                  ? "rgba(0, 0, 0, 0.06)"
                                  : "#ffffff !important"
                                }`,
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "right",
                      gap: "15px",
                    }}
                    onClick={() => {
                      setIsAddEmp(false);
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#088b89",
                        "&:hover": { backgroundColor: "#1a6968" },
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#ff0000d6",
                        "&:hover": { backgroundColor: "red" },
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Box>

          {/* <Box sx={{ border: '1px solid #cacaca', borderRadius: '10px', mt: '20px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: '15px', px: '15px', alignItems: 'center', borderBottom: '1px solid #cacaca' }}>
                            <Box sx={{ fontWeight: 'bold', fontSize: 'h6.fontSize' }}>Skills</Box>
                        </Box>
                        <Box sx={{ py: '20px', px: '15px' }}>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <Box sx={{ pr: '20px', py: '10px', width: '50%' }}>
                                    <Box sx={{ fontWeight: 'bold' }}>Junior</Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Box sx={{ height: '4px', width: '100%', backgroundColor: '#a9d7fa' }}>
                                            <Box sx={{ width: '70%', backgroundColor: '#1795f3', height: '100%' }}></Box>
                                        </Box>
                                        <Box>70%</Box>
                                    </Box>
                                </Box>
                                <Box sx={{ pl: '20px', py: '10px', width: '50%' }}>
                                    <Box sx={{ fontWeight: 'bold' }}>UX Researcher</Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Box sx={{ height: '4px', width: '100%', backgroundColor: '#a9d7fa' }}>
                                            <Box sx={{ width: '80%', backgroundColor: '#1795f3', height: '100%' }}></Box>
                                        </Box>
                                        <Box>80%</Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <Box sx={{ pr: '20px', py: '10px', width: '50%' }}>
                                    <Box sx={{ fontWeight: 'bold' }}>Wordpress</Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Box sx={{ height: '4px', width: '100%', backgroundColor: '#cabbe4' }}>
                                            <Box sx={{ width: '25%', backgroundColor: '#764cbd', height: '100%' }}></Box>
                                        </Box>
                                        <Box>25%</Box>
                                    </Box>
                                </Box>
                                <Box sx={{ pl: '20px', py: '10px', width: '50%' }}>
                                    <Box sx={{ fontWeight: 'bold' }}>Graphic Designer</Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Box sx={{ height: '4px', width: '100%', backgroundColor: '#a9d7fa' }}>
                                            <Box sx={{ width: '80%', backgroundColor: '#1795f3', height: '100%' }}></Box>
                                        </Box>
                                        <Box>80%</Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <Box sx={{ pr: '20px', py: '10px', width: '50%' }}>
                                    <Box sx={{ fontWeight: 'bold' }}>HTML</Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Box sx={{ height: '4px', width: '100%', backgroundColor: '#cabbe4' }}>
                                            <Box sx={{ width: '45%', backgroundColor: '#764cbd', height: '100%' }}></Box>
                                        </Box>
                                        <Box>45%</Box>
                                    </Box>
                                </Box>
                                <Box sx={{ pl: '20px', py: '10px', width: '50%' }}>
                                    <Box sx={{ fontWeight: 'bold' }}>PHP</Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Box sx={{ height: '4px', width: '100%', backgroundColor: '#a9d7fa' }}>
                                            <Box sx={{ width: '65%', backgroundColor: '#1795f3', height: '100%' }}></Box>
                                        </Box>
                                        <Box>65%</Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box> */}
        </Box>
        {open ? (
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="headerDiv">
                <div className="cancelModel">
                  <HighlightOffIcon
                    onClick={handleClose}
                    sx={{ cursor: "pointer" }}
                  />
                </div>
                <div className="profileheader">Profile Picture</div>
              </div>
              <Box className="imageAndButton">
                <img
                  src={!change ? profile : URL.createObjectURL(file)}
                  alt=""
                  style={{
                    height: "216px",
                    borderRadius: "134px",
                    width: "100%",
                    outline: "4px solid #088b89",
                  }}
                  className="shadow"
                />
                {!change ? <Button
                  variant="outlined"
                  startIcon={<BorderColorIcon sx={{ cursor: "pointer" }} />}
                  className="modalButton"
                >
                  Change
                  <input
                    type="file"
                    onChange={(e) => { profileChange(e) }}
                    style={{ position: "absolute", top: 0, opacity: 0 }}
                  />
                </Button> : <Button
                  className="modalButton"
                  variant="outlined"
                  startIcon={
                    <CloudUploadIcon sx={{ cursor: "pointer" }} />
                  }
                  onClick={handleUpload}
                >Upload</Button>
                }
              </Box>
            </Box>
          </Modal>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
export default PersonalDetails;
