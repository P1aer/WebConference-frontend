import React  from 'react';
import './ChatComponent.scss'
import {useSelector} from "react-redux";

import {ChatList} from "./ChatList";

const ChatComponent = () => {
    const room = useSelector(state => state.rooms.currentRoom)
    const user = useSelector(state => state.user)

    return (
        <ChatList user={user} room={room} />
    );
};

export default ChatComponent;