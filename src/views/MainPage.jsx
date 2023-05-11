import React from 'react';
import MainLayout from "../layouts/main";
import {Paper, Typography} from "@mui/material";
import './MainView.scss'

const MainPage = () => {
    return (
        <MainLayout>
            <Paper square className="main-view">
                <Typography variant='h3' component='div'>
                    Start your own conference by clicking "add new room" button in a sidebar!
                </Typography>
                <Typography variant='h3' component='div'>
                    Feel free to share our opinion !
                </Typography>
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSeQXlXKCrc2nNHViNrvejiNEhebLem57iJXwi0mqZrK34t3fA/viewform?embedded=true"
                    width="740" height="400" frameBorder="0" marginHeight="0" marginWidth="0">Загрузка…
                </iframe>
            </Paper>
        </MainLayout>
    );
};

export default MainPage;