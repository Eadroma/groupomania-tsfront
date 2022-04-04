import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Posts from '../../components/Post/post';
import './style.scss';
import getUserbyId from '../../hooks/getUser';
import { Avatar, Card, CardHeader, CardMedia, IconButton, Skeleton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import addPost from '../../components/addPost/addPost';
import { getItemLocalStorage } from '../../hooks/getLocalStorage';
const ProfileHeader: React.FC<{ id: number }> = ({ id }) => {
    const loStorage = getItemLocalStorage();

    let userService = getUserbyId(id);
    console.log(userService);
    return (
        <div>
            {userService.status === 'loading' && (
                <div>
                    <Skeleton variant="rectangular" height={275} animation="wave" />
                </div>
            )}
            {userService.status === 'loaded' && (
                <Card className="layoutHeader">
                    <CardMedia component="img" height="275" image={userService.payload.coverUrl} alt="cover img" />
                    <div className="layoutCardMedia">
                        <CardHeader
                            avatar={
                                <Avatar
                                    aria-label="recipe"
                                    src={userService.payload.imgUrl}
                                    sx={{ width: 92, height: 92 }}
                                />
                            }
                            action={<IconButton aria-label="settings"></IconButton>}
                            title={`${userService.payload.name} - ${userService.payload.email}`}
                            subheader={userService.payload.description}
                        />
                        {loStorage.id == id && (
                            <div className="layoutCardSettings">
                                <Link to={'/profile/settings'}>
                                    <SettingsIcon />
                                </Link>
                            </div>
                        )}
                    </div>
                </Card>
            )}
            {userService.status === 'error' && <div>Error, the backend moved to the dark side.</div>}
        </div>
    );
};
export default function Profile() {
    const { id } = useParams();

    return (
        <div className="container">
            <Sidebar />
            <div className="profileLayout">
                <ProfileHeader id={parseInt(id as unknown as string)} />
                {addPost({})}
                <h2 id="posts">Posts:</h2>
                <Posts id={parseInt(id as unknown as string)} />
            </div>
        </div>
    );
}
