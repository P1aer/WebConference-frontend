import React from 'react';
import {Avatar, IconButton, Typography} from "@mui/material";
import {stringToColor} from "../../utils/colors";
import PropTypes from "prop-types";
import MoreVertIcon from '@mui/icons-material/MoreVert';
const MemberBar = ({data, isMe = false}) => {
    return (
        <div className='memberBar'>
            <div className='memberBar__info'>
                <Avatar sx={{bgcolor: stringToColor(data.userName)}}>
                    {data.userName[0].toUpperCase()}
                </Avatar>
                <Typography sx={{marginLeft: '1rem'}}>
                    {data.userName}
                    {isMe ? ' (Me) ' : ''}
                </Typography>
            </div>
            <IconButton>
                <MoreVertIcon/>
            </IconButton>
        </div>
    );
};

MemberBar.propTypes = {
    data: PropTypes.object.isRequired,
    isMe: PropTypes.bool,
}
export default MemberBar;