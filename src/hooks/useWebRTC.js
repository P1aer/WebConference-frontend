import {useCallback, useEffect, useRef} from "react";
import {useStateWithCallback} from "./useStateWithCallback";
import {socket} from "../socket";
import {ACTIONS, LOCAL_VIDEO, SERVERS} from "../constants/rtc";



export const useWebRTC = (roomId) => {
    const [clients, setClients] = useStateWithCallback([])

    const peerConnections = useRef({})
    const localMediaStream = useRef(null)
    const peerMediaElements = useRef({
        [LOCAL_VIDEO]:null,
    })
    const addNewClient = useCallback((newClient, cb) => {
        setClients(list => {
            if (!list.includes(newClient)) {
                return [...list, newClient]
            }

            return list;
        }, cb);
    }, [clients, setClients]);

    //локальные инстансы стрима
    useEffect(() => {
        setClients([])
        async function startLocalMedia() {
            localMediaStream.current = await navigator
                .mediaDevices.getUserMedia({ video: true, audio: true })

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
                localMediaStream.current.getTracks().forEach(track => track.stop())
                socket.emit(ACTIONS.LEAVE)
            }
            catch (error) {
                console.log(error)
            }
        }
    },[roomId])

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
            peerConnections.current[peerID].ontrack = ({streams: [remoteStream]}) => {
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

            localMediaStream.current.getTracks().forEach(track => {
                peerConnections.current[peerID].addTrack(track, localMediaStream.current)
            })

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
    },[addNewClient])

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
    },[])

    const provideMediaRef = useCallback( (id, node) => {
        peerMediaElements.current[id] = node
    },[])

    return {
        clients,
        provideMediaRef,
    }
}