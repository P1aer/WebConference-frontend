import React, {useEffect, useState} from 'react';
import MainLayout from "../layouts/main";
import {useDispatch, useSelector} from "react-redux";
import {fetchRoom, leaveCurrentRoom} from "../redux/slices/roomsSlice";
import {useParams} from "react-router-dom";
import VideoStreamElement from "../components/VideoStreamElement/VideoStreamElement";
import {socket} from "../socket";
import {useWebRTC} from "../hooks/useWebRTC";
import {LOCAL_VIDEO} from "../constants/rtc";
import StreamControlPanel from "../components/StreamControlPanel/StreamControlPanel";
import {setRTCDefault} from "../redux/slices/rtcSlice";
import {Paper} from "@mui/material";
import "./RoomView.scss"

const RoomView = () => {
    const currentRoom = useSelector(state => state.rooms.currentRoom)
    const userData = useSelector(state => state.user.data)
    const dispatch = useDispatch()
    const { id } = useParams()
    const {clients:webClients, provideMediaRef} = useWebRTC(id)

    useEffect(() => {
        dispatch(fetchRoom({ id }))
        dispatch(setRTCDefault())
    },[id,dispatch])

    useEffect(() => {
        socket.auth = { ...socket.auth, userId: userData._id}
        socket.connect()
        return () => {
            dispatch(leaveCurrentRoom())
        }
    },[])
    return (
        <MainLayout chat>
            <Paper square className="main-room">
                {currentRoom && currentRoom.name}
                {webClients.map((client) =>
                    <VideoStreamElement key={client}>
                        <video
                            ref={instance => provideMediaRef(client,instance)}
                            muted={client === LOCAL_VIDEO}
                            autoPlay
                            playsInline
                        />
                    </VideoStreamElement>
                )}
            </Paper>
            <StreamControlPanel />
        </MainLayout>
    );
};

export default RoomView;