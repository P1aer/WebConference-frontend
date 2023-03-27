import React, {useEffect, useState} from 'react';
import MainLayout from "../layouts/main";
import {useDispatch, useSelector} from "react-redux";
import {fetchRoom} from "../redux/slices/roomsSlice";
import {useParams} from "react-router-dom";
import VideoStreamElement from "../components/VideoStreamElement/VideoStreamElement";
import {socket} from "../socket";
import Peer from "simple-peer";

const RoomView = () => {
    const currentRoom = useSelector(state => state.rooms.currentRoom)
    const userData = useSelector(state => state.user.data)
    const [localStream, setLocalStream] = useState(null);
    const dispatch = useDispatch()
    const { id } = useParams()
    const [remotePeers,setRemotePeers] = useState([])

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

    }

    useEffect(() => {
        dispatch(fetchRoom({ id }))
    },[id,dispatch])

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setLocalStream(currentStream);
            });
        socket.auth = { ...socket.auth, userId: userData._id}
        socket.connect()
        socket.on('userJoined',(data) => {

        })
    },[])
    return (
        <MainLayout chat>
            <div>
                {currentRoom && currentRoom.name}
                <VideoStreamElement mediaStream={localStream}/>
            </div>
        </MainLayout>
    );
};

export default RoomView;