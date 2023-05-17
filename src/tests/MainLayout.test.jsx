import { render, screen,  fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";
import '@testing-library/jest-dom'
import store from "../redux/store.js";
import MainLayout from "../layouts/main";
import {MemoryRouter} from "react-router-dom";
import CreateRoomDialog from "../components/CreateRoomDialog.jsx";

const onClose = jest.fn()

describe('MainLayout tests', function () {
    it('should not contain chat or members component with false prop ', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                   <MainLayout chat={false}/>
                </MemoryRouter>
            </Provider>)

        expect(screen.queryByText('Room Chat')).toBeNull()
        expect(screen.queryByText('Room Members')).toBeNull()
    });
    it('should not contain chat component if members true', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <MainLayout chat={false} members={true}/>
                </MemoryRouter>
            </Provider>)
        expect(screen.getByPlaceholderText('Find users')).toBeInTheDocument()
    });

    it('should not contain members component if chat true', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <MainLayout chat={true} members={false}/>
                </MemoryRouter>
            </Provider>)
        expect(screen.queryByText('Room Chat')).toBeInTheDocument()
    });

    it('should display data', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <MainLayout chat={true} members={false} >
                        I like HTML
                    </MainLayout>
                </MemoryRouter>
            </Provider>)

        expect(screen.getByText('I like HTML')).toBeInTheDocument()
    });

    it('should display sidebar', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <MainLayout chat={true} members={false} >
                        I like HTML
                    </MainLayout>
                </MemoryRouter>
            </Provider>)

        expect(screen.getByText('Rooms')).toBeInTheDocument()
    });

    it('should display Modal', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <CreateRoomDialog open={true} handleClose={onClose} />
                </MemoryRouter>
            </Provider>)

        const btn = screen.getByText('Create Room')

        expect(btn).toBeInTheDocument()
    });

    it('should not display Modal', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <CreateRoomDialog open={false} handleClose={onClose} />
                </MemoryRouter>
            </Provider>)

        const btn = screen.queryByText('Create Room')

        expect(btn).toBeNull()
    });

    it('should open Modal in sidebar', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <MainLayout />
                </MemoryRouter>
            </Provider>)

        const btn = screen.getByTestId('btn')

        expect(btn).toBeInTheDocument()

        fireEvent.click(btn)

        expect(screen.getByText('Create Room')).toBeInTheDocument()

        onClose.mockReset()
    });

    it('should close Modal after submit', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <CreateRoomDialog open={true} handleClose={onClose} />
                </MemoryRouter>
            </Provider>)

        const btn = screen.getByTestId('btn2')

        expect(btn).toBeInTheDocument()

        fireEvent.click(btn)

        expect(onClose).toBeCalled()

        onClose.mockReset()
    });
});


