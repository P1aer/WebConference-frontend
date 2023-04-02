import React, {useEffect} from 'react';
import {Grid, Button, MenuList, Paper, Typography} from "@mui/material";
import { green } from '@mui/material/colors';
import './SidebarMenu.scss'
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import ProfileBar from "../ProfileBar/ProfileBar";
import CreateRoomDialog from "../CreateRoomDialog";
import { fetchRooms} from "../../redux/slices/roomsSlice";
import {useDispatch, useSelector} from "react-redux";
import RoomItem from "./RoomItem";
import {socket} from "../../socket";
import { useNavigate} from "react-router-dom";
import {ACTIONS} from "../../constants/rtc";

const SidebarMenu = () => {
    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate()
    const currentRoom = useSelector(state => state.rooms.currentRoom)
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.rooms.allRooms)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const selectMenuItem = (id) => {
        navigate(`/rooms/${id}`)
    }
    useEffect(() => {
        dispatch(fetchRooms({}))
    },[dispatch])
    return (
        <>
            <Paper>
            <Grid  sx={{height: '91vh'}} container spacing={0} direction="column">
                <Grid item sx={{flexBasis: '90%'}}>
                    <Typography className='rooms-title' variant='h4'>Rooms  <span>{rooms.length}</span></Typography>
                    <MenuList className='rooms-container'>
                        { rooms.map(elem => (
                            <RoomItem
                                key={elem._id}
                                data={elem}
                                currentRoom={currentRoom}
                                selectRoom={selectMenuItem}
                            />
                        ))}
                    </MenuList>
                    <Divider></Divider>
                    <Button
                        onClick={handleOpen}
                        size="large"
                        color='secondary'
                        startIcon={<AddIcon sx={{ color: green[500] }}/>}
                        sx={{ textTransform: 'none', width: '100%'}}
                    >
                        Add room
                    </Button>
                </Grid>
                <Grid item sx={{flexBasis: '10%',display: 'flex', alignItems: 'flex-end'}}>
                    <ProfileBar />
                </Grid>
            </Grid>

        </Paper>
            <CreateRoomDialog handleClose={handleClose} open={open}/>
        </>
    );
}

export default SidebarMenu;