import React, { useMemo, useState} from 'react';
import VideoStreamElement from "./VideoStreamElement/VideoStreamElement";
import {LOCAL_VIDEO} from "../constants/rtc";
import PropTypes from "prop-types";
import {MAX_COLUMN_NUMBER} from "../constants/room";

const RoomLayout = ({clients, roomMembers, provideMedia }) => {
    const [isPictureMode, setPictureMode] = useState(null)
    const [upperVisibility, setUpper] = useState(true)
    const [bottomVisibility, setBottom] = useState(true)
    const bottomElements = useMemo(() =>
     clients.slice(0, MAX_COLUMN_NUMBER) || [],
        [clients])

    const upperElements = useMemo(() =>
            clients.slice(4, 4+ MAX_COLUMN_NUMBER) || [],
        [clients])

    const onVideoClick = (object, func) => {
        func(false)
        setPictureMode(object)
    }
    const setDefaultMode = () => {
        setUpper(true)
        setBottom(true)
        setPictureMode(null)
    }

    return (
        <div className='main-room__videos'>
            <div className={`main-room__upper 
            ${upperVisibility && upperElements.length > 0  ? '': 'none'} 
            ${!isPictureMode ? 'portraitMode' : ''}`}
            >
                {upperElements.map((client) =>
                    <VideoStreamElement
                        className={!!isPictureMode && isPictureMode !== client ? 'none' : ''}
                        key={client}
                        isMe={client === LOCAL_VIDEO}
                        name={roomMembers.find((elem) => elem.peerId === client)?.userName}
                    >
                        <video
                            role='listitem'
                            onDoubleClick={() => !!isPictureMode ? setDefaultMode() : onVideoClick(client,setBottom)}
                            ref={instance => provideMedia(client,instance)}
                            muted={client === LOCAL_VIDEO}
                            autoPlay
                            playsInline
                        />
                    </VideoStreamElement>
                )}
            </div>
            <div className={`main-room__bottom
             ${bottomVisibility ? '': 'none'}
              ${!isPictureMode && upperElements.length > 0 ? 'portraitMode': ''}`
            }>
                {bottomElements.map((client) =>
                    <VideoStreamElement
                        className={!!isPictureMode && isPictureMode !== client ? 'none' : ''}
                        key={client}
                        isMe={client === LOCAL_VIDEO}
                        name={roomMembers.find((elem) => elem.peerId === client)?.userName}
                    >
                        <video
                            role='listitem'
                            onDoubleClick={() => !!isPictureMode ? setDefaultMode() : onVideoClick(client, setUpper)}
                            ref={instance => provideMedia(client,instance)}
                            muted={client === LOCAL_VIDEO}
                            autoPlay
                            playsInline
                        />
                    </VideoStreamElement>
                )}
            </div>
        </div>
    );
};

RoomLayout.propTypes = {
    clients: PropTypes.array.isRequired,
    roomMembers: PropTypes.array.isRequired,
    provideMedia: PropTypes.func.isRequired,
}
export default RoomLayout;