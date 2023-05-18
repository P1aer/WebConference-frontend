import {ChatList} from "../components/Chat/ChatList";
import {Paper, ThemeProvider} from "@mui/material";
import {darkTheme} from "../constants/theme";
import {Provider} from "react-redux";
import store from "../redux/store";
import '../components/Chat/ChatComponent.scss'

export default {
    title: 'ChatListComponent',
    component: ChatList,
    tags: ['autodocs'],
    argTypes: {
        room: {
            type: 'object',
            description: 'Current room info with messages',
            defaultValue: {},
        },
        user: {
            type: 'object',
            description: 'Local user',
            default: {}
        },
    }
}
const Template = (args) =>
    <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
            <Paper style={{width: `400px`}}>
                <ChatList {...args}/>
            </Paper>
        </ThemeProvider>
    </Provider>

export const Default = Template.bind({})
Default.args = {
    room: {
        messages: []
    },
    user: {

    }
}

export const WithMessages = Template.bind({})
WithMessages.args = {
    room: {
        messages: [
            {
                user: {
                    _id: '1',
                    name: 'User1',
                    login: 'User1',
                },
                text: 'Hello'
            },
            {
                user: {
                    _id: '2',
                    name: 'User2',
                    login: 'User2',
                },
                text: 'Hello User1 !'
            },
            {
                user: {
                    _id: '3',
                    name: 'User3',
                    login: 'User3',
                },
                text: 'Hello User1 !'
            },
        ]
    },
    user: {
        data: {
            _id: '3',
            name: 'User3',
            login: 'User3',
        },
    }
}