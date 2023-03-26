import {createBrowserRouter} from "react-router-dom";
import AuthPage from "./views/AuthPage";
import MainPage from "./views/MainPage";
import RoomView from "./views/RoomView";

export const router = (isLoggedIn) => createBrowserRouter([
    {
        path: "/",
        element: isLoggedIn ? <MainPage/> : <AuthPage/>,
    },
    {
        path: "/rooms/:id",
        element: isLoggedIn ? <RoomView/> : <AuthPage/>
    }
]);