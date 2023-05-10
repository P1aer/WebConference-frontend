import React from 'react';
import PropTypes from "prop-types";
import {Avatar,Typography} from "@mui/material";
import {stringToColor} from "../../utils/colors";

const ChatMessage = ({ data, userId }) => {
    const myMessage = data.user._id === userId
    return (
        <div style={{
            marginTop: '1rem',
            display: 'flex',
            width: '100%',
            alignItems: 'flex-end',
        }}
        >
            <Avatar sx={{bgcolor: stringToColor(data.user.login)}}>
                {data.user.name[0].toUpperCase()}
            </Avatar>
            <div className={`chat-message ${myMessage ? 'my-message' : ''}`}>
                <Typography sx={{ wordWrap: 'break-word'}} color="text.secondary" gutterBottom>
                    { myMessage ? 'Me' : data.user.name }
                </Typography>
                <Typography
                    sx={{ wordWrap: 'break-word'}}
                    variant="h5"
                    component='p'
                    maxWidth='16vw'
                >
                    { data.text }
                </Typography>
            </div>
        </div>
    );
};

ChatMessage.propTypes = {
    data: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired
}

export default ChatMessage;