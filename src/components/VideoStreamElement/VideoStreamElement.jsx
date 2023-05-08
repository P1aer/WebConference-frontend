import React from 'react';
import PropTypes from "prop-types";
import "./VideoStreamElement.scss"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {blue} from "@mui/material/colors";

const VideoStreamElement = ({children, isMe = false}) => {
    return (
        <div className='video-content'>
            {isMe && <StarBorderIcon
                fontSize='large'
                className='starIcon'
                sx={{ color: blue[500]}}
            />}
            {children}
        </div>
    );
};

VideoStreamElement.propTypes = {
    children: PropTypes.node,
    isMe: PropTypes.bool
}
export default VideoStreamElement;