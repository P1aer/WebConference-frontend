import {io} from "socket.io-client";
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {servers} from "./constants/rtc";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchAuthMe} from "./redux/slices/userSlice";

const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream= null;
const socket = new io(process.env.REACT_APP_SERVER_URL,{
  auth: { token: process.env.REACT_APP_SOCKET_TOKEN },
  autoConnect: false, // disables auto connection, by default the client would connect to the server as soon as the io() object is instatiated
  reconnection: false,
})
socket.connect()
function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => !!state.user.data )
  const onStreamBtnClick = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true})
    remoteStream =  new MediaStream()
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track,localStream)
    })
    pc.ontrack = event => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track)
      })
    }
    socket.emit("ready", localStream.id, 'yes');
  }
  const betterCallSaul = async () => {
/*    pc.onicecandidate = event => {
      event.candidate
      //save to db
    }*/
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };
  }
  useEffect(() => {
    dispatch(fetchAuthMe())
  },[])
  return (
      <RouterProvider router={router(isLoggedIn)}>
        <div className="App">
          <button onClick={onStreamBtnClick}> stream </button>
        </div>
      </RouterProvider>
  );
}

export default App;
