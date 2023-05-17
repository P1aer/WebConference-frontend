import { render, screen } from "@testing-library/react";
import {Provider} from "react-redux";
import '@testing-library/jest-dom'
import store from "../redux/store.js";
import Login from "../components/AuthTabs/Login.jsx";
import Register from "../components/AuthTabs/Register.jsx";


describe('Tests for AuthPage', function () {
    it('RegisterPage should render', function () {
        render(
            <Provider store={store}>
                <Register/>
            </Provider>
        )
        expect(screen.getByText('Register to proceed in app')).toBeInTheDocument()
    });
    it('LoginPage should render', function () {
        render(
            <Provider store={store}>
                <Login/>
            </Provider>
        )
        expect(screen.getByText('Or login if you have an account')).toBeInTheDocument()
    });
});