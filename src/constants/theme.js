import {Button, createTheme, styled} from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#ffffff'
        }
    },
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#ffffff'
        }
    },
});

export const ProfileButton = styled(Button)({
    color: '#ffffff',
    padding: '6px 20px 6px 10px',
    textTransform: 'none',
    fontSize: 16,
    lineHeight: 1.5,
});