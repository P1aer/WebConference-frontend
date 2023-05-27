import React from 'react';
import {IconButton, Paper, Stack} from "@mui/material";
import "./StreamControlPanel.scss"
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import LogoutIcon from '@mui/icons-material/Logout';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { blue } from '@mui/material/colors';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCamState, setMicState, setSoundState, setChatState, setMembersState} from "../../redux/slices/rtcSlice";
import PropTypes from "prop-types";

const StreamControlPanel = ({ toggleMic, toggleCam, toggleSound, shareScreen, stopShare }) => {
    const dispatch = useDispatch()
    const {
        isCamOn,
        isSoundOn,
        isMicOn,
        isChatOpen,
        isScreenShare,
        isMembersOpen
    } = useSelector(state => state.rtc)
    const toggleCamIcon = () => {
        toggleCam()
        dispatch(setCamState(!isCamOn))
    }
    const toggleSoundIcon = () => {
        toggleSound()
        dispatch(setSoundState(!isSoundOn))
    }
    const toggleMicIcon = () => {
        toggleMic()
        dispatch(setMicState(!isMicOn))
    }
    const toggleChat = () => dispatch(setChatState(!isChatOpen))
    const toggleMembers = () => dispatch(setMembersState(!isMembersOpen))

    return (
        <Paper square className='stream-panel' >
            <Stack direction="row" spacing={4}>
                <IconButton aria-label='toggle mic' color={isMicOn ? 'inherit' : 'error'} onClick={toggleMicIcon}>
                    {isMicOn ? <MicIcon aria-label='toggle mic on'/> : <MicOffIcon aria-label='toggle mic off' />}
                </IconButton>
                <IconButton aria-label='toggle cam' color={isCamOn ? 'inherit' : 'error'} onClick={toggleCamIcon}>
                    {isCamOn ? <VideocamIcon aria-label='toggle cam on'/> : <VideocamOffIcon aria-label='toggle cam off'/>}
                </IconButton>
                <IconButton aria-label='toggle sound' onClick={toggleSoundIcon}>
                    {isSoundOn ? <HeadphonesIcon aria-label='toggle sound on'/> : <HeadsetOffIcon aria-label='toggle sound off' />}
                </IconButton>
                <IconButton aria-label='toggle Share screen' data-testid={'share'} onClick={isScreenShare ? stopShare : shareScreen}>
                    { isScreenShare ? <CancelPresentationIcon aria-label='toggle Share screen on'/> :  <PresentToAllIcon aria-label='toggle Share screen off'/> }
                </IconButton>
                <IconButton aria-label='toggle Chat' onClick={toggleChat}>
                    { isChatOpen ? <ChatBubbleOutlinedIcon aria-label='toggle Chat on' sx={{ color: blue[300] }}/> : <ChatOutlinedIcon aria-label='toggle Chat off'/> }
                </IconButton>
                <IconButton aria-label='toggle Members' onClick={toggleMembers}>
                    { isMembersOpen ? <PeopleAltOutlinedIcon aria-label='toggle Members on' sx={{ color: blue[300] }}/> : <PeopleAltOutlinedIcon aria-label='toggle Members off'/>}
                </IconButton>
                <Link to="/" aria-label='leave room'>
                    <IconButton aria-label='leave room' color='error'><LogoutIcon aria-label='leave room' /></IconButton>
                </Link>
            </Stack>
        </Paper>
    );
};

StreamControlPanel.propTypes = {
    toggleMic: PropTypes.func.isRequired,
    toggleCam: PropTypes.func.isRequired,
    toggleSound: PropTypes.func.isRequired,
    shareScreen: PropTypes.func.isRequired,
    stopShare: PropTypes.func.isRequired,
}
export default StreamControlPanel;