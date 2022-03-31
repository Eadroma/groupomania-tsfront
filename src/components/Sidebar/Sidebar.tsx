import './sidebar.scss';
import { Button, SvgIcon, Menu, MenuItem } from '@mui/material';
import { HomeMax, Search, Notifications, MailOutline, PermIdentity, MoreHoriz } from '@mui/icons-material';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from '../../pages/App/App';
import Profile from '../../pages/Profile/Profile';
import React from 'react';
import { getItemLocalStorage } from '../../hooks/getLocalStorage';
import getUserbyId from '../../hooks/getUser';
const SidebarLink = ({ text, Icon, link }: any) => {
    return (
        <div className="link">
            <Icon />
            <Link to={link}>
                <h2>{text}</h2>
            </Link>
        </div>
    );
};
const Sidebar: React.FC = () => {
    const loStorage = getItemLocalStorage();
    const user = getUserbyId(loStorage.id);
    const name = user?.payload?.name || 'Profile';

    return (
        <div className="sidebar">
            <img
                id="brand"
                src="https://res.cloudinary.com/datxh7pfw/image/upload/v1647294069/Groupomania/icon-above-font_lfcv10.svg"
                alt="logo Groupomania"
            />
            <SidebarLink text="Home" active={true} Icon={HomeMax} link="/" />
            <SidebarLink text="Notifications" Icon={Notifications} link="#" />
            <SidebarLink text="Messages" Icon={MailOutline} link="#" />
            <SidebarLink text={name} Icon={PermIdentity} link="/profile" />
            <SidebarLink text="More" Icon={MoreHoriz} link="#" />
            <Button
                id="logout"
                onClick={() => {
                    localStorage.clear();
                    location.href = '/';
                    window.location.reload();
                }}
            >
                Logout
            </Button>
        </div>
    );
};

export default Sidebar;
