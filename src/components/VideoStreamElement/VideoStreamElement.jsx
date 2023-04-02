import React, {useEffect, useRef} from 'react';
import PropTypes from "prop-types";

const VideoStreamElement = ({children}) => {

    return (
        <div>
            {children}
        </div>
    );
};

VideoStreamElement.propTypes = {
    children: PropTypes.node
}
export default VideoStreamElement;