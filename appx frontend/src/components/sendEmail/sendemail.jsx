import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { AiOutlineSend } from "react-icons/ai";
import AttachFileIcon from '@mui/icons-material/AttachFile';

import styled from '@emotion/styled';
import { TextField } from '@mui/material';

import './sendemail.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '20px',
    boxShadow: 24,
    overflow: 'scroll'
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const SendEmail = ({ isopen, onclick, tomail }) => {
    const [subject, setSubject] = React.useState('');
    const file = React.createRef();
    const [filename, setFileName] = React.useState('');
    // let a = ["bold", "italic", "underline", "strike", "list", "indent", "align", "link"
    //     , "header", "image", "video", "clean"]
    // const b = ["size", "list", "header", "indent",]

    const placeholder = 'Type a message...';
    // React.useEffect(() => {
    //     if (file.current) {
    //         file.current.files[0] && setFileName(file.current.files[0].name);
    //     }
    // }, [filename]);

    const changeFileName = (e) => {
        if (file.current) {
            file.current.files[0] && setFileName(file.current.files[0].name);
        }
    }

    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: '#toolbar'
        },
        placeholder: placeholder
    });
    // const { quill, quillRef } = useQuill();

    const handleSave = () => {
        let sendMail = {};
        if (quill) {
            sendMail['subject'] = subject;
            sendMail['body'] = quill.root.innerHTML;
            if (file.current) {
                sendMail['file'] = filename;
            }
            // console.log('subject : ', subject);
            // console.log('text : ', quill.getText());
            // console.log('text with format : ', quill.root.innerHTML);
            // file.current.files[0] && console.log('selected file : ', file.current.files[0].name);
            // console.log(quillRef);
            console.log('sendMail', sendMail);
        }
    };

    return (
        <Modal
            open={isopen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='modalstyle' sx={style}>
                <Box sx={{ backgroundColor: ' #F6F7F8', padding: '1rem 2rem' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', width: '100% ' }}>
                        New Message
                        <CloseIcon sx={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => onclick(false)} />
                    </Box>
                </Box>
                <Box sx={{ padding: '0 2rem 2rem' }}>
                    <Box sx={{ mt: 2, borderBottom: '1px solid gray', padding: '10px 10px 10px 0' }} className='msg'>
                        <span>From</span> : <span style={{fontWeight:'bold'}}>appx@mitrahsoft.com</span>
                    </Box>
                    <Box sx={{ mt: 2, borderBottom: '1px solid gray', padding: '10px 10px 10px 0' }} className='msg'>
                        <span>To</span> : <span style={{fontWeight:'bold'}}>{tomail}</span>
                    </Box>
                    <Box sx={{ mt: 2, borderBottom: '1px solid gray' }} className='subject'>
                        <label htmlFor='Subject'>Subject : &nbsp;</label>
                        <TextField multiline maxRows={2} size='small' fullWidth variant="standard" value={subject} onChange={(e) => setSubject(e.target.value)} sx={{ width:'88%' }} />
                    </Box>
                    <br />
                    <Box className='quillstyles'>
                        <div id="toolbar" className='toolbar'>
                            <select className="ql-size">
                                <option value="small" />
                                <option selected />
                                <option value="large" />
                                <option value="huge" />
                            </select>
                            <button className="ql-bold" />
                            <button className="ql-italic" />
                            <button className="ql-underline" />
                            <button className="ql-strike" />
                            <button className="ql-list" value='ordered'></button>
                            <button className="ql-list" value='bullet'></button>
                            <select className="ql-align" >
                                <option selected='selected' />
                                <option value="center" />
                                <option value="right" />
                                <option value="justify" />
                            </select>
                            <button className="ql-link" />
                            <button className="ql-image" />
                            <button className="ql-video" />
                            <button className="ql-clean" />
                        </div>
                        <div id="editor" />
                        <div ref={quillRef} />
                    </Box>
                    <div className="sendMsg">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button component="label" startIcon={<AttachFileIcon />}>
                                <VisuallyHiddenInput type="file" ref={file} onChange={(e) => changeFileName(e.target.value)} accept='.jpg,.png' />
                            </Button>
                            <div>{filename ? filename : ''}</div>
                        </Box>
                        <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: '#088b89', ":hover": { backgroundColor: '#088b89' } }}><span style={{ marginRight: '13px', fontWeight: 'bold' }}>Send</span> <AiOutlineSend fill='white' /></Button>
                    </div>
                </Box>
            </Box>
        </Modal>
    );
};

export default SendEmail;


