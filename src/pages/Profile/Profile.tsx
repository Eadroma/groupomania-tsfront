import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Posts from '../../components/Post/post';
import './style.scss';
import getUserbyId from '../../hooks/getUser';
import { Avatar, Card, CardHeader, CardMedia, IconButton, Skeleton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddPost from '../../components/addPost/addPost';
import { getItemLocalStorage } from '../../hooks/getLocalStorage';
import { User } from '../../types/User';

const ProfileHeader: React.FC<{ user: User }> = ({ user }) => {
    const loStorage = getItemLocalStorage();

    return (
        <>
            <Card className="layoutHeader">
                <CardMedia component="img" height="275" image={user.coverUrl} alt="cover img" />
                <div className="layoutCardMedia">
                    <CardHeader
                        avatar={<Avatar aria-label="recipe" src={user.imgUrl} sx={{ width: 92, height: 92 }} />}
                        action={<IconButton aria-label="settings"></IconButton>}
                        title={`${user.name} - ${user.email}`}
                        subheader={user.description}
                    />
                    {loStorage.id == user.id && (
                        <div className="layoutCardSettings">
                            <Link to={'/profile/settings'}>
                                <SettingsIcon />
                            </Link>
                        </div>
                    )}
                </div>
            </Card>
        </>
    );
};
export default function Profile() {
    const { id } = useParams();
    if (!id) location.href = '/';
    const user = getUserbyId(parseInt(id!));
    return (
        <div className="container">
            <Sidebar />
            {user.status === 'loading' && (
                <div className="layoutProfile">
                    <Skeleton variant="rectangular" height={275} animation="wave" />
                </div>
            )}
            {user.status === 'loaded' && (
                <div className="profileLayout">
                    <ProfileHeader user={user.payload} />
                    <AddPost user={user.payload} />
                    <h2 id="posts">Posts:</h2>
                    <Posts user={user.payload} />
                </div>
            )}
            {user.status === 'error' && <div>Error, the backend moved to the dark side.</div>}
        </div>
    );
}
