export const SERVERS = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302']
        },
    ],
    iceCandidatePoolSize: 10,
}
export const ACTIONS = {
    JOIN: 'join',
    LEAVE: 'leave',
    ADD_PEER: 'add-peer',
    REMOVE_PEER: 'remove-peer',
    RELAY_SDP: 'relay-sdp',
    RELAY_ICE: 'relay-ice',
    ICE_CANDIDATE: 'ice-candidate',
    SESSION_DESCRIPTION: 'session-description',
    NEW_MESSAGE: 'ROOM:NEW_MESSAGE',
    SET_MESSAGE: 'ROOM:SET_MESSAGES',
    JOINED:'ROOM:JOINED',
    LEAVED: 'ROOM:LEAVED',
}

export const LOCAL_VIDEO = 'LOCAL_VIDEO'