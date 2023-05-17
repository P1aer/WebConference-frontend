import { render, screen,  fireEvent } from "@testing-library/react";
import {Provider} from "react-redux";
import '@testing-library/jest-dom'
import store from "../redux/store.js";
import {MemoryRouter} from "react-router-dom";
import StreamControlPanel from "../components/StreamControlPanel/StreamControlPanel";

const toggleMic = jest.fn()
const toggleCam = jest.fn()
const toggleSound = jest.fn()
const share = jest.fn()
const stopShare = jest.fn()


describe('StreamControlPanel tests', function () {

    beforeEach(() => {
        toggleMic.mockReset()
        toggleSound.mockReset()
        toggleCam.mockReset()
        share.mockReset()
        stopShare.mockReset()
    })

    it('should render all elements', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <StreamControlPanel
                        toggleMic={toggleMic}
                        toggleCam={toggleCam}
                        toggleSound={toggleSound}
                        shareScreen={share}
                        stopShare={stopShare}
                    />
                </MemoryRouter>
            </Provider>
        )
        const icons = screen.getAllByRole('listitem')
        expect(icons.length).toBe(7)
    });

    it('should icons click fire', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <StreamControlPanel
                        toggleMic={toggleMic}
                        toggleCam={toggleCam}
                        toggleSound={toggleSound}
                        shareScreen={share}
                        stopShare={stopShare}
                    />
                </MemoryRouter>
            </Provider>
        )
        const icons = screen.getAllByRole('listitem')
        icons.forEach((ref) => fireEvent.click(ref))
        expect(toggleMic).toBeCalled()
        expect(toggleCam).toBeCalled()
        expect(toggleSound).toBeCalled()
        expect(share).toBeCalled()
    });

    it('should share and stopShare events fire', function () {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <StreamControlPanel
                        toggleMic={toggleMic}
                        toggleCam={toggleCam}
                        toggleSound={toggleSound}
                        shareScreen={share}
                        stopShare={stopShare}
                    />
                </MemoryRouter>
            </Provider>
        )
        const icon = screen.getByTestId('share')
       fireEvent.click(icon)
        expect(share).toBeCalled()

        expect(toggleMic).not.toBeCalled()
        expect(toggleSound).not.toBeCalled()
        expect(toggleCam).not.toBeCalled()
    });
});