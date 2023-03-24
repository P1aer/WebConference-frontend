import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "../../axios";

const initialState = {
    data: null,
    status: "loading"
}
/*export const fetchAuth = createAsyncThunk("auth/fetchAuth",async (params) => {
    const  { data } = await axios.post("/auth/login",params)
    return data;
})

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe",async (params) => {
    const  { data } = await axios.get("/auth/me")
    return data;
})

export const fetchAuthRegister = createAsyncThunk("auth/fetchAuthRegister",async (params) => {
    const  { data } = await axios.post("/auth/register",params)
    return data;
})*/

export const rtcSlice = createSlice({
    name: 'rtc',
    initialState,
    reducers: {
        logOut: (state) => {
            state.data = null
        },
    },
    extraReducers: {
/*        [fetchAuth.pending]: (state) => {
            state.status = "loading"
        },
        [fetchAuth.fulfilled]: (state,action ) => {
            state.data = action.payload
            state.status = "fetched"
            localStorage.setItem('user', action.payload.token)
        },
        [fetchAuth.rejected]: (state) => {
            state.data = null
            state.status = "error"
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = "loading"
        },
        [fetchAuthMe.fulfilled]: (state,action ) => {
            state.data = action.payload
            state.status = "fetched"
        },
        [fetchAuthMe.rejected]: (state) => {
            state.data = null
            state.status = "error"
        },
        [fetchAuthRegister.pending]: (state) => {
            state.status = "loading"
        },
        [fetchAuthRegister.fulfilled]: (state,action ) => {
            state.data = action.payload
            state.status = "fetched"
            localStorage.setItem('user', action.payload.token)
        },
        [fetchAuthRegister.rejected]: (state) => {
            state.data = null
            state.status = "error"
        },*/
    }
})

// Action creators are generated for each case reducer function
export const { logOut } = rtcSlice.actions

export default rtcSlice.reducer