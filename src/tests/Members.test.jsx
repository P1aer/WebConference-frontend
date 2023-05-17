import {render, screen, fireEvent, queryAllByRole} from "@testing-library/react";
import {Provider} from "react-redux";
import '@testing-library/jest-dom'
import store from "../redux/store.js";
import {MemoryRouter} from "react-router-dom";

import MembersComponent from "../components/MembersComponent/MembersComponent";

describe('Member component tests', function () {
    it('should not render empty list of items', function () {
        render(<Provider store={store}>
            <MemoryRouter initialEntries={['/']}>
                <MembersComponent members={[]}/>
            </MemoryRouter>
        </Provider>)

        const items = screen.queryAllByRole('listitem')
        expect(items.length).toBe(0)
        expect(screen.getByText('No Members Found !')).toBeInTheDocument()
    });
    it('should render non-empty list', function () {
        render(<Provider store={store}>
            <MemoryRouter initialEntries={['/']}>
                <MembersComponent members={[{
                    peerId: '1',
                    userName: 'tester',
                    userId: '1'
                }]}/>
            </MemoryRouter>
        </Provider>)
        const items = screen.queryAllByRole('listitem')
        expect(items.length).toBe(1)

        expect(screen.getByText('tester')).toBeInTheDocument()
    });

    it('should render me in list', function () {
        render(<Provider store={store}>
            <MemoryRouter initialEntries={['/']}>
                <MembersComponent members={[{
                    peerId: '1',
                    userName: 'tester',
                }]}/>
            </MemoryRouter>
        </Provider>)
        const items = screen.queryAllByRole('listitem')
        expect(items.length).toBe(1)

        expect(screen.queryByText('tester (Me)')).toBeInTheDocument()
    });

    it('should search work in list', function () {
        render(<Provider store={store}>
            <MemoryRouter initialEntries={['/']}>
                <MembersComponent members={[{
                    peerId: '1',
                    userName: 'tester',
                    userId: '1'
                },
                    {
                        peerId: '2',
                        userName: 'ilya',
                        userId: '2'
                    }
                ]}/>
            </MemoryRouter>
        </Provider>)
        const items = screen.queryAllByRole('listitem')

        expect(items.length).toBe(2)

        const search = screen.getByRole('search').querySelector('input')

        expect(search).toBeInTheDocument()

        fireEvent.input(search, {
            target: {value:'ilya'}
        })

        const itemsAfter = screen.queryAllByRole('listitem')

        expect(screen.queryByText('ilya')).toBeInTheDocument()

        expect(itemsAfter.length).toBe(1)

    });
});