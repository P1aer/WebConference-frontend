import React, {useMemo, useState} from 'react';
import {Paper, Grid, Typography, IconButton, TextField, InputAdornment} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import {useDispatch, useSelector} from "react-redux";
import {setMembersState} from "../../redux/slices/rtcSlice";
import SearchIcon from '@mui/icons-material/Search';
import './MembersComponent.scss'
import PropTypes from "prop-types";
import MemberBar from "./MemberBar";
const MembersComponent = ({members = []}) => {
    const dispatch = useDispatch()
    const [search,setSearch] = useState('')
    const user = useSelector(state => state.user.data)
    const onSearch = (event) => setSearch(event.target.value)
    const onCloseClick = () => {
        dispatch(setMembersState(false))
    }
    const filteredMembers = useMemo(() => {
        return members.filter((member) => member.userName.includes(search))
    },[search,members])
    return (
        <Paper square className='chat-sidebar'>
            <Grid container direction='column' sx={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}>
                <Grid flexBasis="auto" item flexShrink={1} container alignItems="center" justifyContent="between">
                    <Grid flexGrow={1} item>
                        <Typography className='chat-title'>
                            Room Members
                        </Typography>
                    </Grid>
                    <Grid flexBasis="auto" item flexShrink={1}>
                        <IconButton onClick={onCloseClick}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid direction='column' flexBasis="auto" item flexShrink={1} container>
                    <Grid item>
                        <div className='members__add'>
                            <IconButton>
                                <GroupAddOutlinedIcon/>
                            </IconButton>
                            <Typography sx={{ marginLeft: '1rem'}}>
                                Add Member
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            placeholder='Find users'
                            value={search}
                            onInput={onSearch}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>,
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item flexGrow={1}>
                    <Paper className='chat-body' variant='outlined' sx={
                        {
                            height: '64vh',
                            maxHeight: '64vh',
                            marginTop: '1rem',
                            maxWidth: '23vw',
                            backgroundColor: '#1E1E1E',
                            padding: '1rem',
                            overflowY: 'scroll',
                            overflowX: 'hidden'
                        }}>
                        {filteredMembers.length > 0 && filteredMembers.map((object) =>
                            <MemberBar key={object.peerId} data={object} isMe={object.userId === user._id}/>
                        )}
                        {
                            filteredMembers.length === 0 && <div> No Members Found !</div>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
};

MembersComponent.propTypes = {
    members: PropTypes.array.isRequired
}
export default MembersComponent;