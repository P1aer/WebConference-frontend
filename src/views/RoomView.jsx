import React, {useEffect, useState} from 'react';
import MainLayout from "../layouts/main";
import {useDispatch, useSelector} from "react-redux";
import {fetchRoom} from "../redux/slices/roomsSlice";
import {useParams} from "react-router-dom";
import VideoStreamElement from "../components/VideoStreamElement/VideoStreamElement";
import {socket} from "../socket";
import Peer from "simple-peer";
import {useWebRTC} from "../hooks/useWebRTC";
import {LOCAL_VIDEO} from "../constants/rtc";

const RoomView = () => {
    const currentRoom = useSelector(state => state.rooms.currentRoom)
    const userData = useSelector(state => state.user.data)
    const dispatch = useDispatch()
    const { id } = useParams()
    const {clients:webClients, provideMediaRef} = useWebRTC(id)
/*

    // сделать новый peer для нового пользователя
    const userJoinedRoom = () => {
        const peer = new Peer({ initiator: true, trickle: false, localStream });
        peer.on("signal", (data) => {
            socket.emit("userAnswer", {
                signalData: data,
                from: userData,
            });
        });

    }
    // сделать peer со всем участниками комнаты
    const meJoinedRoom = () => {
        const peer = new Peer({ initiator: true, trickle: false, localStream });
        peer.on("signal", (data) => {
            socket.emit("userJoined", {
                signalData: data,
                from: userData,
            });
        });

        peer.on("stream", (currentStream) => {
            //userVideo.current.srcObject = currentStream;
        });

        socket.on("callAccepted", (signal) => {
          //  setCallAccepted(true);

            peer.signal(signal);
        });

    }*/

    useEffect(() => {
        dispatch(fetchRoom({ id }))
    },[id,dispatch])

    useEffect(() => {
        socket.auth = { ...socket.auth, userId: userData._id}
        socket.connect()
    },[])
    return (
        <MainLayout chat>
            <div>
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
            </div>
        </MainLayout>
    );
};

export default RoomView;