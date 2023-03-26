import React from 'react';
import {MenuItem} from "@mui/material";
import PropTypes from "prop-types";

const RoomItem = ({data, currentRoom, selectRoom}) => {
    return (
        <MenuItem
            selected={currentRoom && data._id === currentRoom._id}
            onClick={() => selectRoom(data._id)}
        >
            {data.name}
        </MenuItem>
    );
};

RoomItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default RoomItem;