import React, {useEffect, useState} from 'react';
import MainLayout from "../layouts/main";
import {useDispatch, useSelector} from "react-redux";
import {addMessage, fetchRoom, leaveCurrentRoom} from "../redux/slices/roomsSlice";
import {useNavigate, useParams} from "react-router-dom";
import {socket} from "../socket";
import {useWebRTC} from "../hooks/useWebRTC";
import {ACTIONS, LOCAL_VIDEO} from "../constants/rtc";
import StreamControlPanel from "../components/StreamControlPanel/StreamControlPanel";
import {setRTCDefault} from "../redux/slices/rtcSlice";
import {Paper, Typography} from "@mui/material";
import "./RoomView.scss"
import RoomLayout from "../components/RoomLayout";

const RoomView = () => {
    const [roomMembers, setRoomMembers] = useState([])
    const navigate = useNavigate()
    const currentRoom = useSelector(state => state.rooms.currentRoom)
    const userData = useSelector(state => state.user.data)
    const { isChatOpen, isMembersOpen } = useSelector(state => state.rtc)
    const dispatch = useDispatch()
    const { id } = useParams()
    const {
        clients: webClients,
        provideMediaRef,
        toggleMic,
        toggleCam,
        toggleSound,
        shareScreen,
        stopSharingScreen,
    } = useWebRTC(id)

    useEffect(() => {
        if (currentRoom === null) {
          navigate('/')
        }
    },[currentRoom])
    useEffect(() => {
        socket.on(ACTIONS.SET_MESSAGE, (data) => dispatch(addMessage(data)))
        socket.on(ACTIONS.JOINED, (user) => setRoomMembers(prev => [...prev, user]) )
        socket.on(ACTIONS.LEAVED, (user) => setRoomMembers(
            prev => prev
                .filter((elem) => elem.peerId !== user.peerId
                )
        ))
    },[])

    useEffect(() => {
        dispatch(fetchRoom({ id, cb: (data) =>
                setRoomMembers([{
                    peerId: LOCAL_VIDEO,
                    userName: userData.name,
                    userId: userData._id,
                },
                    ...data.users
                    ]
                )}
        ))
        dispatch(setRTCDefault())
    },[id,dispatch])

    useEffect(() => {
        socket.auth = {
            ...socket.auth,
            userId: userData._id,
            userName: userData.name
        }
        socket.connect()
        return () => {
            dispatch(leaveCurrentRoom())
        }
    },[userData._id, dispatch])

    return (
        <MainLayout chat={isChatOpen} members={isMembersOpen} roomUsers={roomMembers}>
            <Paper square className="main-room">
                <div className='main-room__title'>
                    <Typography variant="h3" component='span'>
                        #
                    </Typography>
                    <Typography variant="h3">
                        {currentRoom && currentRoom.name}
                    </Typography>
                </div>
                <RoomLayout
                    clients={webClients}
                    roomMembers={roomMembers}
                    provideMedia={provideMediaRef}
                />
                <StreamControlPanel
                    toggleMic={toggleMic}
                    toggleCam={toggleCam}
                    toggleSound={toggleSound}
                    shareScreen={shareScreen}
                    stopShare={stopSharingScreen}
                />
            </Paper>
        </MainLayout>
    );
};

export default RoomView;