import React from 'react';
import Navbar from "../layouts/navbar";
import {Box, Container, Paper, Tab, Tabs, TextField, ThemeProvider} from "@mui/material";
import {darkTheme} from "../constants/theme";
import Register from "../components/AuthTabs/Register";
import Login from "../components/AuthTabs/Login";
import TabPanel from "../components/TabPanel";

const AuthPage = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Navbar isLogIn={false}/>

            <ThemeProvider theme={darkTheme}>
                <Container maxWidth={'md'} sx={{marginTop: '3rem'}}>
                    <Paper sx={{height: '75vh'}}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            centered
                            textColor='secondary'
                            indicatorColor="secondary"
                            value={value}
                            onChange={handleChange}
                        >
                            <Tab value={0} label="Register" />
                            <Tab value={1} label="Login" />
                        </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Register/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                           <Login/>
                        </TabPanel>
                    </Paper>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default AuthPage;