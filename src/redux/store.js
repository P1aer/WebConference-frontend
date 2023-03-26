import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice";
import rtcReducer from "./slices/rtcSlice"
import roomsReducer from "./slices/roomsSlice"

const reducer = combineReducers({
    user: userReducer,
    rtc: rtcReducer,
    rooms: roomsReducer
})
const store = configureStore({
    reducer,
})

export default store