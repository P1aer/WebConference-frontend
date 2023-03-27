import React, {useEffect, useRef} from 'react';
import PropTypes from "prop-types";

const VideoStreamElement = ({mediaStream, isUnmuted = false}) => {
    const videoRef = useRef()
    useEffect(() => {
        if (mediaStream) {
            videoRef.current.srcObject = mediaStream
        }
    },[mediaStream])
    return (
        <div>
            { mediaStream &&
                <video
                    ref={videoRef}
                    autoPlay
                    muted={!isUnmuted}
                />}

        </div>
    );
};

VideoStreamElement.propTypes = {
    mediaStream: PropTypes.object.isRequired,
    isUnmuted: PropTypes.bool
}
export default VideoStreamElement;