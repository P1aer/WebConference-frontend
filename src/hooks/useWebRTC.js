import {useCallback, useEffect, useRef, useState} from "react";
import {useStateWithCallback} from "./useStateWithCallback";
import {socket} from "../socket";
import {ACTIONS, LOCAL_VIDEO, SERVERS} from "../constants/rtc";
import {useDispatch, useSelector} from "react-redux";
import {setCamState, setMicState, setScreenShare, setSoundState} from "../redux/slices/rtcSlice";



export const useWebRTC = (roomId) => {
    const [clients, setClients] = useStateWithCallback([])
    const panelState = useSelector(state => state.rtc)

    const [savedState, setSavedState] = useState({
        isMicOn: false,
        isCamOn: false
    })
    const dispatch = useDispatch()

    const peerConnections = useRef({})
    const localMediaStream = useRef(null)
    const localDisplayStream = useRef(null)
    const peerMediaElements = useRef({
        [LOCAL_VIDEO]:null,
    })
    const sendersTracks = useRef([])
    const displayVideoElement = useRef(null)
    const addNewClient = useCallback((newClient, cb) => {
        setClients(list => {
            if (!list.includes(newClient)) {
                return [...list, newClient]
            }

            return list;
        }, cb);
    }, [setClients]);
    //локальные инстансы стрима
    useEffect(() => {
        setClients([])
        async function startLocalMedia() {
            if (!navigator
                .mediaDevices) return
            localMediaStream.current = await navigator
                .mediaDevices.getUserMedia({ video: true, audio: true })
            localMediaStream.current.getAudioTracks()[0].enabled = false
            localMediaStream.current.getVideoTracks()[0].enabled = false
            addNewClient(LOCAL_VIDEO,() => {
                const localVideoElement = peerMediaElements.current[LOCAL_VIDEO]
                if(localVideoElement) {
                    localVideoElement.volume = 0
                    localVideoElement.srcObject = localMediaStream.current
                }
            })
        }
        startLocalMedia()
            .then(() => socket.emit(ACTIONS.JOIN, roomId))

        return () => {
            try {
                localMediaStream.current?.getTracks().forEach(track => track.stop())
                localDisplayStream.current?.getTracks().forEach(track => track.stop())
                for (const peer in peerConnections.current) {
                    peerConnections.current[peer].close()
                }
                sendersTracks.current = []
                peerConnections.current = {}
                socket.emit(ACTIONS.LEAVE)
            }
            catch (error) {
                console.log(error)
            }
        }
    },[roomId, addNewClient, setClients])

    // сетевые инстансы пира
    useEffect(() => {
        async function handlePeer({ peerID,createOffer}) {
            if (peerID in peerConnections.current) {
                return console.warn('already connected')
            }

            peerConnections.current[peerID] = new RTCPeerConnection({
                iceServers: SERVERS.iceServers,
                iceCandidatePoolSize: SERVERS.iceCandidatePoolSize
            })

            peerConnections.current[peerID].onicecandidate = event => {
                if (event.candidate) {
                    socket.emit(ACTIONS.RELAY_ICE, {
                        peerID,
                        iceCandidate: event.candidate,
                    })
                }
            }

            let trackNumber = 0
            peerConnections.current[peerID].ontrack = ({streams: [remoteStream], track}) => {
                trackNumber++
                if(trackNumber === 2) {
                    trackNumber = 0;
                    addNewClient(peerID, () => {
                        if (peerMediaElements.current[peerID]) {
                            peerMediaElements.current[peerID].srcObject = remoteStream;
                        } else {
                            // FIX LONG RENDER IN CASE OF MANY CLIENTS
                            let settled = false;
                            const interval = setInterval(() => {
                                if (peerMediaElements.current[peerID]) {
                                    peerMediaElements.current[peerID].srcObject = remoteStream;
                                    settled = true;
                                }

                                if (settled) {
                                    clearInterval(interval);
                                }
                            }, 1000);
                        }
                    })
                }
            }
            const senders = []
            localMediaStream.current.getTracks().forEach(track => {
                senders
                    .push(peerConnections.current[peerID]
                        .addTrack(track, localMediaStream.current))
            })
            if (panelState.isScreenShare) {
                senders.filter(sender => sender.track.kind === 'video')
                    .forEach(sender => {
                        sender.replaceTrack(localDisplayStream.current.getTracks()[0])
                    })
            }
            sendersTracks.current.push(...senders)
            if (createOffer){
                const offer = await peerConnections.current[peerID].createOffer()
                await peerConnections.current[peerID].setLocalDescription(offer)
                socket.emit(ACTIONS.RELAY_SDP,{
                    peerID,
                    sessionDescription: offer,
                })
            }
        }
        socket.on(ACTIONS.ADD_PEER, handlePeer)

        return () => {
            socket.off(ACTIONS.ADD_PEER);
        }
    },[addNewClient,panelState.isScreenShare])

    // прилетели дескрипторы
    useEffect(() => {
        async function setRemoteMedia({peerID,sessionDescription }) {
            await peerConnections.current[peerID]?.setRemoteDescription(
                new RTCSessionDescription(sessionDescription)
            )

            if (sessionDescription.type === 'offer') {
                const answer = await peerConnections.current[peerID].createAnswer()
                await peerConnections.current[peerID].setLocalDescription(answer)
                socket.emit(ACTIONS.RELAY_SDP, {
                    peerID,
                    sessionDescription: answer,
                })
            }
        }

        socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia)
        return () => {
            socket.off(ACTIONS.SESSION_DESCRIPTION);
        }
    },[])

    //прилетели кандидаты
    useEffect(() => {
        socket.on(ACTIONS.ICE_CANDIDATE, ({peerID, iceCandidate}) => {
            peerConnections.current[peerID]?.addIceCandidate(
                new RTCIceCandidate(iceCandidate)
            )
        })
        return () => {
            socket.off(ACTIONS.ICE_CANDIDATE);
        }
    },[])

    // вышел из комнаты
    useEffect(()=> {
        const handleRemovePeer = ({peerID}) => {
            if (peerConnections.current[peerID]) {
                peerConnections.current[peerID].close()
            }

            delete peerConnections.current[peerID]
            delete peerMediaElements.current[peerID]

            setClients(list => list.filter(cl => cl !== peerID))
        }
        socket.on(ACTIONS.REMOVE_PEER,  handleRemovePeer)

        return () => {
            socket.off(ACTIONS.REMOVE_PEER);
        }
    },[setClients])

    const provideMediaRef = useCallback( (id, node) => {
        peerMediaElements.current[id] = node
    },[])

    const toggleSound = useCallback((withSave = true) => {
        if (panelState.isSoundOn) {
            setSavedState({
                isMicOn: panelState.isMicOn,
                isCamOn: panelState.isCamOn,
            })
            localMediaStream.current.getTracks().forEach(track => track.enabled = false)
            for (const stream in peerConnections.current) {
                peerMediaElements.current[stream].muted = true
            }
            dispatch(setCamState(false))
            dispatch(setMicState(false))
        }
        else {
            for (const stream in peerConnections.current) {
                peerMediaElements.current[stream].muted = false
            }
            if (withSave) {
                localMediaStream.current.getAudioTracks()[0].enabled = savedState.isMicOn
                localMediaStream.current.getVideoTracks()[0].enabled = savedState.isCamOn
                dispatch(setCamState(savedState.isCamOn))
                dispatch(setMicState(savedState.isMicOn))
            }

        }
    }, [panelState, savedState, peerConnections,dispatch])

    const toggleMic = useCallback(() => {
        if (!panelState.isSoundOn && !panelState.isMicOn) {
            toggleSound(false)
            dispatch(setSoundState(true))
        }
        localMediaStream.current.getAudioTracks()[0].enabled = !panelState.isMicOn
    },[panelState,dispatch, toggleSound])

    const toggleCam = useCallback(() => {
        if (!panelState.isSoundOn && !panelState.isCamOn) {
            toggleSound(false)
            dispatch(setSoundState(true))
        }
        localMediaStream.current.getVideoTracks()[0].enabled = !panelState.isCamOn
    },[panelState,dispatch,toggleSound])

    const stopSharingScreen = () => {
        localDisplayStream.current.getTracks().forEach(track => track.stop())
        sendersTracks.current
            .filter(sender => sender.track.kind === 'video')
            .forEach(sender => {
                sender.replaceTrack(localMediaStream.current.getTracks()[1])
            })
        peerMediaElements.current[LOCAL_VIDEO].srcObject = localMediaStream.current
        dispatch(setScreenShare(false))
    }

    const shareScreen = async () => {
        localDisplayStream.current = await navigator.mediaDevices.getDisplayMedia( {
            video: true,
//            audio: true
        })
        if (peerMediaElements.current[LOCAL_VIDEO]) {
            peerMediaElements.current[LOCAL_VIDEO].srcObject = localDisplayStream.current
        }
        sendersTracks.current
            .filter(sender => sender.track.kind === 'video')
            .forEach(sender => {
                sender.replaceTrack(localDisplayStream.current.getTracks()[0])
            })

        localDisplayStream.current.getTracks()[0].onended = () => {
            stopSharingScreen()
        }
        dispatch(setScreenShare(true))
     }
    return {
        clients,
        provideMediaRef,
        toggleMic,
        toggleCam,
        toggleSound,
        shareScreen,
        stopSharingScreen,
        displayVideoElement,
    }
}