import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isMicOn: false,
    isCamOn: false,
    isSoundOn: true,
    isChatOpen: false,
    isScreenShare: false,
    isMembersOpen: false,
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
            if (state.isMembersOpen && action.payload) {
                state.isMembersOpen = false
            }
            state.isChatOpen = action.payload
        },
        setScreenShare: (state, action) => {
            state.isScreenShare = action.payload
        },
        setMembersState: (state, action) => {
            if (state.isChatOpen && action.payload) {
                state.isChatOpen = false
            }
            state.isMembersOpen = action.payload
        },
        setRTCDefault: (state) => {
            state.isSoundOn = initialState.isSoundOn
            state.isMicOn = initialState.isMicOn
            state.isCamOn = initialState.isCamOn
            state.isChatOpen = initialState.isChatOpen
            state.isScreenShare = initialState.isScreenShare
            state.isMembersOpen = initialState.isMembersOpen
        },
    },
    extraReducers: {
    }
})

export const {
    setCamState,
    setSoundState,
    setRTCDefault,
    setMicState,
    setChatState,
    setScreenShare,
    setMembersState,
} = rtcSlice.actions

export default rtcSlice.reducer