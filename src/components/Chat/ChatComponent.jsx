import React, {useState} from 'react';
import './ChatComponent.scss'
import {Grid, IconButton, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import {useDispatch, useSelector} from "react-redux";
import { blue } from '@mui/material/colors';
import {setChatState} from "../../redux/slices/rtcSlice";
import {socket} from "../../socket";
import {ACTIONS} from "../../constants/rtc";
import {useParams} from "react-router-dom";
import ChatMessage from "./ChatMessage";
import {addMessage} from "../../redux/slices/roomsSlice";

const ChatComponent = () => {
    const dispatch = useDispatch()
    const room = useSelector(state => state.rooms.currentRoom)
    const user = useSelector(state => state.user)
    const {id} = useParams()

    const [message, setMessage] = useState('')
    const onCloseClick = () => {
        dispatch(setChatState(false))
    }
    const onSendMessage = () => {
        if (!message) return

        const obj = {
            roomId: id,
                user: user.data,
                text: message,
        }
        socket.emit(ACTIONS.NEW_MESSAGE, obj)
        dispatch(addMessage(obj))
        setMessage('')
    }
    return (
        <Paper square className='chat-sidebar'>
            <Grid container direction='column' sx={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}>
                <Grid flexBasis="auto" item flexShrink={1} container alignItems="center" justifyContent="between">
                    <Grid flexGrow={1} item>
                        <Typography className='chat-title'>
                            Room Chat
                        </Typography>
                    </Grid>
                    <Grid flexBasis="auto" item flexShrink={1}>
                        <IconButton onClick={onCloseClick}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item flexGrow={1}>
                   <Paper className='chat-body' variant='outlined' sx={
                       {
                           height: '69vh',
                           maxHeight: '70vh',
                           marginTop: '1rem',
                           maxWidth: '23vw',
                           backgroundColor: '#2b2b31',
                           padding: '1rem',
                           overflowY: 'scroll',
                           overflowX: 'hidden'
                       }}>
                       {room && room.messages.map((object,index) =>
                           <ChatMessage data={object} userId={user.data._id} key={index}/>
                       )}
                   </Paper>
                </Grid>
                <Grid item flexShrink={1}>
                    <TextField
                        fullWidth
                        placeholder='Type message'
                        value={message}
                        onInput={(event) => setMessage(event.target.value)}
                        InputProps={{
                            endAdornment: (<InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={onSendMessage}
                                >
                                    <SendIcon aria-label='send message' sx={{ color: message ? blue[500] : 'inherit'}}/>
                                </IconButton>
                            </InputAdornment>),
                            style: {
                                padding: '0 1.2rem 0 0'
                            }
                        }}
                    />
                </Grid>
            </Grid>

        </Paper>
    );
};

export default ChatComponent;