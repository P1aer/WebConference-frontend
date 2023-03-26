import {io} from "socket.io-client";

export const socket = new io(process.env.REACT_APP_SERVER_URL,{
    auth: { token: process.env.REACT_APP_SOCKET_TOKEN },
    autoConnect: false,
    reconnection: false,
})
///socket.connect()