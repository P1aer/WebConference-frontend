import React, {useState} from 'react';
import { Button, Modal, Paper, TextField, ThemeProvider, Typography} from "@mui/material";
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import PropTypes from "prop-types";
import {lightTheme} from "../constants/theme";
import {useDispatch} from "react-redux";
import {createRoom} from "../redux/slices/roomsSlice";
const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: '#ffffff',
    border: '2px solid #000',
    boxShadow: 24,
    color: 'black',
    p: 4,
};
const CreateRoomDialog = ({handleClose, open}) => {
    const [roomName, setRoomName] = useState('')
    const dispatch = useDispatch()
    async function onCreateClick() {
        try {
            if (!roomName) return
            dispatch(createRoom({
                values: {
                    name: roomName,
                }
            }))
            setRoomName('')
            handleClose()
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Paper sx={style}>
                    <Typography
                        align='center'
                        id="modal-modal-title"
                        variant="h4" component="h2"
                        sx={{mb: 1}}
                    >
                        Create your own room
                    </Typography>
                    <Typography
                        align='center'
                        variant='subtitle1'
                        id="modal-modal-description"
                        sx={{opacity: 0.65, mb: 2}}
                    >
                        Your room is a place where colleagues can join and chat via audio or video.
                    </Typography>
                    <ThemeProvider theme={lightTheme}>
                        <TextField
                            value={roomName}
                            fullWidth sx={{mb: 2}}
                            label='Name'
                            onInput={(event) => setRoomName(event.target?.value)}
                        />
                    </ThemeProvider>
                    <Button onClick={onCreateClick} fullWidth size='large' variant='contained'>Create Room</Button>
                </Paper>
            </Fade>
        </Modal>
    );
};

CreateRoomDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
}
export default CreateRoomDialog;