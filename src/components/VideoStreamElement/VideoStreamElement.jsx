import React from 'react';
import PropTypes from "prop-types";
import "./VideoStreamElement.scss"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {blue} from "@mui/material/colors";
import {Typography} from "@mui/material";

const VideoStreamElement = ({children, isMe = false, name, className}) => {
    return (
        <div className={['video-content', className].join(' ')}>
            {name && (<Typography variant='h5'
                className='video-content__name'
            >{name}
            </Typography>)
            }
            {isMe && <StarBorderIcon
                data-testid={'star'}
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
    isMe: PropTypes.bool,
    name: PropTypes.string,
    className: PropTypes.string
}
export default VideoStreamElement;