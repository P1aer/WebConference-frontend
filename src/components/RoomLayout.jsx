import React, {useEffect, useMemo, useState} from 'react';
import VideoStreamElement from "./VideoStreamElement/VideoStreamElement";
import {LOCAL_VIDEO} from "../constants/rtc";
import PropTypes from "prop-types";
import {MAX_COLUMN_NUMBER} from "../constants/room";

const RoomLayout = ({clients, roomMembers, provideMedia, sharedUserPeer = null}) => {
    const [isPictureMode, setPictureMode] = useState(null)
    const [upperElements, setUpper] = useState([])

    const bottomElements = useMemo(() =>
    !!sharedUserPeer ? [] : clients.filter(elem => elem !== isPictureMode).slice(0, MAX_COLUMN_NUMBER) || [],
        [clients, isPictureMode, sharedUserPeer])

    const onVideoClick = (object) => {
        if (sharedUserPeer) return
        setPictureMode(object)
    }
    const setDefaultMode = () => {
        if (sharedUserPeer) return
        setPictureMode(null)
    }
    useEffect(() => {
        if (!!sharedUserPeer) {
            setUpper([clients.find((peerId) => peerId === sharedUserPeer)])
        }
        else if (!!isPictureMode) {
            setUpper([clients.find((peerId) => peerId === isPictureMode)])
        }
        else {
            setUpper(clients.slice(3, 3 + MAX_COLUMN_NUMBER))
        }
    },[isPictureMode, clients, isPictureMode, sharedUserPeer])
    return (
        <div className='main-room__videos'>
            <div className={`main-room__upper 
            ${upperElements.length > 0 ? '': 'none'} 
            ${!sharedUserPeer ? 'portraitMode' : ''}`}>
                {upperElements.map((client) =>
                    <VideoStreamElement
                        key={client}
                        isMe={client === LOCAL_VIDEO}
                        name={roomMembers.find((elem) => elem.peerId === client)?.userName}
                    >
                        <video
                            onDoubleClick={() => !!isPictureMode ? setDefaultMode() : onVideoClick(client)}
                            ref={instance => provideMedia(client,instance)}
                            muted={client === LOCAL_VIDEO}
                            autoPlay
                            playsInline
                        />
                    </VideoStreamElement>
                )}
            </div>
            <div className={`main-room__bottom
             ${bottomElements.length > 0 ? '': 'none'}
              ${upperElements.length !== 0 ? 'portraitMode': ''}`
            }>
                {bottomElements.map((client) =>
                    <VideoStreamElement
                        key={client}
                        isMe={client === LOCAL_VIDEO}
                        name={roomMembers.find((elem) => elem.peerId === client)?.userName}
                    >
                        <video
                            onDoubleClick={() => onVideoClick(client)}
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