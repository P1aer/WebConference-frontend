import {ProfileButton} from "../../constants/theme";
import {Avatar, IconButton, Typography} from "@mui/material";
import {stringToColor} from "../../utils/colors";
import {capitalizeFirstLetter} from "../../utils/string";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import PropTypes from "prop-types";

export function ProfileInfo({name = "No Name", login = "No Name", id = "" , width = 100}) {
    return (
        <div style={{width: `${width}%`}} className='profile-container'>
            <ProfileButton className='profile-inner'>
                {name && <Avatar sx={{bgcolor: stringToColor(login || name),mr: '1rem'}}>{name[0].toUpperCase()}</Avatar>}
                <div className='profile-info'>
                    <Typography align='left'>{capitalizeFirstLetter(name)}</Typography>
                    {id && <Typography align='left' className='profile-id'>#{id.toString().substring(0,5)}</Typography>}
                </div>
            </ProfileButton>
            <IconButton aria-label='settings button'>
                <SettingsIcon aria-label='settings button'/>
            </IconButton>
        </div>
    )
}
ProfileInfo.propTypes = {
    name: PropTypes.string,
    login: PropTypes.string,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number]
    ),
    width: PropTypes.number
}