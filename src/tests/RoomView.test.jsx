import { render, screen,  fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";
import '@testing-library/jest-dom'
import store from "../redux/store.js";
import {MemoryRouter} from "react-router-dom";
import RoomView from "../views/RoomView.jsx";
import RoomLayout from "../components/RoomLayout.jsx";
import {LOCAL_VIDEO} from "../constants/rtc.js";

const provideMedia = jest.fn()
describe('Room View tests', function () {
    it('should render properly', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <RoomView/>
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText('#')).toBeInTheDocument()
    });

    it('should render clients properly', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <RoomLayout clients={[ '123']} provideMedia={provideMedia} roomMembers={[]}/>
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByRole('listitem')).toBeInTheDocument()
        expect(provideMedia).toBeCalled()
        provideMedia.mockClear()
    });

    it('should render no more than 8 clients', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <RoomLayout clients={[ '1', '2', '3', '4','5', '6', '7', '8',]} provideMedia={provideMedia} roomMembers={[]}/>
                </MemoryRouter>
            </Provider>
        )
        const elems = screen.getAllByRole('listitem')

        expect(elems.length).toBe(8)
        expect(provideMedia).toBeCalledTimes(8)
        provideMedia.mockClear()
    });

    it('should render correct behavior if more than 9 clients', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <RoomLayout clients={[ '1', '2', '3', '4','5', '6', '7', '8', '9']} provideMedia={provideMedia} roomMembers={[]}/>
                </MemoryRouter>
            </Provider>
        )
        const elems = screen.getAllByRole('listitem')

        expect(elems.length).toBe(8)
        expect(provideMedia).toBeCalledTimes(8)
        provideMedia.mockClear()
    });

    it('should render correct name', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <RoomLayout clients={[ '1']} provideMedia={provideMedia} roomMembers={[ {
                        peerId: '1',
                        userName: 'test Name'
                    }]}/>
                </MemoryRouter>
            </Provider>
        )
        const elem = screen.getByText('test Name')

        expect(elem).toBeInTheDocument()
        provideMedia.mockClear()
    });

    it('should render correct icon for local user', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <RoomLayout clients={[ LOCAL_VIDEO ]} provideMedia={provideMedia} roomMembers={[
                        {
                            peerId: LOCAL_VIDEO,
                            userName: 'test Name'
                        }
                    ]}/>
                </MemoryRouter>
            </Provider>
        )
        const elem = screen.getByTestId('star')
        const elem2 = screen.getByText('test Name')

        expect(elem).toBeInTheDocument()
        expect(elem2).toBeInTheDocument()
        provideMedia.mockClear()
    });

    it('should render correct UI if clicked to stream', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <RoomLayout clients={[ LOCAL_VIDEO]} provideMedia={provideMedia} roomMembers={[ ]}/>
                </MemoryRouter>
            </Provider>
        )
        const elems = screen.getAllByRole('listitem')
        fireEvent.doubleClick(elems[0])
        const afterElems = screen.getAllByRole('listitem')
        expect(afterElems.length).toBe(1)
        provideMedia.mockClear()
    });
    it('should render control panel', function () {
        
    });
});