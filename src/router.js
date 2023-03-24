import {createBrowserRouter} from "react-router-dom";
import AuthPage from "./views/AuthPage";
import MainPage from "./views/MainPage";

export const router = (isLoggedIn) => createBrowserRouter([
    {
        path: "/",
        element: isLoggedIn ? <MainPage/> : <AuthPage/>,
    },
]);