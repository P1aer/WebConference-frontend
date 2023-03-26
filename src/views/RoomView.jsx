import React, {useEffect} from 'react';
import MainLayout from "../layouts/main";
import {useDispatch, useSelector} from "react-redux";
import {fetchRoom} from "../redux/slices/roomsSlice";
import {useParams} from "react-router-dom";

const RoomView = () => {
    const currentRoom = useSelector(state => state.rooms.currentRoom)
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(fetchRoom({ id }))
    },[id,dispatch])
    return (
        <MainLayout chat>
            <div>
                {currentRoom && currentRoom.name}
            </div>
        </MainLayout>
    );
};

export default RoomView;