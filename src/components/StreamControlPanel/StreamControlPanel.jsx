import React from 'react';
import {IconButton, Paper, Stack} from "@mui/material";
import "./StreamControlPanel.scss"
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import LogoutIcon from '@mui/icons-material/Logout';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import {Link} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {setCamState, setMicState, setSoundState} from "../../redux/slices/rtcSlice";
const StreamControlPanel = () => {
    const dispatch = useDispatch()
    const {isCamOn, isSoundOn, isMicOn} = useSelector(state => state.rtc)
    const toggleCam = () => dispatch(setCamState(!isCamOn))
    const toggleSound = () => dispatch(setSoundState(!isSoundOn))
    const toggleMic = () => dispatch(setMicState(!isMicOn))
    return (
        <Paper square className='stream-panel' >
            <Stack direction="row" spacing={4}>
                <IconButton onClick={toggleMic}>
                    {isMicOn ? <MicIcon/> : <MicOffIcon/>}
                </IconButton>
                <IconButton onClick={toggleCam}>
                    {isCamOn ? <VideocamIcon/> : <VideocamOffIcon/>}
                </IconButton>
                <IconButton onClick={toggleSound}>
                    {isSoundOn ? <HeadphonesIcon/> : <HeadsetOffIcon />}
                </IconButton>
                <IconButton><PresentToAllIcon/></IconButton>
                <Link to="/">
                    <IconButton color='error'><LogoutIcon/></IconButton>
                </Link>
            </Stack>
        </Paper>
    );
};

export default StreamControlPanel;