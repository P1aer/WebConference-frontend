import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "../../axios";
import {servers} from "../../constants/rtc";

const initialState = {
    localStream: null,
    // new RTCPeerConnection(servers);
    peerConnection: null,
    remoteStreams: {},
    status: "loading"
}
export const rtcSlice = createSlice({
    name: 'rtc',
    initialState,
    reducers: {

    },
    extraReducers: {
    }
})

// Action creators are generated for each case reducer function
//export const { getLocalStream } = rtcSlice.actions

export default rtcSlice.reducer