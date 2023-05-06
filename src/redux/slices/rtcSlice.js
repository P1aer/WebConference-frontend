import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isMicOn: false,
    isCamOn: false,
    isSoundOn: true,
    isChatOpen: false,
    isScreenShare: false,
}
export const rtcSlice = createSlice({
    name: 'rtc',
    initialState,
    reducers: {
        setMicState: (state, action) => {
            state.isMicOn = action.payload
        },
        setCamState: (state, action) => {
            state.isCamOn = action.payload
        },
        setSoundState: (state, action) => {
            state.isSoundOn = action.payload
        },
        setChatState: (state, action) => {
            state.isChatOpen = action.payload
        },
        setScreenShare: (state, action) => {
            state.isScreenShare = action.payload
        },
        setRTCDefault: (state) => {
            state.isSoundOn = initialState.isSoundOn
            state.isMicOn = initialState.isMicOn
            state.isCamOn = initialState.isCamOn
            state.isChatOpen = initialState.isChatOpen
            state.isScreenShare = initialState.isScreenShare
        },
    },
    extraReducers: {
    }
})

export const { setCamState, setSoundState, setRTCDefault, setMicState, setChatState, setScreenShare } = rtcSlice.actions

export default rtcSlice.reducer