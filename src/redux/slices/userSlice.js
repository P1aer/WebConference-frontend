import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "../../axios";

const initialState = {
    data: {},
    status: "loading"
}
export const fetchAuth = createAsyncThunk("auth/fetchAuth",async ({values, errorCb}) => {
    try {
        const  { data } = await axios.post("/auth/login",values)
        return data;
    }
    catch (error) {
        errorCb()
    }

})

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe",async (params) => {
    const  { data } = await axios.get("/auth/me")
    return data;
})

export const fetchAuthRegister = createAsyncThunk("auth/fetchAuthRegister",async ({values, errorCb}) => {
    try {
        const  { data } = await axios.post("/auth/register",values)
        return data;
    }
    catch (error) {
        errorCb()
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            state.status = "loading"
            localStorage.removeItem('token')
            window.location.reload();
        },
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = "loading"
        },
        [fetchAuth.fulfilled]: (state,action ) => {
            state.data = action.payload
            state.status = "fetched"
            localStorage.setItem('token', action.payload.token)
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
            localStorage.setItem('token', action.payload.token)
        },
        [fetchAuthRegister.rejected]: (state) => {
            state.data = null
            state.status = "error"
        },
    }
})

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions

export default userSlice.reducer