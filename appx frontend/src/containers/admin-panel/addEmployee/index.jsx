import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BadgeIcon from "@mui/icons-material/Badge";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import RefreshIcon from '@mui/icons-material/Refresh';
import WorkIcon from '@mui/icons-material/Work';
import { FormControl, Grid, InputLabel, NativeSelect, } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import { DatePicker, DateRangeIcon, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import CustomizedButton from "../../../components/button";
import FieldWithIcon from "../../../components/textFeild";
import SideNavbar from "../../sidenavbar";
import "../addEmployee/style.css";
const steps = ["Personal Information", "Addtional information"];
const skills = ["html", "css", "js", "react", "angular", "mern stack", ".net", "java", "python"];

export default function AddEmployee(props) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [datevalue, setDatevalue] = React.useState(null);
  const [allSkill, setAllskill] = React.useState();
  const [error, setError] = React.useState('');
  const {
    register,
    watch,
    setFocus,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      FirstName: "",
      LastName: "",
      employee_id: "CFO",
      Role: "",
      Date: "",
      branch: ""
    }
  });
  const {
    register: register2,
    watch: watch2,
    formState: {
      errors: errors2,
      touchedFields: touchedFields2,
      dirtyFields: dirtyFields2,
    },
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onChange",
  });
  const isStepOptional = (step) => {
    return step === 1;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = (data) => {
    axios({
      method: 'POST',
      url: `http://${process.env.REACT_APP_NODE_BASE_URL}:4000/user/addEmployee`,
      data: {
        _id: watchAllFields.employee_id,
        firstName: watchAllFields.FirstName,
        lastName: watchAllFields.LastName,
        position: watchAllFields.Role,
        employee_id: watchAllFields.employee_id,
        joinedDate: datevalue,
        location: watchAllFields.branch,
        profile_picture: "",
        git_id: data.GitId,
        linkedIn_id: data.Linkedin,
        skills: allSkill
      }
    }).then((response) => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }).catch(error => {
      handleBack()
      setError(errorCatcher(error.response.data.message));
      console.error('Error', error);
    });

  };

  const handleSkip = () => {
    axios({

      method: 'POST',
      url: `http://${process.env.REACT_APP_NODE_BASE_URL}:4000/user/addEmployee`,
      data: {
        _id: watchAllFields.employee_id,
        firstName: watchAllFields.FirstName,
        lastName: watchAllFields.LastName,
        position: watchAllFields.Role,
        employee_id: watchAllFields.employee_id,
        joinedDate: datevalue,
        location: watchAllFields.branch,
        profile_picture: "",
        git_id: "",
        linkedIn_id: "",
        skills: []
      }
    }).then((response) => {
      if (!isStepOptional(activeStep)) {
        throw new Error("You can't skip a step that isn't optional.");
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    }).catch(error => {
      handleBack()
      setError(errorCatcher(error.response.data.message));
      console.error('Error', error);
    });
  };

  const errorCatcher = (e) => {
    let cat = e.split(' ');
    if (cat[1] === 'duplicate')
      return 'User already exists.'
    else return 'Something went wrong.'
  }

  const handleUpdated = () => {
    navigate(-1);
  };

  const handleFirst = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const clearVal = (e) => {
    clearErrors('Date')
    setDatevalue(convert(e.$d));
  }

  const convert = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join("-");
  }

  const value = [
    { description: "" },
    {
      description: (
        <Box className="textfieldContainer">
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "flex-end" }}
              className="mtb-10 addFormTextField"
            >

              <FieldWithIcon
                variant="standard"
                icon="AccountCircle"
                label="First Name"
                name="FirstName"
                touchedFields={touchedFields}
                dirtyFields={dirtyFields}
                errors={errors}
                register={register}
                required={true}
                pattern={/^[a-zA-Z]{3,30}$/}
                width={440}
                onChange={() => clearErrors("FirstName")}
              />
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "flex-end" }}
              className="mtb-20 addFormTextField"
            >
              <FieldWithIcon
                variant="standard"
                icon="AccountCircle"
                label="Last Name"
                name="LastName"
                touchedFields={touchedFields}
                dirtyFields={dirtyFields}
                errors={errors}
                register={register}
                required={true}
                pattern={/^[a-zA-Z]{1,30}$/}
                width={440}
                onChange={() => clearErrors("LastName")}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} className="addFormTextField">
            <FieldWithIcon
              variant="standard"
              icon="BadgeIcon"
              label="Employee Id"
              name="employee_id"
              touchedFields={touchedFields}
              dirtyFields={dirtyFields}
              errors={errors}
              register={register}
              required={true}
              width={440}
              onChange={() => clearErrors("employee_id")}
            />
          </Box>
          <Box className='error' sx={{ marginLeft: '32px' }}>{
            activeStep !== steps.length - 1 && error ? error : ''
          }</Box>
          <Box
            className="mtb-20 addFormTextField"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            {/* <FieldWithIcon
              variant="standard"
              icon="WorkIcon"
              label="Role"
              name="Role"
              touchedFields={touchedFields}
              dirtyFields={dirtyFields}
              errors={errors}
              register={register}
              required={true}
              pattern={/^[a-zA-Z_ ]{3,30}$/}
              width={440}
              onChange={() => clearErrors("Role")}
            /> */}
                        <WorkIcon
              sx={{
                color:
                  errors?.role ||
                    (touchedFields?.role && !dirtyFields?.role)
                    ? "red"
                    : "#088b89",
                mr: 1,
                my: 0.5,
              }}
            />
          <FormControl
              sx={{
                width: 440,
                "& .MuiFormLabel-root.Mui-focused": {
                  color:
                    (touchedFields?.role && !dirtyFields?.role) ||
                      errors2?.role
                      ? "red"
                      : "#088b89",
                },

                "& .MuiInput-underline:after": {
                  borderBottomColor:
                    (touchedFields?.role && !dirtyFields?.role) ||
                      errors?.role
                      ? "red"
                      : " #088b89",
                },
              }}
            >
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Role
              </InputLabel>
              <NativeSelect
                sx={{
                  
                  width: 440,
                  "& .MuiFormLabel-root.Mui-focused": {
                    color:
                      (touchedFields?.role && !dirtyFields?.role) ||
                        errors?.role
                        ? "red"
                        : " #088b89",
                  },

                  "& .MuiInput-underline:after": {
                    borderBottomColor:
                      (touchedFields?.role && !dirtyFields?.role) ||
                        errors?.role
                        ? "red"
                        : " #088b89",
                  },
                }}
                {...register("Role", {
                  required: "select one option",
                })}
                error={
                  (touchedFields.role && !dirtyFields?.role) ||
                    errors?.role
                    ? true
                    : false
                }
              >
                <option value="" />
                <option value="React Developer">React Developer</option>``
                <option value="Angular Developer">Angular Developer</option>
                <option value="Mern Stack Developer">Mern Stack Developer</option>
                <option value="Hr">Hr</option>
                <option value="Manager">Manager</option>
                <option value="React Native Developer">React Native Developer</option>
              </NativeSelect>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} className="addFormTextField">
            <DateRangeIcon
              sx={{
                color:
                  errors?.Date ||
                    (touchedFields?.Date && !dirtyFields?.Date)
                    ? "red"
                    : "#088b89",
                mr: 1,
                my: 0.5,
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  slotProps={{ textField: { variant: "standard" } }}
                  label="Joined Date"
                  name="Date"
                  sx={{
                    overflow: "hidden",
                    width: 440,
                    "& .MuiFormLabel-root.Mui-focused": {
                      color:
                        (touchedFields?.fwe &&
                          !dirtyFields?.fed) ||
                          errors?.efwe
                          ? "red"
                          : " #088b89",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor:
                        (touchedFields?.Date &&
                          !dirtyFields?.Date) ||
                          errors?.Date
                          ? "red"
                          : " #088b89",
                    },
                  }}
                  {...register('Date', {
                    required: true,
                    valueAsDate: true,
                  })}
                  error={
                    (touchedFields?.Date && !dirtyFields?.Date) ||
                    errors.Date
                  }
                  onChange={(newValue) => clearVal(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box
            className="mtb-20 addFormTextField"
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <LocationSearchingIcon
              sx={{
                color:
                  errors?.branch ||
                    (touchedFields?.branch && !dirtyFields?.branch)
                    ? "red"
                    : "#088b89",
                mr: 1,
                my: 0.5,
              }}
            />
            <FormControl
              sx={{
                width: 440,
                "& .MuiFormLabel-root.Mui-focused": {
                  color:
                    (touchedFields?.branch && !dirtyFields?.branch) ||
                      errors2?.branch
                      ? "red"
                      : "#088b89",
                },

                "& .MuiInput-underline:after": {
                  borderBottomColor:
                    (touchedFields?.branch && !dirtyFields?.branch) ||
                      errors?.branch
                      ? "red"
                      : " #088b89",
                },
              }}
            >
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Branch
              </InputLabel>
              <NativeSelect
                sx={{
                  width: 440,
                  "& .MuiFormLabel-root.Mui-focused": {
                    color:
                      (touchedFields?.branch && !dirtyFields?.branch) ||
                        errors?.branch
                        ? "red"
                        : " #088b89",
                  },

                  "& .MuiInput-underline:after": {
                    borderBottomColor:
                      (touchedFields?.branch && !dirtyFields?.branch) ||
                        errors?.branch
                        ? "red"
                        : " #088b89",
                  },
                }}
                {...register("branch", {
                  required: "select one option",
                })}
                error={
                  (touchedFields.branch && !dirtyFields?.branch) ||
                    errors?.branch
                    ? true
                    : false
                }
              >
                <option value="" />
                <option value="Coimbatore">Coimbatore</option>
                <option value="Kovilpatti">Kovilpatti</option>
                <option value="Madurai">Madurai</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </Box>
      ),
    },
    {
      description: (
        <>
          <Box className="textfieldContainer">
            <Box
              className="mtb-10"
              sx={{ display: "flex", alignItems: "flex-end" }}
            >

              {/* <FieldWithIcon
                variant="standard"
                icon="BadgeIcon"
                label="Skills"
                name="Skills"
                touchedFields={touchedFields2}
                dirtyFields={dirtyFields2}
                errors={errors2}
                register={register2}
                required={true}
                width={440}
                onChange={() => clearErrors("Skills")}
              /> */}

              <BadgeIcon className="skillIcon" sx={{
                mr: 1,
                my: 0.5,

              }} /><Autocomplete
                fullWidth
                multiple
                id="size-small-standard-multi"
                options={skills}
                getOptionLabel={(option) => option}
                onChange={(event, value) => setAllskill(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Skills"
                  />
                )}
              />
            </Box>

            <Box
              className="mtb-20"
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              <FieldWithIcon
                variant="standard"
                icon="WorkIcon"
                label="GitId"
                name="GitId"
                touchedFields={touchedFields2}
                dirtyFields={dirtyFields2}
                errors={errors2}
                register={register2}
                required={true}
                width={440}
                pattern={/^([A-Za-z0-9]+@|http(|s)\:\/\/)([A-Za-z0-9.]+(:\d+)?)(?::|\/)([\d\/\w.-]+?)(\.git)?$/i}
              />
            
            </Box>

            <Box
              className="mtb-10"
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              <FieldWithIcon
                variant="standard"
                icon="WorkIcon"
                label="Linkedin"
                name="Linkedin"
                touchedFields={touchedFields2}
                dirtyFields={dirtyFields2}
                errors={errors2}
                register={register2}
                required={true}
                width={440}
                pattern={/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/gm}
              />
              
              {/* <Box
              className="mtb-20"
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              <LocationSearchingIcon
                sx={{
                  color:
                    errors2?.branch ||
                      (touchedFields2?.branch && !dirtyFields2?.branch)
                      ? "red"
                      : " #088b89",
                  mr: 1,
                  my: 0.5,
                }}
              />
              <FormControl
                sx={{
                  width: 440,
                  "& .MuiFormLabel-root.Mui-focused": {
                    color:
                      (touchedFields2?.branch && !dirtyFields2?.branch) ||
                        errors2?.branch
                        ? "red"
                        : " #088b89",
                  },

                                    "& .MuiInput-underline:after": {
                                        borderBottomColor:
                                            (touchedFields2?.branch && !dirtyFields2?.branch) ||
                                                errors2?.branch
                                                ? "red"
                                                : " #088b89",
                                    },
                                }}
                            >
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    Branch
                                </InputLabel>
                                <NativeSelect
                                    sx={{
                                        width: 440,
                                        "& .MuiFormLabel-root.Mui-focused": {
                                            color:
                                                (touchedFields2?.branch && !dirtyFields2?.branch) ||
                                                    errors2?.branch
                                                    ? "red"
                                                    : " #088b89",
                                        },

                    "& .MuiInput-underline:after": {
                      borderBottomColor:
                        (touchedFields2?.branch && !dirtyFields2?.branch) ||
                          errors2?.branch
                          ? "red"
                          : " #088b89",
                    },
                  }}
                  {...register2("branch", {
                    required: "select one option",
                  })}
                  error={
                    (touchedFields2.branch && !dirtyFields2?.branch) ||
                      errors2?.branch
                      ? true
                      : false
                  }
                >
                  <option value="" />
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Kovilpatti">Kovilpatti</option>
                  <option value="Madurai">Madurai</option>
                </NativeSelect>
              </FormControl>
            </Box> */}
            </Box>
          </Box>
        </>
      ),
    },
  ];
  const goBack = () => {
    navigate(-1);
  };

  const watchAllFields = watch();
  const watchAllFields2 = watch2();
  const [reseticon, setResetIcon] = React.useState(false);

  const handleReset = () => {
    setFocus('FirstName')
    reset({
      FirstName: "",
      LastName: "",
      employee_id: "CFO",
      Role: "",
      Date: '',
      branch: "",
    });
    setDatevalue(null);
    setError('');
  };

  React.useEffect(() => {
    for (let i in watchAllFields) {
      if (watchAllFields[i] && i !== 'Date') {
        setResetIcon(true);
        break;
      } else {
        setResetIcon(false);
      }
    }
  }, [watchAllFields])

  return (
    <>
      <SideNavbar logoff={props}>
        <Box sx={{ margin: "10px" }}>
          {activeStep !== steps.length - 1 && activeStep !== steps.length ? (
            <ArrowBackIcon sx={{ color: "#088b89" }} onClick={goBack} />
          ) : (
            <></>
          )}
        </Box>
        <Grid className="container">
          <Box sx={{ width: "70%", margin: "auto" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>
                      <span className="label-fontsize">{label}</span>
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{
                  mt: 2, mb: 1, textAlign: 'center',
                  color: '#088b89', fontWeight: 'bold'
                }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <CustomizedButton className="addemployeeButton" onClick={handleUpdated} buttonName="Completed successfully" type="submit" />
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {" "}
                  {value[activeStep + 1].description}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  {activeStep === steps.length - 1 ? (
                    <CustomizedButton className="addemployeeButton" color="inherit" onClick={handleBack}
                      sx={{ mr: 1 }} innerIcon={<ArrowBackIcon sx={{ color: "white" }} />} type="submit" />
                  ) : (
                    <></>
                  )}

                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(activeStep) ? (
                    <CustomizedButton className="addemployeeButton"
                      color="inherit"
                      onClick={handleSkip}
                      sx={{ mr: 1 }} buttonName="Skip" />

                  ) : reseticon ? (
                    <CustomizedButton className="addemployeeButton" color="inherit" onClick={handleReset}
                      sx={{ mr: 1 }} innerIcon={<RefreshIcon sx={{ color: "white" }} />} />
                  ) : <></>}
                  <CustomizedButton className="addemployeeButton" onClick={
                    activeStep === steps.length - 1 ? handleSubmit2(handleNext) : handleSubmit(handleFirst)
                  } buttonName={activeStep === steps.length - 1 && "Finish"} innerIcon={activeStep !== steps.length - 1 && <ArrowForwardIcon color="#fff" style={{ margin: '5px' }} />} />
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </SideNavbar>
    </>
  );
}
