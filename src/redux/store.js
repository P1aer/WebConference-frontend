import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice";
import rtcReducer from "./slices/rtcSlice"

const reducer = combineReducers({
    user: userReducer,
    rtc: rtcReducer,
})
const store = configureStore({
    reducer,
})

export default store