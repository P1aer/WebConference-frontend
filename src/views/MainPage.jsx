import React, {useEffect, useRef, useState} from 'react';
import MainLayout from "../layouts/main";
import {useDispatch, useSelector} from "react-redux";
import {socket} from "../socket";
import {fetchRooms} from "../redux/slices/roomsSlice";

const MainPage = () => {
    const {_id: id } = useSelector(state => state.user.data)
    const [localStream, setLocalStream] = useState();
    const localVideo = useRef();
    const dispatch = useDispatch()
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setLocalStream(currentStream);
                localVideo.current.srcObject = currentStream
            });
        socket.auth = { ...socket.auth, userId: id}
        socket.connect()
        socket.on('userJoin',(data) => {

        })
/*       dispatch(getLocalStream())*/
    },[])
    return (
        <MainLayout>
            <div>
                <video
                    autoPlay
                    muted
                    ref={localVideo}
                />
            </div>
        </MainLayout>
    );
};

export default MainPage;