import React from 'react';
import PropTypes from "prop-types";
import "./VideoStreamElement.scss"
const VideoStreamElement = ({children}) => {

    return (
        <div className='video-content'>
            {children}
        </div>
    );
};

VideoStreamElement.propTypes = {
    children: PropTypes.node
}
export default VideoStreamElement;