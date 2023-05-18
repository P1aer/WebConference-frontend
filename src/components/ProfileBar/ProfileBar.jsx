import React from 'react';
import {useSelector} from "react-redux";
import "./ProfileBar.scss"
import {ProfileInfo} from "./ProfileInfo";

const ProfileBar = () => {
  const {name, login, _id: id } = useSelector(state => state?.user?.data)
    return (
        id && (<ProfileInfo name={name} login={login} id={id} />)
    );
};

export default ProfileBar;