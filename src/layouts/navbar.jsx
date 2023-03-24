import React from 'react';
import PropTypes from 'prop-types';
import
{
    AppBar,
    Box,
    Button,
    createTheme,
    IconButton,
    Toolbar,
    Typography,
    ThemeProvider
} from "@mui/material";
import {darkTheme} from "../constants/theme";

const Navbar = ({isLogIn}) => {
    return (
        <ThemeProvider theme={darkTheme}>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="secondary" position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >

                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        WebConf
                    </Typography>
                    {isLogIn && <Button color="inherit">Log Out</Button>}
                </Toolbar>
            </AppBar>
        </Box>
        </ThemeProvider>
    );
};
Navbar.propTypes = {
 isLogIn: PropTypes.bool.isRequired
}
export default Navbar;