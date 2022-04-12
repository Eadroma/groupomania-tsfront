import './sidebar.scss';
import { BottomNavigation, BottomNavigationAction, Box, Button } from '@mui/material';
import { HomeMax, Notifications, MailOutline, PermIdentity, MoreHoriz } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import React from 'react';
import { getItemLocalStorage } from '../../hooks/getLocalStorage';
import getUserbyId from '../../hooks/getUser';
const SidebarLink = ({ text, Icon, link, disabled }: any) => {
    if (disabled)
        return (
            <div className="sidebar-link disabled">
                <Icon />
                <h2>{text}</h2>
            </div>
        );
    return (
        <div className="link">
            <Link to={link}>
                <Icon />
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
        <div>
            <div className="sidebar">
                <img
                    id="brand"
                    src="https://res.cloudinary.com/datxh7pfw/image/upload/v1647294069/Groupomania/icon-above-font_lfcv10.svg"
                    alt="logo Groupomania"
                />
                <SidebarLink text="Home" active={true} Icon={HomeMax} link="/" />
                <SidebarLink text="Notifications" Icon={Notifications} link="#" disabled={true} />
                <SidebarLink text="Messages" Icon={MailOutline} link="#" disabled={true} />
                <SidebarLink text={name} Icon={PermIdentity} link={'/profile/'} />
                <SidebarLink text="More" Icon={MoreHoriz} link="#" disabled={true} />
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
            <div className="bottomBar">
                <Box sx={{ width: '100%' }}>
                    <BottomNavigation showLabels>
                        <img
                            id="brand"
                            className="BottomImg"
                            src="https://res.cloudinary.com/datxh7pfw/image/upload/v1647294069/Groupomania/icon-above-font_lfcv10.svg"
                            alt="logo Groupomania"
                        />
                        <Link to="/">
                            <BottomNavigationAction label="Home" icon={<HomeMax />} />
                        </Link>
                        <Link to="/profile/">
                            <BottomNavigationAction label="Profile" icon={<PermIdentity />} />
                        </Link>
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
                    </BottomNavigation>
                </Box>
            </div>
        </div>
    );
};

export default Sidebar;
