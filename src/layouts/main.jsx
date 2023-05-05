import React from 'react';
import Navbar from "./navbar";
import PropTypes from 'prop-types';
import {Grid, ThemeProvider} from "@mui/material";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import {darkTheme} from "../constants/theme";
import ChatComponent from "../components/Chat/ChatComponent";

const MainLayout = ({ children, chat = false }) => {
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <Navbar isLogIn={true}/>
                <Grid container spacing={0}>
                    <Grid item xs={2} >
                        <SidebarMenu/>
                    </Grid>
                    <Grid item xs={ chat ? 7 : 10 }>
                        {children}
                    </Grid>
                    { chat &&
                        <Grid item xs={3}>
                            <ChatComponent/>
                        </Grid>
                    }
                </Grid>
            </ThemeProvider>
        </div>
    );
};
MainLayout.propTypes = {
    children: PropTypes.node,
    chat: PropTypes.bool
}
export default MainLayout;