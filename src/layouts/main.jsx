import React from 'react';
import Navbar from "./navbar";
import PropTypes from 'prop-types';
import {Grid, ThemeProvider} from "@mui/material";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import {darkTheme} from "../constants/theme";
import ChatComponent from "../components/Chat/ChatComponent";
import MembersComponent from "../components/MembersComponent/MembersComponent";

const MainLayout = ({ children, chat = false, members = false, roomUsers=[]}) => {
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <Navbar isLogIn={true}/>
                <Grid container spacing={0}>
                    <Grid item xs={2} >
                        <SidebarMenu/>
                    </Grid>
                    <Grid item xs={ (chat || members) ? 7 : 10 }>
                        {children}
                    </Grid>
                    { (chat || members) && (
                            <Grid item xs={3}>
                                {chat && <ChatComponent/>}
                                {members && <MembersComponent members={roomUsers}/>}
                            </Grid>
                        )

                    }
                </Grid>
            </ThemeProvider>
        </div>
    );
};
MainLayout.propTypes = {
    children: PropTypes.node,
    chat: PropTypes.bool,
    members: PropTypes.bool,
    roomUsers: PropTypes.array,
}
export default MainLayout;