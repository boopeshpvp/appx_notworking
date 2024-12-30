import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Box from "@mui/material/Box";
import Modal from '@mui/material/Modal';
import * as React from "react";
import { useNavigate } from "react-router";
import CustomizedButton from "../../../components/button";

import "../modal/style.css";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    zIndex: 10,
};

const TransitionsModal = (props) => {
    console.log('props', props);

    const [open, setOpen] = React.useState(props.openModel);
    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(true);
        localStorage.setItem("activeComponent", props.preActiveComponent);
        props.isValidate(props.preActiveComponent);
    };
    const handleLogout = () => {
        localStorage.setItem("authentication", false);
        localStorage.removeItem("token");
        localStorage.removeItem("activeComponent");
        localStorage.removeItem("password");
        localStorage.removeItem("userProfile");
        localStorage.setItem("switchButton", '[]');
        props.props.isAuthOut();
        localStorage.clear();
        navigate("/", { state: { logoff: true } });
    };

    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {props.isAddEmployee ? (
                        <div></div>
                    ) : (
                        <div className="cancelModel">
                            <HighlightOffIcon onClick={handleClose} />
                        </div>
                    )}

                    <div className="modelContainer">
                        <>
                            {props.isAddEmployee ? (
                                <div>{props.isAddEmployee}</div>
                            ) : (
                                <div> Are you sure want to Logout</div>
                            )}
                        </>
                        <div className="modelButtonContainer">
                            <>
                                {props.openModel ? (
                                    <>
                                        <div>
                                            <CustomizedButton className="boxShadow" variant="outlined" color="success" onClick={handleLogout} buttonName="Yes" type="submit" />
                                        </div>
                                        <div>
                                            <CustomizedButton className="boxShadow" variant="outlined" color="error" onClick={handleClose} buttonName="No" />
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        </div>
                    </div>
                </Box>
            </Modal>

            {/* {open === false && (
                <Box sx={style}>
                    {props.isAddEmployee ? (
                        <div></div>
                    ) : (
                        <div className="cancelModel">
                            <HighlightOffIcon onClick={handleClose} />
                        </div>
                    )}

                    <div className="modelContainer">
                        <>
                            {props.isAddEmployee ? (
                                <div>{props.isAddEmployee}</div>
                            ) : (
                                <div> Are you sure want to Logout</div>
                            )}
                        </>
                        <div className="modelButtonContainer">
                            <>
                                {props.openModel ? (
                                    <>
                                        <div>
                                            <CustomizedButton className="boxShadow" variant="outlined" color="success" onClick={handleLogout} buttonName="Yes" type="submit" />
                                        </div>
                                        <div>
                                            <CustomizedButton className="boxShadow" variant="outlined" color="error" onClick={handleClose} buttonName="No" />
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        </div>
                    </div>
                </Box>
            )} */}
        </>
    );
};

export default TransitionsModal;
