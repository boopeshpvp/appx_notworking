import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Switch,
    TextField
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Imageview } from "../../components/ImageView/imageview";
import { loginSource, tokenData } from "../../service/actioncreater";
import { auth, provider } from "../../../src/config";
import { signInWithPopup } from "firebase/auth";
import CustomizedButton from "../../components/button";
import FieldWithIcon from "../../components/textFeild";
import { UseSelector } from "react-redux/es/hooks/useSelector";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login(props) {
    const navigate = useNavigate();
    const [errorState, setErrorState] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [adminpanel, setAdminPanel] = useState(true);
    const [firebaseEmail, setFirebaseEmail] = useState("");
    const [userEmail, setUserEmail] = useState([]);
    const [adminEmail, setAdminEmail] = useState([]);

    const dispatch = useDispatch();

    const [alertMessage, setAlertMessage] = React.useState({
        open: false,
        vertical: "top",
        horizontal: "right",
    });

    const { vertical, horizontal, open } = alertMessage;

    const theme = useSelector(state => state.theme)

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, dirtyFields },
    } = useForm({
        mode: "onChange",
    });

    const handleClose = () => {
        setAlertMessage({ ...alertMessage, open: false });
        setErrorState(false);
    };
    const location = useLocation();
    useEffect(() => {
        setFirebaseEmail(localStorage.getItem("firebaseemail"));

        if (location.state !== null) {
            setAlertMessage({ ...alertMessage, open: true });
            setTimeout(() => call(), 1000);
        }
    }, [location.state]);

    const call = () => {
        window.history.replaceState({}, document.title);
    };

    const handleadmin = (e) => {
        console.log(e.target.checked);
        if (e.target.checked) {
            setAdminPanel(true);
        } else {
            setAdminPanel(false);
        }
    };

    const onSubmit = (data) => {
        console.log("data", data);
        {
            !adminpanel
                ? axios
                    .post(`http://localhost:4000/admin/login`, {
                        email: data.email,
                        password: data.password
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        }
                    })
                    .then((res) => {
                        console.log("res", res);

                        localStorage.setItem("switchButton", "admin");
                        localStorage.setItem("password", data.password);
                        localStorage.setItem("authentication", true);
                        localStorage.setItem(
                            "token",
                            "cpt6QdqM71yTXeHUWuzxXWrB9blFW2peb1lZEhd"
                        );
                        localStorage.setItem("id", res.data.data.id);
                        dispatch(tokenData(data));
                        props.isAuthed();
                        navigate("/admin/dashboard", { alertMessage: { popup: true } });
                    })
                    .catch((err) => {
                        setErrorState(true);
                        console.log("Error", err.message)
                    })
                : axios
                    .post(`http://localhost:4000/user/login`, { 
                        email: data.email,
                        password: data.password
                    },{
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        },
                    })
                    .then((res) => {
                        console.log("res", res);

                        // const findUserLoggedIn = res.data.find(
                        //     (response) => data.email === response.email
                        // );
                        // if (
                        //     findUserLoggedIn &&
                        //     findUserLoggedIn.password === data.password
                        // ) {
                        //     console.log("Login Success");
                            localStorage.setItem("switchButton", "user");
                            localStorage.setItem("password", data.password);
                            localStorage.setItem("authentication", true);
                            localStorage.setItem(
                                "token",
                                "cpt6QdqM71yTXeHUWuzxXWrB9blFW2peb1lZEhd"
                            );
                            dispatch(tokenData(data));
                            props.isAuthed();
                            navigate("/user/home", { alertMessage: { popup: true } })
                        // );
                        // } else {
                        //     setErrorState(true);
                        // }
                    })
                    .catch((err) => console.log("Error", err.message));
        }
    };

    // useEffect(() => {
    //   axios
    //     .get(`http://${process.env.REACT_APP_NODE_BASE_URL}:4000/user/login`, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //       },
    //     })
    //     .then((res) => {
    //       setUserEmail(res.data.map((response) => response.email));
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });

    // //   axios
    // //     .get(`http://${process.env.REACT_APP_NODE_BASE_URL}:4000/admin/login`, {
    // //       headers: {
    // //         "Content-Type": "application/json",
    // //         "Access-Control-Allow-Origin": "*",
    // //       },
    // //     })
    // //     .then((res) => {
    // //       setAdminEmail(res.data.map((response) => response.email));
    // //     })
    // //     .catch((error) => {
    // //       console.log(error);
    // //     });
    // // }, []);

    const firebaseLogin = () => {
        signInWithPopup(auth, provider)
            .then((data) => {
                if (userEmail.toString().includes(data.user.email)) {
                    console.log("Login Success");
                    localStorage.setItem("switchButton", "user");
                    localStorage.setItem("password", data.password);
                    localStorage.setItem("authentication", true);
                    localStorage.setItem(
                        "token",
                        "cpt6QdqM71yTXeHUWuzxXWrB9blFW2peb1lZEhd"
                    );
                    props.isAuthed();
                    dispatch(tokenData(data));
                    navigate("/user/home", { alertMessage: { popup: true } });
                } else {
                    if (adminEmail.toString().includes(data.user.email)) {
                        console.log("Login Success");
                        localStorage.setItem("switchButton", "admin");
                        localStorage.setItem("password", data.password);
                        localStorage.setItem("authentication", true);
                        dispatch(tokenData(data));
                        localStorage.setItem(
                            "token",
                            "cpt6QdqM71yTXeHUWuzxXWrB9blFW2peb1lZEhd"
                        );
                        props.isAuthed();
                        navigate("/admin/dashboard", { alertMessage: { popup: true } });
                    }
                }
                dispatch(loginSource(true))
            }
            )
            .catch((error) => {
                console.log("Caught error Popup closed");
            });
    };

    return (
        <>
            <Box className="box-container">
                <Imageview>
                    <Box textAlign="center" className="title-container">
                        Hi, Welcome Back
                    </Box>
                    <Box textAlign="center" className="font-color">
                        Enter your credentials to continue
                    </Box>
                    {/* <Box textAlign="center">
                        <Button
                            onClick={firebaseLogin}
                            className="signinWithGoogle"
                            disabled={adminpanel ? true : false}
                        >
                            <FcGoogle /> Sign In With Google
                        </Button>
                    </Box> */}
                    {/* <Box className="orContainer"> */}
                    <Box className="line-border"></Box>
                    {/* </Box> */}
                    <Box textAlign="center" className="form-header">
                        Sign in with email Address
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box className="textfieldContainer">
                            <Box
                                className="mtb-10"
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    width: "100%",
                                    // maxWidth: "100%",
                                }}
                            >
                                <EmailIcon
                                    sx={{
                                        color:
                                            errors?.email ||
                                                (touchedFields?.email && !dirtyFields?.email)
                                                ? "red"
                                                : " #088b89",
                                        mr: 1,
                                        my: 0.5,
                                    }}
                                />
                                <TextField
                                    sx={{
                                        "& .MuiFormLabel-root.Mui-focused": {
                                            color:
                                                (touchedFields?.email && !dirtyFields?.email) ||
                                                    errors?.email
                                                    ? "red"
                                                    : " #088b89",
                                        },
                                        "& .MuiInput-underline:after": {
                                            borderBottomColor:
                                                (touchedFields?.email && !dirtyFields?.email) ||
                                                    errors?.email
                                                    ? "red"
                                                    : " #088b89",
                                        },
                                    }}
                                    // defaultValue={emailfeild}
                                    {...register("email", {
                                        required: true,
                                        pattern: /^[a-zA-Z0-9._%+-]+@mitrahsoft\.com$/,
                                    })}
                                    error={
                                        (touchedFields?.email && !dirtyFields?.email) || errors.email
                                            ? true
                                            : false
                                    }
                                    id="fullWidth"
                                    label="Email Address"
                                    variant="standard"
                                    fullWidth
                                />
                            </Box>
                            <Box
                                className="mtb-10"
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    width: "100%",
                                    // maxWidth: "100%",
                                }}
                            >
                                <LockIcon
                                    sx={{
                                        color:
                                            errors?.password ||
                                                (touchedFields?.password && !dirtyFields?.password)
                                                ? "red"
                                                : " #088b89",
                                        mr: 1,
                                        my: 0.5,
                                    }}
                                />
                                <TextField
                                    sx={{
                                        "& .MuiFormLabel-root.Mui-focused": {
                                            color:
                                                (touchedFields?.password && !dirtyFields?.password) ||
                                                    errors?.password
                                                    ? "red"
                                                    : " #088b89",
                                        },
                                        "& .MuiInput-underline:after": {
                                            borderBottomColor:
                                                (touchedFields?.password && !dirtyFields?.password) ||
                                                    errors?.password
                                                    ? "red"
                                                    : " #088b89",
                                        },
                                    }}
                                    // defaultValue={password}
                                    {...register("password", {
                                        required: true,
                                        pattern:
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?^()_={}'":;+-/><.,|`~])[A-Za-z\d#$@!%&*?^()_={}'":;+-/><.,|`~]{8,30}$/,
                                    })}
                                    error={
                                        (touchedFields.password && !dirtyFields?.password) ||
                                            errors?.password
                                            ? true
                                            : false
                                    }
                                    type={showPassword ? "text" : "password"}
                                    id="fullWidth"
                                    label="Password"
                                    variant="standard"
                                    fullWidth
                                />
                                <span onClick={handleClickShowPassword}>
                                    {showPassword ? (
                                        <Visibility style={{ color: "#088b89" }} />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </span>

                            </Box>
                            {/* <Box className="mt">
                                <FormControlLabel
                                    control={<Switch onChange={handleadmin} />}
                                    label="Admin"
                                />
                            </Box> */}
                            <Box className="mt-10 mb-4 mt-3 rememberme-container">
                                <FormControlLabel
                                    control={<Checkbox style={{ color: "#088b89" }} />}
                                    label="Remember Me"
                                />
                                {/* {adminEmail ? (
                                    <></>
                                ) : ( */}
                                <span
                                    className="forgetPassword"
                                    // onClick={() => navigate("/forgetpassword")}
                                    onClick={() => navigate("/forgetpassword")}
                                >
                                    <Link className="link-container">Forgot password?</Link>
                                </span>
                                {/* )} */}
                            </Box>
                            <Box className="signupbutton">
                                <CustomizedButton
                                    className="signupbutton-container mtb-10"
                                    buttonName="Sign In"
                                    type="submit"
                                />
                            </Box>
                        </Box>
                        {/* <Box className="signupbutton">
                            <CustomizedButton
                                className="signupbutton-container mtb-10"
                                buttonName="Sign In"
                                type="submit"
                            />
                        </Box> */}
                    </form>
                </Imageview>
                <Stack spacing={2} sx={{ width: "100%" }}>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                    >
                        <Alert
                            onClose={handleClose}
                            severity="success"
                            sx={{ width: "100%" }}
                        >
                            Successfully Logged Out !
                        </Alert>
                    </Snackbar>
                </Stack>
                <Stack spacing={2} sx={{ width: "100%" }}>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={errorState}
                        autoHideDuration={2000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                            Wrong Credentials!
                        </Alert>
                    </Snackbar>
                </Stack>
            </Box>
        </>
    );
}
export default Login;

//   const userdetails = localStorage.getItem("userdetails")
//   console.log('userdetails:', userdetails)
//   if(userdetails ==='boopesh.t@mitrahsoft.com'){
//     console.log("Login Success");
//                 localStorage.setItem("switchButton", "user")
//                 // localStorage.setItem("password", data.password);
//                 localStorage.setItem("authentication", true);
//                 localStorage.setItem("token", "cpt6QdqM71yTXeHUWuzxXWrB9blFW2peb1lZEhd");
//     navigate("/user/home")
//   }

//   const onLoginStart = useCallback(() => {
//     alert("login start");

//   }, []);

//   const onLogoutFailure = useCallback(() => {
//     alert("logout fail");
//   }, []);

//   const onLogoutSuccess = useCallback(() => {
//     setProfile(null);
//     setProvider("");
//     alert("logout success");

//     // const findUserLoggedIn=res.data.map((response)=>response.email)

//   }, []);

//   return (
//     <>
//       <Imageview>
//         <Box textAlign="center" className="title-container">
//           Hi, Welcome Back
//         </Box>
//         <Box textAlign="center" className="font-color">
//           Enter your credentials to continue
//         </Box>
//         <Box textAlign="center">
//           {/* <Button className="signinWithGoogle" onClick={firebaseLogin} disabled={adminpanel?true:false}>
//             <FcGoogle /> Sign In With Google
//           </Button> */}

//           <LoginSocialGoogle
//             ref={googleRef}
//             client_id="382877896795-ri90asp9up7tdhke6psdo1igs9jv58ob.apps.googleusercontent.com"
//             onLogoutFailure={onLogoutFailure}
//             onLoginStart={onLoginStart}
//             onLogoutSuccess={onLogoutSuccess}
//             redirect_uri="https://localhost:3000/user/home"
//             onResolve={({ provider, data }) => {
//               setProvider(provider);
//               setProfile(data);
//               localStorage.setItem("userdetails", data.email)
//               console.log("data",data );
//               console.log(provider, "provider");
//             }}
//             onReject={(err) => {
//               console.log("hbhbdhd", err);
//             }}
//           >
//             <GoogleLoginButton />
//           </LoginSocialGoogle>

//         </Box>
//         <Box className="orContainer" >
//           <Divider className="divider" >
//             <Box className="orText">OR</Box>
//           </Divider>
//         </Box>
//         <Box textAlign="center" className="form-header">
//           Sign in with email Address
//         </Box>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Box className="textfieldContainer">
//             <Box
//               className="mtb-10"
//               sx={{
//                 display: "flex",
//                 alignItems: "flex-end",
//                 width: 460,
//                 maxWidth: "100%",
//               }}
//             >
//               <EmailIcon
//                 sx={{
//                   color:
//                     errors?.email ||
//                       (touchedFields?.email && !dirtyFields?.email)
//                       ? "red"
//                       : " #088b89",
//                   mr: 1,
//                   my: 0.5,
//                 }}
//               />
//               <TextField
//                 sx={{
//                   "& .MuiFormLabel-root.Mui-focused": {
//                     color:
//                       (touchedFields?.email && !dirtyFields?.email) ||
//                         errors?.email
//                         ? "red"
//                         : " #088b89",
//                   },
//                   "& .MuiInput-underline:after": {
//                     borderBottomColor:
//                       (touchedFields?.email && !dirtyFields?.email) ||
//                         errors?.email
//                         ? "red"
//                         : " #088b89",
//                   },
//                 }}
//                 // defaultValue={emailfeild}
//                 {...register("email", {
//                   required: true,
//                   pattern: /^[a-zA-Z0-9._%+-]+@mitrahsoft\.com$/,
//                 })}
//                 error={
//                   (touchedFields?.email && !dirtyFields?.email) || errors.email
//                     ? true
//                     : false
//                 }
//                 id="fullWidth"
//                 label="email Address"
//                 variant="standard"
//                 fullWidth
//               />
//             </Box>
//             <Box
//               className="mtb-10"
//               sx={{
//                 display: "flex",
//                 alignItems: "flex-end",
//                 width: 470,
//                 maxWidth: "100%",
//               }}
//             >
//               <LockIcon
//                 sx={{
//                   color:
//                     errors?.password ||
//                       (touchedFields?.password && !dirtyFields?.password)
//                       ? "red"
//                       : " #088b89",
//                   mr: 1,
//                   my: 0.5,
//                 }}
//               />
//               <TextField
//                 sx={{
//                   "& .MuiFormLabel-root.Mui-focused": {
//                     color:
//                       (touchedFields?.password && !dirtyFields?.password) ||
//                         errors?.password
//                         ? "red"
//                         : " #088b89",
//                   },
//                   "& .MuiInput-underline:after": {
//                     borderBottomColor:
//                       (touchedFields?.password && !dirtyFields?.password) ||
//                         errors?.password
//                         ? "red"
//                         : " #088b89",
//                   },
//                 }}
//                 // defaultValue={password}
//                 {...register("password", {
//                   required: true,
//                   pattern:
//                     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?^()_={}'":;+-/><.,|`~])[A-Za-z\d#$@!%&*?^()_={}'":;+-/><.,|`~]{8,30}$/,
//                 })}
//                 error={
//                   (touchedFields.password && !dirtyFields?.password) ||
//                     errors?.password
//                     ? true
//                     : false
//                 }
//                 type={showPassword ? "text" : "password"}
//                 id="fullWidth"
//                 label="password"
//                 variant="standard"
//                 fullWidth
//               />
//               <span onClick={handleClickShowPassword}>
//                 {showPassword ? (
//                   <Visibility style={{ color: "#088b89" }} />
//                 ) : (
//                   <VisibilityOff />
//                 )}
//               </span>
//             </Box>
//             <Box className="mt">
//               <FormControlLabel
//                 control={
//                   <Switch onChange={handleadmin} />
//                 }
//                 label="Admin"
//               />
//             </Box>
//             <Box className="mt-10">
//               <FormControlLabel
//                 // onChange={handleCheckbox}
//                 control={<Checkbox style={{ color: "#088b89" }} />}
//                 label="Remember Me"
//               />
//               {adminpanel ? <></> : <span
//                 className="forgetPassword"
//                 onClick={() => navigate("/forgetpassword")}
//               >
//                 <Link className="link-container">Forgot password?</Link>
//               </span>
//               }
//             </Box>

//           </Box>
//           <Box className="signupbutton">
//             <Button type="submit" className="signupbutton-container mtb-10">
//               Sign In
//             </Button>
//           </Box>
//         </form>
//         <Box className="line-border"></Box>
//         {/* <Box textAlign="center" className=" margin-bottom">
//           Don't have an account?{" "}
//           <span onClick={() => navigate("/register")}>
//             <Link className="link-container">Sign Up</Link>
//           </span>
//         </Box> */}
//       </Imageview>
//       <Stack spacing={2} sx={{ width: '100%' }}>
//         <Snackbar anchorOrigin={{ vertical, horizontal }}
//           open={open} autoHideDuration={2000} onClose={handleClose} >
//           <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
//             Successfully Logged Out !
//           </Alert>
//         </Snackbar>
//       </Stack>
//       <Stack spacing={2} sx={{ width: '100%' }}>
//         <Snackbar anchorOrigin={{ vertical, horizontal }}
//           open={errorState} autoHideDuration={2000} onClose={handleClose} >
//           <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
//             Wrong Credentials!
//           </Alert>
//         </Snackbar>
//       </Stack>

//     </>
//   );
// }
// export default Login;