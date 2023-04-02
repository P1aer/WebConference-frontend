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
    return (
        <MainLayout>
            <div>
            </div>
        </MainLayout>
    );
};

export default MainPage;