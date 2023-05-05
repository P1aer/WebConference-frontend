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
import { useNavigate} from "react-router-dom";

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
               <Grid container direction='column' sx={{display: 'flex', flexDirection: 'column', height: '90vh'}}>
                <Grid item flexGrow={1} flexBasis="auto">
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
                    <Divider/>
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
                <Grid item xs="auto" flexShrink={1} flexBasis='auto'>
                    <ProfileBar />
                </Grid>
            </Grid>
            </Paper>
            <CreateRoomDialog handleClose={handleClose} open={open}/>
        </>
    );
}

export default SidebarMenu;