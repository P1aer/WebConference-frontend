import React from 'react';
import PropTypes from 'prop-types';
import
{
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
    ThemeProvider
} from "@mui/material";
import {darkTheme} from "../constants/theme";
import {useDispatch} from "react-redux";
import {logout} from "../redux/slices/userSlice";
import {Link} from "react-router-dom";

const Navbar = ({isLogIn}) => {
    const dispatch = useDispatch()
    const onLogoutClick = () => {
        dispatch(logout())
    }
    return (
        <ThemeProvider theme={darkTheme}>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="secondary" position="static" >
                <Toolbar sx={{height: '10vh'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Link style={{textDecoration:'none', color:'#ffffff'}} to={'/'}>
                            <img
                                style={{ width: '3.5rem', height: '3.5rem'}}
                                src={`${process.env.PUBLIC_URL}/wc_logo_2.png`}
                                alt="logo"
                            />
                        </Link>
                    </IconButton>
                    <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                        <Link style={{textDecoration:'none', color:'#ffffff'}} to={'/'}>WebConf </Link>
                    </Typography>
                    {isLogIn && <Button size='large' onClick={onLogoutClick} color="inherit">Log Out</Button>}
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