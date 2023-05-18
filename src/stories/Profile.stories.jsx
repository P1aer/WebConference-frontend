import {ProfileInfo} from "../components/ProfileBar/ProfileInfo";
import '../components/ProfileBar/ProfileBar.scss'
import {Paper, ThemeProvider} from "@mui/material";
import {darkTheme} from "../constants/theme";

export default {
    title: 'ProfileBar',
    component: ProfileInfo,
    tags: ['autodocs'],
    argTypes: {
        id: {
            type: 'number',
            description: 'Id of a user',
            defaultValue: 1,
            control: {
                type: 'number',
                min:1,
            }
        },
        width: {
            type: 'number',
            description: 'Width of a component',
            defaultValue: 20,
            control: {
                type: 'number',
                min:1,
                max: 100
            }
        },
        name: {
            type: 'string',
            description: 'Name of a user',
            defaultValue: 'No name'
        },
        login: {
            type: 'string',
            description: 'Login of a user',
            defaultValue: ''
        }
    }
}

const Template = ({width = 100, ...args}) => <ThemeProvider theme={darkTheme}>
    <Paper style={{width: `${width}%`}}>
        <ProfileInfo {...args}/>
    </Paper>
</ThemeProvider>




export const Default = Template.bind({})
Default.args = {
    id:'343214535',
    name:'Ilya Test',
    login:'Ilya',
    width: 100,
}
export const Small = Template.bind({})

Small.args = {
    id:'1',
    name:'Ilya',
    login:'Ilya',
    width: 20,
}

export const Medium = Template.bind({})

Medium.args = {
    id:'1',
    name:'Ilya',
    login:'Ilya',
    width: 50,
}
