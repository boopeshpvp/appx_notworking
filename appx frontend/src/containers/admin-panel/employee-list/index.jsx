import React, { useEffect, useState } from "react";
import "../employee-list/style.css";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EmailIcon from "@mui/icons-material/Email";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import EmailIcon from "@mui/icons-material/Email";
import SearchIcon from "@mui/icons-material/Search";
import Image1 from "../../../assets/image1.jpg";
import Image2 from "../../../assets/image2.jpg";
import Image3 from "../../../assets/image3.jpg";
import Image4 from "../../../assets/image4.jpg";
import Image5 from "../../../assets/image5.jpg";
import Profile1 from "../../../assets/profile1.jpg";
import Profile2 from "../../../assets/profile2.jpg";
import Profile3 from "../../../assets/profile3.jpg";
import Profile4 from "../../../assets/profile4.jpg";
import Profile5 from "../../../assets/profile5.jpg";

import {
  Avatar,
  Box,
  ButtonGroup,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  MenuList,
  OutlinedInput,
  Pagination,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Grow from "@mui/material/Grow";
import Menu from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { AiOutlineSortDescending } from "react-icons/ai";
import { BsTable } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa6";
import {
  HiOutlineIdentification,
  HiSortAscending,
  HiSortDescending,
} from "react-icons/hi";
import { IoIosTime } from "react-icons/io";
import { LiaSortAlphaDownAltSolid } from "react-icons/lia";
import { MdPeopleAlt } from "react-icons/md";
import { PiCakeFill } from "react-icons/pi";
import { TbReport } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DefaultProfile from "../../../assets/defaultProfile.webp";
import CustomizedButton from "../../../components/button";
import LoaderComp from "../../../components/loader";
import SendEmail from "../../../components/sendEmail/sendemail";
import SideNavbar from "../../sidenavbar";
import usePagination from "./pageination";


const EmployeeList = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [clickSort, setclickSort] = useState(true);
  const [sortData, setSortData] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropTerm, setDropTerm] = useState("");
  const [uniqueRole, setUniqueRole] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [resetData, setResetData] = useState(false);
  const [isTableView, setIsTableView] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [closeCard, setCloseCard] = useState(false);
  const [showImage, setShowImage] = React.useState(true);
  const opens = Boolean(anchorEl);
  const coverPic = [Image1, Image2, Image3, Image4, Image5];
  const ProfilePic = [Profile1, Profile2, Profile3, Profile4, Profile5];

  const color = useSelector((state) => state.color);
  const bgColor = useSelector((state) => state.bgColor);

  const handleNav = (employeename, employeeImage, employeeRole, id) => {
    console.log("hello");
    console.log(employeename, employeeImage, employeeRole, id);
    let updatedValue = {
      employeeName: employeename,
      employeeProfile: employeeImage,
      employeeRole: employeeRole,
    };
    localStorage.setItem("userProfile", JSON.stringify(updatedValue));
    navigate(
      `/admin/detailview/${id}`
      // navigate("/admin/detailview"
      // , {
      //   state: {
      //     name: employeename,
      //   },
      // }
    );
  };

  const [empData, setEmployeeData] = useState([]);
  const handleDetailedView = (details) => {
    console.log("details of card", details);
    setCardData(details);
    setCloseCard(false);
    setShowImage(false);
  };

  const displayRoles = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const filterByRole = (e) => {
    setAnchorEl(null);
    setResetData(true);
    setDropTerm(e);
    sortByRoleInput(e);
  };

  const filterBySearch = (event) => {
    setSearchTerm(event);
    sortByNameInput(event);
  };

  // const displayAllData = () => {
  //   setDropTerm("");
  //   setResetData(false);
  // };

  // const main = (employ) => {
  //   const filteredEmployees = employ.filter((employeeData) => {
  //     if (dropTerm) {
  //       return employeeData.position
  //         .toLowerCase()
  //         .includes(dropTerm.toLowerCase());
  //     } else {
  //       return employeeData;
  //     }
  //   });
  //   return filteredEmployees.filter((data) => {
  //     if (searchTerm) {
  //       return data.name.toLowerCase().includes(searchTerm.toLowerCase());
  //     } else {
  //       return data;
  //     }
  //   });
  // };

  const handleSorting = () => {
    setSortData(!sortData);
    _DATA.sortbyOrder(sortData, options, selectedIndex);
  };

  const handleIndexClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    setclickSort(false);
    _DATA.sortbyName_Role(sortData, event);
  };

  // const handleSorting = () => {
  //   setSortData(!sortData);
  //   if (options[selectedIndex] === "Sort By Name" && sortData === true) {
  //     return employee.sort((higherOrderAlpabet, lowerOrderAlpabet) => {
  //       let initialAlpabet = lowerOrderAlpabet.name.toLowerCase();
  //       let endAlpabet = higherOrderAlpabet.name.toLowerCase();
  //       if (initialAlpabet < endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet > endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   } else if (
  //     options[selectedIndex] === "Sort By Name" &&
  //     sortData === false
  //   ) {
  //     return employee.sort((lowerOrderAlpabet, higherOrderAlpabet) => {
  //       let initialAlpabet = lowerOrderAlpabet.name.toLowerCase();
  //       let endAlpabet = higherOrderAlpabet.name.toLowerCase();
  //       if (initialAlpabet < endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet > endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   }
  //   if (options[selectedIndex] === "Sort by Role" && sortData === true) {
  //     return employee.sort((higherOrderAlpabet, lowerOrderAlpabet) => {
  //       let initialAlpabet = lowerOrderAlpabet.position.toLowerCase();
  //       let endAlpabet = higherOrderAlpabet.position.toLowerCase();
  //       if (initialAlpabet< endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet> endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   } else if (
  //     options[selectedIndex] === "Sort by Role" &&
  //     sortData === false
  //   ) {
  //     return employee.sort((lowerOrderAlpabet,higherOrderAlpabet) => {
  //       let initialAlpabet = lowerOrderAlpabet.position.toLowerCase();
  //       let endAlpabet = higherOrderAlpabet.position.toLowerCase();
  //       if (initialAlpabet < endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet > endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   }
  // };
  // const handleSorting = () => {
  //   setSortData(!sortData);
  //   if (options[selectedIndex] === "Sort By Name" && sortData === true) {
  //     return employee.sort((higherOrderAlpabet, lowerOrderAlpabet) => {
  //       let initialAlpabet = lowerOrderAlpabet.name.toLowerCase();
  //       let endAlpabet = higherOrderAlpabet.name.toLowerCase();
  //       if (initialAlpabet < endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet > endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   } else if (
  //     options[selectedIndex] === "Sort By Name" &&
  //     sortData === false
  //   ) {
  //     return employee.sort((lowerOrderAlpabet, higherOrderAlpabet) => {
  //       let initialAlpabet = lowerOrderAlpabet.name.toLowerCase();
  //       let endAlpabet = higherOrderAlpabet.name.toLowerCase();
  //       if (initialAlpabet < endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet > endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   }
  //   if (options[selectedIndex] === "Sort by Role" && sortData === true) {
  //     return employee.sort((higherOrderAlpabet, lowerOrderAlpabet) => {
  //       let initialAlpabet = lowerOrderAlpabet.position.toLowerCase();
  //       let endAlpabet = higherOrderAlpabet.position.toLowerCase();
  //       if (initialAlpabet< endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet> endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   } else if (
  //     options[selectedIndex] === "Sort by Role" &&
  //     sortData === false
  //   ) {
  //     return employee.sort((lowerOrderAlpabet,higherOrderAlpabet) => {
  //       let initialAlpabet = lowerOrderAlpabet.position.toLowerCase();
  //       let endAlpabet = higherOrderAlpabet.position.toLowerCase();
  //       if (initialAlpabet < endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet > endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   }
  // };

  // const handleIndexClick = (event, index) => {
  //   setSelectedIndex(index);
  //   setOpen(false);
  //   setclickSort(false);
  //   if (event.target.tabIndex === 0 && sortData === true) {
  //     return employee.sort((lowerOrderAlpabet,higherOrderAlpabet) => {
  //       let initialAlpabet = lowerOrderAlpabet.name.toLowerCase();
  //       let endAlpabet =higherOrderAlpabet.name.toLowerCase();
  //       if (initialAlpabet < endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet > endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   } else if (event.target.tabIndex === 0 && sortData === false) {
  //     return employee.sort((higherOrderAlpabet, lowerOrderAlpabet) => {
  //       let initialAlpabet = lowerOrderAlpabet.name.toLowerCase();
  //       let endAlpabet = higherOrderAlpabet.name.toLowerCase();
  //       if (initialAlpabet < endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet > endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   } else if (event.target.tabIndex === -1 && sortData === true) {
  //     return employee.sort((lowerOrderAlpabet,higherOrderAlpabet) => {
  //       let initialAlpabet = lowerOrderAlpabet.position.toLowerCase();
  //       let endAlpabet =higherOrderAlpabet.position.toLowerCase();
  //       if (initialAlpabet < endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet > endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   } else {
  //     return employee.sort((higherOrderAlpabet,lowerOrderAlpabet) => {
  //       let initialAlpabet =lowerOrderAlpabet.position.toLowerCase();
  //       let endAlpabet =higherOrderAlpabet.position.toLowerCase();
  //       if (initialAlpabet < endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet > endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   }
  // };
  // const handleIndexClick = (event, index) => {
  //   setSelectedIndex(index);
  //   setOpen(false);
  //   setclickSort(false);
  //   if (event.target.tabIndex === 0 && sortData === true) {
  //     return employee.sort((lowerOrderAlpabet,higherOrderAlpabet) => {
  //       let initialAlpabet = lowerOrderAlpabet.name.toLowerCase();
  //       let endAlpabet =higherOrderAlpabet.name.toLowerCase();
  //       if (initialAlpabet < endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet > endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   } else if (event.target.tabIndex === 0 && sortData === false) {
  //     return employee.sort((higherOrderAlpabet, lowerOrderAlpabet) => {
  //       let initialAlpabet = lowerOrderAlpabet.name.toLowerCase();
  //       let endAlpabet = higherOrderAlpabet.name.toLowerCase();
  //       if (initialAlpabet < endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet > endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   } else if (event.target.tabIndex === -1 && sortData === true) {
  //     return employee.sort((lowerOrderAlpabet,higherOrderAlpabet) => {
  //       let initialAlpabet = lowerOrderAlpabet.position.toLowerCase();
  //       let endAlpabet =higherOrderAlpabet.position.toLowerCase();
  //       if (initialAlpabet < endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet > endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   } else {
  //     return employee.sort((higherOrderAlpabet,lowerOrderAlpabet) => {
  //       let initialAlpabet =lowerOrderAlpabet.position.toLowerCase();
  //       let endAlpabet =higherOrderAlpabet.position.toLowerCase();
  //       if (initialAlpabet < endAlpabet) {
  //         return -1;
  //       }
  //       if (initialAlpabet > endAlpabet) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   }
  // };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const columns = [
    { id: "firstName", label: "Name", minWidth: 170, align: "left" },
    { id: "position", label: "Role", minWidth: 170, align: "left" },
    {
      id: "location",
      label: "Branch",
      minWidth: 170,
      align: "left",
    },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
      align: "left",
    },
  ];

  const options = ["By Name", "By Role"];

  const [rows, setRows] = useState([]);

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let [pages, setPages] = useState(1);
  const PER_PAGE = 8;
  const count = Math.ceil(empData.length / PER_PAGE);
  const _DATA = usePagination(empData, PER_PAGE);
  const handleChange = (e, p) => {
    setPages(p);
    _DATA.jump(p);
  };

  const sortByNameInput = (value) => {
    const tempList =
      dropTerm === "All" || dropTerm === ""
        ? empData
        : empData.filter((obj) => {
            return obj.position === dropTerm;
          });

    const newList = tempList.filter((obj) => {
      return obj.firstName.toLowerCase().indexOf(value.toLowerCase()) === 0;
    });
    _DATA.sortByNameInput(newList);

    console.log("newList", newList);
    setRows(newList);
    handleDetailedView([]);
    setShowImage(true);
  };

  const sortByRoleInput = (value) => {
    const tempList =
      searchTerm === ""
        ? empData
        : empData.filter((obj) => {
            return (
              obj.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) ===
              0
            );
          });

    const newList = tempList.filter((obj) => {
      return obj.position === value || value === "All";
    });
    _DATA.sortByRoleInput(newList);

    return newList;
  };

  useEffect(() => {
    const uniqueAuthors = empData.reduce((accumulator, current) => {
      if (!accumulator.find((item) => item.position === current.position)) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);
    setUniqueRole([{ position: "All" }, ...uniqueAuthors]);
  }, [empData]);

  const [isemail, setIsEmail] = useState(false);
  const [tomail, setToMail] = useState("");
  const showMail = (e) => {
    setIsEmail(true);
    setToMail(e);
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await fetch(
        `http://${process.env.REACT_APP_NODE_BASE_URL}:4000/user/getEmployee`
      )
        .then((res) => res.json())
        .then((r) => {
          setEmployeeData(r.data);
          setRows(r.data);
        })
        .catch((err) => console.error(err));

      console.log(result);
      setLoading(false);
    })();
  }, []);

  console.log(resetData);

  return (
    <>
      <SideNavbar logoff={props}>
        {!loading ? (
          <>
            {empData.length > 0 ? (
              <>
                <Box className="buttonGroupDisplay" sx={{ bgcolor: bgColor }}>
                  {/* <>
                                                {resetData ? (
                                                    <CustomizedButton className="resetData boxShadow" onClick={displayAllData} innerIcon={<ReplayIcon />} />
                                                    // <Button className="resetData" onClick={displayAllData}>
                                                    //   <ReplayIcon />
                                                    // </Button>
                                                ) : (
                                                    <></>
                                                )}
                                            </> */}
                  <div>
                    <FormControl
                      sx={{
                        outline: "none",
                        borderColor: "#26bf47",
                        boxShadow: "0 0 10px #088b89",
                        borderRadius: "5px",
                        border: "none !important",
                        backgroundColor: "white",
                      }}
                      variant="outlined"
                    >
                      <OutlinedInput
                        sx={{
                          borderRadius: "5px",
                          maxWidth: "100%",
                          height: 38,
                        }}
                        className="boxShadow"
                        placeholder="Find by name"
                        value={searchTerm}
                        onChange={(e) => filterBySearch(e.target.value)}
                        startAdornment={
                          <InputAdornment position="start">
                            <IconButton>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            {searchTerm.length > 0 && (
                              <IconButton onClick={() => filterBySearch("")}>
                                <HighlightOffIcon />
                              </IconButton>
                            )}
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                  <div className="filterDiv">
                    <Tooltip title={isTableView ? "Card View" : "Table View"}>
                      <IconButton
                        onClick={() => setIsTableView(!isTableView)}
                        size="small"
                        sx={{ mr: 2, p: "11px" }}
                        aria-controls={opens ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={opens ? "true" : undefined}
                        color="#088b89"
                        className="boxShadow"
                      >
                        {isTableView ? (
                          <FaRegAddressCard />
                        ) : (
                          <BsTable className="tableFilter" />
                        )}
                      </IconButton>
                    </Tooltip>
                    {!isTableView && (
                      <Tooltip title="Filter by position">
                        <IconButton
                          onClick={displayRoles}
                          size="small"
                          sx={{ mr: 2, p: "11px" }}
                          aria-controls={opens ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={opens ? "true" : undefined}
                          color="#088b89"
                          className="boxShadow"
                        >
                          <FilterAltIcon className="filterIcon" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={opens}
                      onClose={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      {uniqueRole.map((empData, index) => {
                        return (
                          <MenuItem
                            key={index}
                            onClick={() => filterByRole(empData.position)}
                            value={empData.position}
                          >
                            {empData.position}
                          </MenuItem>
                        );
                      })}
                    </Menu>

                    {!isTableView && (
                      <ButtonGroup
                        variant="contained"
                        ref={anchorRef}
                        aria-label="split button"
                        className="sortButton"
                      >
                        <CustomizedButton
                          endIcon={<ArrowDropDownIcon />}
                          onClick={handleToggle}
                          type="submit"
                          className="sorticondisplay boxShadow"
                          sx={{ backgroundColor: "#088b89" }}
                          buttonName={
                            clickSort ? (
                              "sort"
                            ) : options[selectedIndex] === "By Name" ? (
                              sortData ? (
                                <Box className="sorticondisplay">
                                  <AiOutlineSortDescending
                                    style={{ fontSize: "22px" }}
                                  />
                                  Sort By Name
                                </Box>
                              ) : (
                                <Box className="sorticondisplay">
                                  <LiaSortAlphaDownAltSolid
                                    style={{ fontSize: "22px" }}
                                  />
                                  Sort By Name
                                </Box>
                              )
                            ) : sortData ? (
                              <Box className="sorticondisplay">
                                <AiOutlineSortDescending
                                  style={{ fontSize: "20px" }}
                                />
                                Sort By Role
                              </Box>
                            ) : (
                              <Box className="sorticondisplay">
                                <LiaSortAlphaDownAltSolid
                                  style={{ fontSize: "20px" }}
                                />
                                Sort By Role
                              </Box>
                            )
                          }
                        />

                        {/* <Button
                                                            style={{ backgroundColor: "#088b89" }}
                                                            onClick={handleToggle}
                                                            endIcon={<ArrowDropDownIcon />}
                                                        >
                                                            {clickSort ? (
                                                                "sort"
                                                            ) : options[selectedIndex] === "Sort By Name" ? (
                                                                sortData ? (
                                                                    <Box className="sorticondisplay">
                                                                        <AiOutlineSortDescending style={{ fontSize: "22px" }} />
                                                                        Sort By Name
                                                                    </Box>
                                                                ) : (
                                                                    <Box className="sorticondisplay">
                                                                        <LiaSortAlphaDownAltSolid style={{ fontSize: "22px" }} />
                                                                        Sort By Name
                                                                    </Box>
                                                                )
                                                            ) : sortData ? (
                                                                <Box className="sorticondisplay">
                                                                    <AiOutlineSortDescending style={{ fontSize: "20px" }} />
                                                                    Sort by Role
                                                                </Box>
                                                            ) : (
                                                                <Box className="sorticondisplay">
                                                                    <LiaSortAlphaDownAltSolid style={{ fontSize: "20px" }} />
                                                                    Sort by Role
                                                                </Box>
                                                            )}
                                                        </Button> */}
                        {!clickSort && (
                          <CustomizedButton
                            className="boxShadow"
                            type="submit"
                            onClick={handleSorting}
                            sx={{
                              backgroundColor: "#088b89",
                              color: clickSort ? "white" : "white",
                            }}
                            disabled={clickSort ? true : false}
                            innerIcon={
                              sortData ? (
                                <HiSortAscending
                                  size="20px"
                                  title="Click to sort by desending"
                                />
                              ) : (
                                <HiSortDescending
                                  size="20px"
                                  title="Click to sort by ascending"
                                />
                              )
                            }
                          />
                        )}

                        {/* <Button
                                                            style={{
                                                                backgroundColor: "#088b89",
                                                                color: clickSort ? "white" : "white",
                                                            }}
                                                            onClick={handleSorting}
                                                            disabled={clickSort ? true : false}
                                                        >
                                                            {sortData ? (
                                                                <HiSortAscending
                                                                    size="20px"
                                                                    title="Click to sort by desending"
                                                                />
                                                            ) : (
                                                                <HiSortDescending
                                                                    size="20px"
                                                                    title="Click to sort by ascending"
                                                                />
                                                            )}
                                                        </Button> */}
                      </ButtonGroup>
                    )}
                  </div>
                </Box>

                <Popper
                  sx={{
                    zIndex: 1,
                  }}
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <MenuList id="split-button-menu" autoFocusItem>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              disabled={index === 3}
                              onClick={(event) =>
                                handleIndexClick(event, index)
                              }
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Paper>
                    </Grow>
                  )}
                </Popper>

                <div className={isTableView ? "hideCard" : "displayCard"}>
                  {isTableView ? (
                    <Grid sx={{ display: "flex", gap: "35px" }}>
                      <Grid>
                        <Card className="cardBox">
                          <TableContainer
                            sx={
                              showImage
                                ? {
                                    minHeight: 610,
                                    maxHeight: 610,
                                    minWidth: 1310,
                                    maxWidth: 1310,
                                  }
                                : {
                                    minHeight: 610,
                                    maxHeight: 610,
                                    minWidth: 965,
                                    maxWidth: 965,
                                  }
                            }
                          >
                            <Table
                              className="tableBox"
                              sx={{ minWidth: 650, boxShadow: 1 }}
                              stickyHeader
                              aria-label="sticky table"
                            >
                              <TableHead
                                onClick={() => {
                                  handleDetailedView([]);
                                  setShowImage(true);
                                }}
                              >
                                <TableRow>
                                  {columns.map((column) => (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                      style={{
                                        minWidth: column.minWidth,
                                        fontWeight: "bold",
                                      }}
                                      className="jhi"
                                      // onClick={() => handleDetailedView([column])}
                                    >
                                      {column.label}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows
                                  .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                  .map((row, index) => {
                                    const profile_picture =
                                      "https://cdn-icons-png.flaticon.com/512/145/145974.png";
                                    return (
                                      <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={index}
                                        sx={{
                                          minWidth: 650,
                                          bgcolor: `${
                                            cardData.length > 0
                                              ? cardData[0]._id === row._id
                                                ? "#088b893d"
                                                : "white"
                                              : "white"
                                          }`,
                                          cursor: "pointer",
                                          "&:hover": {
                                            bgcolor: `${
                                              cardData.length > 0
                                                ? cardData[0]._id === row._id
                                                  ? "#088b893d !important"
                                                  : ""
                                                : ""
                                            }`,
                                          },
                                        }}
                                        onClick={() =>
                                          handleDetailedView([row])
                                        }
                                      >
                                        {columns.map((column) => {
                                          const value = row[column.id];
                                          return (
                                            <TableCell
                                              key={column.id}
                                              align={column.align}
                                              sx={{ minWidth: column.minWidth }}
                                            >
                                              {column.id === "firstName" &&
                                                showImage && (
                                                  <img
                                                    src={profile_picture}
                                                    alt={value}
                                                    style={{
                                                      width: "30px",
                                                      height: "30px",
                                                      borderRadius: "50%",
                                                      marginRight: "20px",
                                                    }}
                                                  />
                                                )}
                                              {column.format &&
                                              typeof value === "number"
                                                ? column.format(value)
                                                : value}
                                            </TableCell>
                                          );
                                        })}
                                      </TableRow>
                                    );
                                  })}
                                {rows.length === 0 && (
                                  <TableCell
                                    colSpan={4}
                                    sx={{
                                      fontWeight: "bold",
                                      fontSize: "h5.fontSize",
                                      color: "red",
                                      textAlign: "center",
                                    }}
                                  >
                                    No data found
                                  </TableCell>
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                          />
                        </Card>
                      </Grid>
                      <Grid>
                        {cardData?.map((details) => (
                          <Card
                            className={
                              closeCard
                                ? "displayNone"
                                : "detailedCardView boxShadow"
                            }
                            sx={{ minWidth: 310 }}
                          >
                            <Box>
                              <Avatar
                                alt="noimage"
                                src={details?.profilePictureUrl}
                                sx={{ width: 120, height: 120 }}
                                className="marginCenter"
                              />
                              <Box sx={{ margin: "1rem" }}>
                                <Box
                                  sx={{ fontWeight: 600 }}
                                  className="mtb-30"
                                >
                                  <Box
                                    className="mtb-10"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      maxWidth: "100%",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <AccountCircle
                                      style={{
                                        color: "#088b89",
                                        cursor: "pointer",
                                      }}
                                      sx={{ fontSize: "17.14px" }}
                                    />
                                    <Tooltip
                                      title="Know More"
                                      placement="right"
                                    >
                                      <Box
                                        sx={{
                                          color: "blue",
                                          textDecoration: "underline",
                                        }}
                                        // onClick={() =>
                                        //   handleNav(
                                        //     details.firstName,
                                        //     details.profile_picture,
                                        //     details.position
                                        //   )
                                        // }
                                        onClick={() =>
                                          handleNav(
                                            details.firstName,
                                            details.profile_picture,
                                            details.position,
                                            details._id
                                          )
                                        }
                                      >
                                        {details.firstName}
                                      </Box>
                                    </Tooltip>
                                  </Box>
                                </Box>
                                <Box
                                  sx={{ fontWeight: 600 }}
                                  className="mtb-30"
                                >
                                  <Box
                                    className="mtb-10"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      maxWidth: "100%",
                                    }}
                                  >
                                    <MdPeopleAlt style={{ color: "#088b89" }} />{" "}
                                    Male{details.gender}
                                  </Box>
                                </Box>
                                <Box
                                  sx={{ fontWeight: 600 }}
                                  className="mtb-30"
                                >
                                  <Box
                                    className="mtb-10"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      maxWidth: "100%",
                                    }}
                                  >
                                    <PiCakeFill style={{ color: "#088b89" }} />{" "}
                                    20-02-2000{details.birthdayDate}
                                  </Box>
                                </Box>
                                <Box
                                  sx={{ fontWeight: 600 }}
                                  className="mtb-30"
                                >
                                  <Box
                                    className="mtb-10"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      maxWidth: "100%",
                                    }}
                                  >
                                    <HiOutlineIdentification
                                      style={{ color: "#088b89" }}
                                    />
                                    {details._id}
                                  </Box>
                                </Box>
                                <Box
                                  sx={{ fontWeight: 600 }}
                                  className="mtb-30"
                                >
                                  <Box
                                    className="mtb-10"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      maxWidth: "100%",
                                    }}
                                  >
                                    <TbReport style={{ color: "#088b89" }} />
                                    Reporting to - Manimaran
                                    {details.reportingTo}
                                  </Box>
                                </Box>
                                <Box
                                  sx={{ fontWeight: 600 }}
                                  className="mtb-30"
                                >
                                  <Box
                                    className="mtb-10"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      maxWidth: "100%",
                                    }}
                                  >
                                    <InsertInvitationIcon
                                      style={{ color: "#088b89" }}
                                      sx={{ fontSize: "17.14px" }}
                                    />
                                    Joined on {details.joinedDate}
                                  </Box>
                                </Box>
                                <Box
                                  sx={{ fontWeight: 600 }}
                                  className="mtb-30"
                                >
                                  <Box
                                    className="mtb-10"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      maxWidth: "100%",
                                    }}
                                  >
                                    <IoIosTime style={{ color: "#088b89" }} />
                                    10.30 - 8.30{details.shiftTime}
                                  </Box>
                                </Box>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  marginBottom: "20px",
                                }}
                              >
                                <CustomizedButton
                                  className="createCardButton"
                                  buttonName="Close"
                                  type="submit"
                                  onClick={() => {
                                    setCloseCard(true);
                                    setShowImage(true);
                                  }}
                                />
                              </Box>
                            </Box>
                          </Card>
                        ))}
                      </Grid>
                    </Grid>
                  ) : (
                    <>
                      <Grid
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          columnGap: "61px",
                          width: "100%",
                          justifyContent: "start",
                        }}
                      >
                        {_DATA?.currentData().map((employeedata, index) => {
                          function randomIntFromInterval(min, max) {
                            return Math.floor(
                              Math.random() * (max - min + 1) + min
                            );
                          }
//                           let crtURL;
//                           try {
//                             // console.log(employeedata.profilePictureUrl);
//                             crtURL = new URL(employeedata.profilePictureUrl);
//                             console.log(crtURL);
//                             if (employeedata.profilePictureUrl.length === 0) {
//                               employeedata.profilePictureUrl =
//                                 "https://cdn-icons-png.flaticon.com/512/145/145974.png";
//                             }
//                           } catch (e) {
//                             crtURL = "https://cdn-icons-png.flaticon.com/512/145/145974.png";
//                             employeedata.profilePictureUrl = crtURL;
//                           }
// console.log(employeedata);
                          // const rndInt = randomIntFromInterval(0, 4)
                          const profile_picture = randomIntFromInterval(0, 4);
                          // "https://cdn-icons-png.flaticon.com/512/145/145974.png";
                          const relativeUrl = randomIntFromInterval(0, 4);
                          // "https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2510.jpg";
                          return (
                            <div
                              className="card"
                              style={{ cursor: "pointer" }}
                              key={employeedata._id}
                              onClick={() =>
                                handleNav(
                                  employeedata.firstName,
                                  relativeUrl,
                                  employeedata.position,
                                  employeedata._id
                                )
                              }
                            >
                              <div className="relative">
                                <img
                                  src={coverPic[relativeUrl]}
                                  alt="noimage"
                                  className="imgContainer pointer"
                                  // onClick={() =>
                                  //   handleNav(
                                  //     employeedata.firstName,
                                  //     relativeUrl,
                                  //     employeedata.position
                                  //   )
                                  // }
                                />
                                <div className="absolute cardImageStyle">
                                  <div
                                    className="userImage pointer"
                                    // onClick={() =>
                                    //   handleNav(
                                    //     employeedata.firstName,
                                    //     profile_picture,
                                    //     employeedata.position
                                    //   )
                                    // }
                                  >
                                    <img
                                      src={employeedata?.profilePictureUrl || DefaultProfile}
                                      // src="https://cdn-icons-png.flaticon.com/512/145/145974.png"
                                      alt=""
                                      className="absoluteimgContainer"
                                    />
                                  </div>
                                  <Box sx={{ display: "flex" }}>
                                    {employeedata.linkedIn_id && (
                                      <a
                                        href={`${employeedata.linkedIn_id}`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        <div className="linkedIn pointer">
                                          <LinkedInIcon className="cardSvg" />
                                        </div>
                                      </a>
                                    )}
                                    {employeedata.email && (
                                      <div
                                        className="email pointer"
                                        onClick={(e) => {
                                          showMail(employeedata.email);
                                          e.stopPropagation();
                                        }}
                                      >
                                        <EmailIcon className="cardSvg" />
                                      </div>
                                    )}
                                  </Box>
                                </div>
                              </div>
                              <div className="mt-70 fontWeight">
                                {employeedata.firstName}
                              </div>
                              <div className="mt-10">
                                {employeedata.position ===
                                "Business Development Executive"
                                  ? "BDE"
                                  : employeedata.position}
                              </div>
                            </div>
                          );
                        })}
                        {_DATA?.currentData().length === 0 && (
                          <Box
                            sx={{
                              fontWeight: "bold",
                              fontSize: "h5.fontSize",
                              color: "red",
                              height: "calc(80vh - 165px)",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            No data found
                          </Box>
                        )}
                      </Grid>

                      {empData.length > 7 && (
                        <Grid>
                          <Pagination
                            sx={{
                              position: "fixed",
                              left: "0",
                              bottom: "2%",
                              backgroundColor: "white",
                              width: "115%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            count={count}
                            size="large"
                            page={pages}
                            onChange={handleChange}
                            color="primary"
                          />
                        </Grid>
                      )}
                      {isemail && (
                        <SendEmail
                          isopen={isemail}
                          onclick={setIsEmail}
                          tomail={tomail}
                        />
                      )}
                    </>
                  )}
                </div>
              </>
            ) : (
              <Box
                sx={{
                  fontSize: "h4.fontSize",
                  height: "85vh",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                Employee List is Empty
              </Box>
            )}
          </>
        ) : (
          <LoaderComp isLoading={loading} />
        )}
      </SideNavbar>
    </>
  );
};

export default EmployeeList;
