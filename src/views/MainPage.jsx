import React from 'react';
import MainLayout from "../layouts/main";
import {Link, Paper, Typography} from "@mui/material";
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
                <Link href='https://docs.google.com/forms/d/e/1FAIpQLSeQXlXKCrc2nNHViNrvejiNEhebLem57iJXwi0mqZrK34t3fA/viewform?usp=sf_link'> Send feedback </Link>
            </Paper>
        </MainLayout>
    );
};

export default MainPage;