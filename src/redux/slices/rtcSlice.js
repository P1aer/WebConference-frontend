import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isMicOn: false,
    isCamOn: false,
    isSoundOn: true
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
        setRTCDefault: (state) => {
            state.isSoundOn = initialState.isSoundOn
            state.isMicOn = initialState.isMicOn
            state.isCamOn = initialState.isCamOn
        },
    },
    extraReducers: {
    }
})

export const { setCamState, setSoundState, setRTCDefault, setMicState } = rtcSlice.actions

export default rtcSlice.reducer