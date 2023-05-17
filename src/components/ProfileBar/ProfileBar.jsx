import React from 'react';
import {Avatar, IconButton, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {stringToColor} from "../../utils/colors";
import SettingsIcon from '@mui/icons-material/Settings';
import "./ProfileBar.scss"
import {capitalizeFirstLetter} from "../../utils/string";
import {ProfileButton} from "../../constants/theme";
const ProfileBar = () => {
  const {name, login, _id: id } = useSelector(state => state?.user?.data)
    return (
        id && (<div className='profile-container'>
            <ProfileButton className='profile-inner'>
                <Avatar sx={{bgcolor: stringToColor(login),mr: '1rem'}}>{name[0].toUpperCase()}</Avatar>
                <div className='profile-info'>
                    <Typography align='left'>{capitalizeFirstLetter(name)}</Typography>
                    <Typography align='left' className='profile-id'>#{id.substring(0,5)}</Typography>
                </div>
            </ProfileButton>
            <IconButton aria-label='settings button'>
                <SettingsIcon aria-label='settings button'/>
            </IconButton>
        </div>)
    );
};

export default ProfileBar;