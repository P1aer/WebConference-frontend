import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "../../axios";

export const fetchRooms = createAsyncThunk("rooms/fetchRooms",async ({errorCb}) => {
    try {
        const  { data } = await axios.get("/rooms")
        return data;
    }
    catch (error) {
        if (errorCb) {
            errorCb()
        }
    }

})

export const fetchRoom = createAsyncThunk("rooms/fetchRoom",async ({id, cb, errorCb}) => {
    const  { data } = await axios.get(`/rooms/${id}`)
    if (!data) {
        errorCb()
    }
    else if (cb) {
        cb(data)
    }
    return data;
})

export const createRoom = createAsyncThunk("rooms/createRoom",async ({values, errorCb}) => {
    try {
        const  { data } = await axios.post("/rooms/create",values)
        return data;
    }
    catch (error) {
        if (errorCb) {
            errorCb()
        }
    }
})

const initialState = {
    currentRoom: undefined,
    allRooms: [],
    status: "loading"
}
export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        leaveCurrentRoom: (state) => {
            state.currentRoom = null
        },
        addMessage: (state, action) => {
            if (state.currentRoom) {
                state.currentRoom.messages = [...state.currentRoom.messages, action.payload]
            }
        }
    },
    extraReducers: {
        [createRoom.pending] : (state) => {
            state.status = 'loading'
        },
        [createRoom.fulfilled]: (state, action) => {
            state.allRooms.push(action.payload)
            state.status = 'fetched'
        },
        [createRoom.rejected]: (state) => {
            state.status = 'error'
        },
        [fetchRoom.pending] : (state) => {
            state.status = 'loading'
        },
        [fetchRoom.fulfilled]: (state, action) => {
            state.currentRoom = action.payload
            state.status = 'fetched'
        },
        [fetchRoom.rejected]: (state) => {
            state.status = 'error'
        },
        [fetchRooms.pending] : (state) => {
            state.status = 'loading'
        },
        [fetchRooms.fulfilled]: (state, action) => {
            state.allRooms = action.payload
            state.status = 'fetched'
        },
        [fetchRooms.rejected]: (state) => {
            state.status = 'error'
        },
    }
})

// Action creators are generated for each case reducer function
export const { leaveCurrentRoom, addMessage } = roomsSlice.actions

export default roomsSlice.reducer